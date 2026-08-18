#!/usr/bin/env python3
"""Revisa la configuración de correo de un dominio: MX, SPF, DKIM y DMARC.

Son los registros que Microsoft y Google miran para decidir si un mail entra a la
bandeja o cae en spam. Sin ellos, un envío de 100 mails en un día es casi
garantía de carpeta de promociones.

    python3 scripts/dns-correo.py collectionat.com

Necesita salida a internet sin restricciones (corre en GitHub Actions).
"""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request

DOH = "https://dns.google/resolve?name={n}&type={t}"
# Selectores DKIM habituales segun proveedor
SELECTORES = {
    "selector1": "Microsoft 365", "selector2": "Microsoft 365",
    "google": "Google Workspace", "default": "genérico",
    "k1": "Mailchimp/Mandrill", "dkim": "genérico", "s1": "genérico",
}


def consultar(nombre: str, tipo: str) -> list[str] | None:
    req = urllib.request.Request(DOH.format(n=nombre, t=tipo),
                                 headers={"accept": "application/dns-json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            data = json.load(r)
    except (urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError):
        return None
    return [a["data"].strip('"').replace('" "', "") for a in data.get("Answer", [])]


def revisar(dominio: str) -> int:
    print(f"=== {dominio} ===\n")
    problemas = []

    mx = consultar(dominio, "MX") or []
    print("MX:")
    for m in mx or ["(ninguno)"]:
        print("   ", m)
    if not mx:
        problemas.append("El dominio no publica MX: no puede recibir correo.")

    txt = consultar(dominio, "TXT") or []
    spf = [t for t in txt if t.lower().startswith("v=spf1")]
    print("\nSPF:")
    if not spf:
        print("    NO CONFIGURADO")
        problemas.append("Sin SPF: cualquiera puede mandar mails diciendo ser tu dominio, "
                         "y los filtros lo penalizan.")
    for s in spf:
        print("   ", s)
        if s.rstrip().endswith("+all"):
            problemas.append("El SPF termina en +all: eso autoriza a cualquiera. Debe ser ~all o -all.")
        elif not (s.rstrip().endswith("~all") or s.rstrip().endswith("-all")):
            problemas.append("El SPF no cierra con ~all ni -all: queda incompleto.")
    if len(spf) > 1:
        problemas.append("Hay más de un registro SPF: eso lo invalida entero. Debe quedar uno solo.")

    print("\nDKIM:")
    encontrados = []
    for sel, prov in SELECTORES.items():
        r = consultar(f"{sel}._domainkey.{dominio}", "CNAME") or consultar(f"{sel}._domainkey.{dominio}", "TXT")
        if r:
            encontrados.append(sel)
            print(f"    {sel} ({prov}): {r[0][:70]}")
    if not encontrados:
        print("    NO ENCONTRADO en los selectores habituales")
        problemas.append("Sin DKIM: los mails salen sin firma digital. Es de lo que más pesa "
                         "para que Outlook y Gmail confíen en el remitente.")

    dmarc = consultar(f"_dmarc.{dominio}", "TXT") or []
    dmarc = [d for d in dmarc if d.lower().startswith("v=dmarc1")]
    print("\nDMARC:")
    if not dmarc:
        print("    NO CONFIGURADO")
        problemas.append("Sin DMARC: no le decís a los servidores qué hacer con los mails que "
                         "fallan la verificación, y no recibís reportes de entrega.")
    for d in dmarc:
        print("   ", d)

    print("\n" + ("-" * 60))
    if problemas:
        print(f"\n{len(problemas)} cosas para corregir:\n")
        for i, p in enumerate(problemas, 1):
            print(f"  {i}. {p}")
    else:
        print("\nConfiguración de correo completa: SPF, DKIM y DMARC en orden.")
    return len(problemas)


if __name__ == "__main__":
    dominios = sys.argv[1:] or ["collectionat.com"]
    total = 0
    for d in dominios:
        total += revisar(d)
        print()
    raise SystemExit(0)
