#!/usr/bin/env python3
"""Enriquece docs/crm/leads.csv con el proveedor de correo de cada dominio.

El filtro nº 2 del ICP (¿usan Microsoft 365?) se resuelve mirando los registros MX
del dominio del lead. Este script los consulta y completa las columnas
`proveedor_mail`, `ms365` y `grado`.

Uso:
    python3 scripts/crm-mx-check.py                 # todos los dominios sin verificar
    python3 scripts/crm-mx-check.py --all           # revalida también los ya verificados
    python3 scripts/crm-mx-check.py --dry-run       # muestra el resultado sin escribir
    python3 scripts/crm-mx-check.py --domain x.com  # consulta suelta, no toca el CSV

Sin dependencias externas: usa DNS-over-HTTPS (dns.google) y, si no hay salida a
internet por HTTPS, cae a `dig`/`nslookup`. Requiere red abierta, así que hay que
correrlo en una máquina propia, no dentro de un entorno con egress restringido.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent / "docs" / "crm" / "leads.csv"
DOH_URL = "https://dns.google/resolve?name={domain}&type=MX"

# (patrón en el registro MX, proveedor, ¿es Microsoft 365?, grado sugerido)
PROVIDERS = [
    (r"mail\.protection\.outlook\.com|outlook\.com|office365\.com", "Microsoft 365", "si", "A"),
    (r"google\.com|googlemail\.com", "Google Workspace", "no", "C"),
    (r"zoho(cloud)?\.(com|eu)", "Zoho", "no", "B"),
    (r"secureserver\.net", "GoDaddy", "no", "B"),
    (r"donweb|cpanel|hostinger|ferozo|dattaweb", "Hosting propio", "no", "B"),
    (r"pphosted\.com|mimecast|barracuda", "Gateway corporativo", "revisar", "B"),
]


def resolve_doh(domain: str) -> list[str] | None:
    req = urllib.request.Request(
        DOH_URL.format(domain=domain), headers={"accept": "application/dns-json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.load(resp)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, OSError):
        return None
    return [a["data"] for a in data.get("Answer", []) if a.get("type") == 15]


def resolve_cli(domain: str) -> list[str] | None:
    if shutil.which("dig"):
        cmd = ["dig", "+short", "MX", domain]
    elif shutil.which("nslookup"):
        cmd = ["nslookup", "-type=mx", domain]
    else:
        return None
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
    except (subprocess.SubprocessError, OSError):
        return None
    if proc.returncode != 0:
        return None
    return [line.strip() for line in proc.stdout.splitlines() if "." in line and line.strip()]


def mx_records(domain: str) -> list[str] | None:
    """Lista de registros MX, o None si la consulta DNS no se pudo hacer."""
    records = resolve_doh(domain)
    if records is None:
        records = resolve_cli(domain)
    return records


def classify(records: list[str] | None) -> tuple[str, str, str]:
    """Devuelve (proveedor_mail, ms365, grado)."""
    if records is None:
        # No hubo respuesta DNS: no sabemos nada, no marcamos el lead.
        return ("", "", "")
    if not records:
        return ("sin MX", "no", "C")
    blob = " ".join(records).lower()
    for pattern, provider, ms365, grade in PROVIDERS:
        if re.search(pattern, blob):
            return (provider, ms365, grade)
    return ("otro: " + records[0].split()[-1].rstrip("."), "no", "B")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--all", action="store_true", help="revalida filas ya verificadas")
    parser.add_argument("--dry-run", action="store_true", help="no escribe el CSV")
    parser.add_argument("--domain", help="consulta un dominio suelto y termina")
    args = parser.parse_args()

    if args.domain:
        records = mx_records(args.domain)
        if records is None:
            print(f"{args.domain}: sin respuesta DNS (¿red restringida?)", file=sys.stderr)
            return 1
        provider, ms365, grade = classify(records)
        print(f"{args.domain}: {provider} (ms365={ms365}, grado={grade})")
        for r in records:
            print(f"  MX {r}")
        return 0

    if not CSV_PATH.exists():
        print(f"No encuentro {CSV_PATH}", file=sys.stderr)
        return 1

    with CSV_PATH.open(encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    checked = 0
    failed = 0
    for row in rows:
        domain = (row.get("dominio") or "").strip()
        if not domain:
            row["proveedor_mail"] = row["proveedor_mail"] or "sin dominio propio"
            row["ms365"] = row["ms365"] or "no"
            row["grado"] = row["grado"] or "C"
            continue
        if row.get("proveedor_mail") and not args.all:
            continue
        provider, ms365, grade = classify(mx_records(domain))
        if not provider:
            failed += 1
            print(f"{domain:40s} SIN RESPUESTA DNS — fila sin tocar", file=sys.stderr)
            continue
        row["proveedor_mail"], row["ms365"], row["grado"] = provider, ms365, grade
        if row.get("proxima_accion") == "verificar MX y tamaño":
            row["proxima_accion"] = (
                "buscar contacto en LinkedIn" if ms365 == "si" else "verificar tamaño antes de invertir tiempo"
            )
        checked += 1
        print(f"{domain:40s} {provider:20s} ms365={ms365:6s} grado={grade}")

    grades = {}
    for row in rows:
        grades[row.get("grado") or "-"] = grades.get(row.get("grado") or "-", 0) + 1
    print(f"\n{checked} dominios consultados. Grados: {grades}")
    if failed:
        print(
            f"{failed} dominios sin respuesta DNS: correlo desde una red sin restricciones "
            "(un entorno con egress bloqueado no puede resolver MX).",
            file=sys.stderr,
        )

    if args.dry_run:
        print("--dry-run: no escribí el CSV")
        return 0

    with CSV_PATH.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Actualizado {CSV_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
