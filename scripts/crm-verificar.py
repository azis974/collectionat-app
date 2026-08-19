#!/usr/bin/env python3
"""Verifica la integridad de docs/crm/leads.csv.

No consulta internet: revisa que la base sea coherente consigo misma y con los
criterios de docs/icp.md. Sirve para no descubrir a mano que hay un lead cargado
dos veces, un mail con un typo o un grado que no coincide con el proveedor de correo.

    python3 scripts/crm-verificar.py            # informe legible
    python3 scripts/crm-verificar.py --estricto # además devuelve 1 si hay errores

Sale con código 1 si encuentra ERRORES (datos rotos). Las ADVERTENCIAS no rompen:
son cosas a mirar, como un lead sin próxima acción.
"""

from __future__ import annotations

import argparse
import collections
import csv
import re
import sys
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent / "docs" / "crm" / "leads.csv"

COLUMNAS = [
    "id", "vertical", "empresa", "ciudad", "sitio_web", "dominio", "proveedor_mail",
    "ms365", "tamano_estimado", "cargo_objetivo", "linkedin_busqueda", "linkedin_perfil", "contacto_nombre", "contacto_email",
    "telefono", "grado", "estado", "proxima_accion", "ultimo_contacto", "fuente", "notas",
]
VERTICALES = {"Inmobiliarias", "Estudios jurídicos", "Administradoras de consorcios",
              "Escribanías", "Estudios contables", "Distribuidoras / mayoristas"}
ESTADOS = {"nuevo", "verificado", "contactado", "respondió", "demo agendada",
           "propuesta", "ganado", "perdido", "descartado"}
GRADOS = {"A", "B", "C", ""}
MS365 = {"si", "no", "revisar", ""}

RE_EMAIL = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}(\.[A-Za-z]{2,3})?$")
RE_DOMINIO = re.compile(r"^[a-z0-9.-]+\.[a-z]{2,}$")
RE_TEL = re.compile(r"^\+?\d{8,14}$")


def verificar(filas: list[dict]) -> tuple[list[str], list[str]]:
    errores: list[str] = []
    avisos: list[str] = []

    def err(f, msg):
        errores.append(f"[{f['id']:>3}] {f['empresa'][:34]:34s} {msg}")

    def avi(f, msg):
        avisos.append(f"[{f['id']:>3}] {f['empresa'][:34]:34s} {msg}")

    ids = [f["id"] for f in filas]
    for valor, veces in collections.Counter(ids).items():
        if veces > 1:
            errores.append(f"id repetido: {valor} ({veces} veces)")

    por_dominio: dict[str, list[dict]] = collections.defaultdict(list)
    por_empresa: dict[str, list[dict]] = collections.defaultdict(list)

    for f in filas:
        if not f["empresa"].strip():
            err(f, "sin nombre de empresa")
        if f["vertical"] not in VERTICALES:
            err(f, f"vertical desconocido: {f['vertical']!r}")
        if f["estado"] not in ESTADOS:
            err(f, f"estado desconocido: {f['estado']!r}")
        if f["grado"] not in GRADOS:
            err(f, f"grado inválido: {f['grado']!r}")
        if f["ms365"] not in MS365:
            err(f, f"ms365 inválido: {f['ms365']!r}")

        dom = f["dominio"].strip().lower()
        if dom:
            if not RE_DOMINIO.match(dom):
                err(f, f"dominio mal formado: {dom!r}")
            por_dominio[dom].append(f)
        por_empresa[f["empresa"].strip().lower()].append(f)

        web = f["sitio_web"].strip()
        if not web:
            err(f, "sin sitio web")
        elif not web.startswith(("http://", "https://")):
            err(f, f"sitio_web sin esquema: {web!r}")
        elif dom and dom.split(".")[0] not in web.lower().replace("-", "-"):
            avi(f, f"el dominio {dom} no aparece en el sitio {web}")

        mail = f["contacto_email"].strip()
        if mail and not RE_EMAIL.match(mail):
            err(f, f"email mal formado: {mail!r}")

        tel = f["telefono"].strip()
        if tel and not RE_TEL.match(tel):
            err(f, f"teléfono mal formado: {tel!r}")

        # Coherencia entre proveedor de correo, ms365 y grado.
        # Un lead descartado a mano (no es una empresa, quedó fuera del ICP por otro
        # motivo) puede tener un grado que no se deduce del MX: es una decisión humana
        # que pisa la automática, así que no se controla.
        prov = f["proveedor_mail"]
        if f["estado"] == "descartado":
            if not f["notas"].strip():
                avi(f, "descartado a mano pero sin explicación en notas")
            continue
        if prov == "Microsoft 365" and (f["ms365"] != "si" or f["grado"] != "A"):
            err(f, f"usa Microsoft 365 pero ms365={f['ms365']!r} grado={f['grado']!r}")
        if prov == "Google Workspace" and f["grado"] != "C":
            err(f, f"Google Workspace debería ser grado C, es {f['grado']!r}")
        if f["ms365"] == "si" and f["grado"] != "A":
            err(f, "ms365=si pero no es grado A")
        if prov and not f["grado"]:
            err(f, "tiene proveedor de correo pero no grado")
        if f["grado"] and f["estado"] == "nuevo":
            avi(f, "ya está calificado pero sigue en estado 'nuevo'")
        if not f["proxima_accion"].strip():
            avi(f, "sin próxima acción definida")
        if not f["cargo_objetivo"].strip():
            avi(f, "sin cargo objetivo (filtro nº 4 del ICP)")

    for dom, repes in por_dominio.items():
        if len(repes) > 1:
            errores.append(f"dominio repetido {dom}: ids {', '.join(r['id'] for r in repes)}")
    for nombre, repes in por_empresa.items():
        if len(repes) > 1:
            avisos.append(f"empresa repetida {nombre!r}: ids {', '.join(r['id'] for r in repes)}")

    return errores, avisos


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--estricto", action="store_true", help="devuelve 1 también con advertencias")
    args = parser.parse_args()

    with CSV_PATH.open(encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        if reader.fieldnames != COLUMNAS:
            print(f"ERROR: las columnas cambiaron.\n  esperado: {COLUMNAS}\n  archivo:  {reader.fieldnames}")
            return 1
        filas = list(reader)

    errores, avisos = verificar(filas)

    print(f"{len(filas)} leads verificados\n")
    grados = collections.Counter(f["grado"] or "sin calificar" for f in filas)
    print("Por grado:      " + " · ".join(f"{g}: {n}" for g, n in sorted(grados.items())))
    print("Por vertical:   " + " · ".join(f"{v}: {n}" for v, n in collections.Counter(f["vertical"] for f in filas).most_common()))
    print("Por zona:       " + " · ".join(f"{c}: {n}" for c, n in collections.Counter(f["ciudad"].split(" / ")[0] for f in filas).most_common()))
    print(f"Con email:      {sum(1 for f in filas if f['contacto_email'].strip())}")
    print(f"Con teléfono:   {sum(1 for f in filas if f['telefono'].strip())}")
    print(f"Sin contacto:   {sum(1 for f in filas if not f['contacto_email'].strip() and not f['telefono'].strip())}")

    if errores:
        print(f"\nERRORES ({len(errores)}):")
        for e in errores:
            print("  " + e)
    else:
        print("\nSin errores de integridad.")

    if avisos:
        print(f"\nADVERTENCIAS ({len(avisos)}):")
        for a in avisos[:40]:
            print("  " + a)
        if len(avisos) > 40:
            print(f"  … y {len(avisos) - 40} más")

    if errores:
        return 1
    return 1 if (args.estricto and avisos) else 0


if __name__ == "__main__":
    raise SystemExit(main())
