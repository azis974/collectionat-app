#!/usr/bin/env python3
"""Extrae email y teléfono públicos del sitio web de cada lead de docs/crm/leads.csv.

Solo lee páginas públicas del propio sitio de la empresa (home, contacto, quiénes somos)
y saca lo que la empresa publica para que la contacten: direcciones `mailto:`, links
`tel:` y `wa.me`, más los que aparecen en el texto. No inventa nada: si el sitio no
publica un dato, la fila queda vacía.

    python3 scripts/crm-scrape-contacts.py            # tabla legible
    python3 scripts/crm-scrape-contacts.py --json     # una línea JSON por lead

Necesita salida a internet sin restricciones (por eso corre en GitHub Actions).
"""

from __future__ import annotations

import argparse
import concurrent.futures
import csv
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent / "docs" / "crm" / "leads.csv"
UA = "Mozilla/5.0 (compatible; CollectionatLeadBot/1.0; +contacto comercial)"
TIMEOUT = 20
PAGINAS_EXTRA = 2  # además de la home

RE_EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
RE_TEL_LINK = re.compile(r'(?:tel:|https?://(?:api\.)?wa\.me/|whatsapp\.com/send\?phone=)([+\d\s().-]{6,25})', re.I)
# Teléfonos argentinos escritos en el texto: 011 4123-4567, (0221) 15-555-5555, +54 9 11 ...
RE_TEL_TEXTO = re.compile(r'(?:\+?54[\s.-]?)?(?:9[\s.-]?)?(?:\(?0?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{4}')
RE_LINK = re.compile(r'href=["\']([^"\']+)["\']', re.I)

# Basura típica que matchea como mail pero no lo es: dominios de servicios técnicos
# (analítica, CDN, plataformas) y archivos que el regex confunde con una dirección.
DOMINIOS_BASURA = ("example.", "dominio.", "tudominio.", "domain.", "email.tld", "sentry.",
                   "wixpress.", "wix.com", "godaddy.", "squarespace.", "shopify.", "jsdelivr.",
                   "googleapis.", "gstatic.", "schema.org", "w3.org", "sentry.io", "cloudflare.")
MAIL_ARCHIVO = re.compile(r'\.(png|jpg|jpeg|gif|svg|webp|css|js|woff2?)$', re.I)


def es_basura(mail: str) -> bool:
    dominio = mail.split("@")[-1]
    return MAIL_ARCHIVO.search(mail) is not None or any(b in dominio for b in DOMINIOS_BASURA)

PALABRAS_CONTACTO = ("contacto", "contactanos", "contact", "quienes-somos", "nosotros", "institucional")


def bajar(url: str) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            if resp.status != 200:
                return None
            crudo = resp.read(600_000)
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, OSError, ValueError):
        return None
    for enc in ("utf-8", "latin-1"):
        try:
            return crudo.decode(enc)
        except UnicodeDecodeError:
            continue
    return None


def paginas_de_contacto(html: str, base: str) -> list[str]:
    urls, host = [], urllib.parse.urlparse(base).netloc
    for href in RE_LINK.findall(html):
        if not any(p in href.lower() for p in PALABRAS_CONTACTO):
            continue
        completo = urllib.parse.urljoin(base, href)
        if urllib.parse.urlparse(completo).netloc != host or completo in urls:
            continue
        urls.append(completo)
        if len(urls) >= PAGINAS_EXTRA:
            break
    return urls


def limpiar_telefono(bruto: str) -> str:
    t = re.sub(r"[^\d+]", "", bruto)
    if t.startswith("00"):
        t = "+" + t[2:]
    solo_digitos = t.lstrip("+")
    if not 8 <= len(solo_digitos) <= 15:
        return ""
    if len(set(solo_digitos)) <= 2:  # 0000000000, 1111111111
        return ""
    return t


def extraer(html: str, dominio: str) -> tuple[list[str], list[str]]:
    emails, telefonos = [], []

    for m in RE_EMAIL.findall(html):
        m = m.strip(".").lower()
        if es_basura(m) or m in emails:
            continue
        emails.append(m)

    for bruto in RE_TEL_LINK.findall(html):
        t = limpiar_telefono(bruto)
        if t and t not in telefonos:
            telefonos.append(t)

    if not telefonos:
        texto = re.sub(r"<script.*?</script>|<style.*?</style>", " ", html, flags=re.S | re.I)
        texto = re.sub(r"<[^>]+>", " ", texto)
        for bruto in RE_TEL_TEXTO.findall(texto):
            t = limpiar_telefono(bruto)
            if t and t not in telefonos:
                telefonos.append(t)
            if len(telefonos) >= 3:
                break

    # El mail del propio dominio vale más que un gmail suelto o el del que hizo la web
    raiz = dominio.split(".")[0] if dominio else ""
    emails.sort(key=lambda e: (raiz not in e.split("@")[-1], len(e)))
    return emails[:3], telefonos[:3]


def procesar(fila: dict) -> dict:
    web, dominio = fila.get("sitio_web", "").strip(), fila.get("dominio", "").strip()
    resultado = {"id": fila["id"], "empresa": fila["empresa"], "dominio": dominio,
                 "emails": [], "telefonos": [], "paginas": 0}
    if not web:
        return resultado

    html = bajar(web)
    if html is None and web.startswith("https://"):
        html = bajar("http://" + web[len("https://"):])
    if html is None:
        return resultado

    resultado["paginas"] = 1
    emails, telefonos = extraer(html, dominio)

    for url in paginas_de_contacto(html, web):
        extra = bajar(url)
        if not extra:
            continue
        resultado["paginas"] += 1
        e2, t2 = extraer(extra, dominio)
        emails += [e for e in e2 if e not in emails]
        telefonos += [t for t in t2 if t not in telefonos]

    resultado["emails"], resultado["telefonos"] = emails[:3], telefonos[:3]
    return resultado


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="una línea JSON por lead")
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()

    with CSV_PATH.open(encoding="utf-8", newline="") as fh:
        filas = list(csv.DictReader(fh))

    con_mail = con_tel = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        for r in pool.map(procesar, filas):
            if r["emails"]:
                con_mail += 1
            if r["telefonos"]:
                con_tel += 1
            if args.json:
                print("CONTACTO " + json.dumps(r, ensure_ascii=False), flush=True)
            else:
                print(f"{r['empresa'][:38]:38s} {','.join(r['emails'])[:45]:45s} {','.join(r['telefonos'])}", flush=True)

    print(f"\n{len(filas)} sitios leídos. Con email: {con_mail}. Con teléfono: {con_tel}.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
