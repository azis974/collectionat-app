#!/usr/bin/env python3
"""Agrega a cada lead su búsqueda de LinkedIn ya armada.

No entra a LinkedIn ni baja datos de ahí: solo construye la URL de búsqueda que
habría que tipear a mano — empresa + cargo objetivo — para que encontrar al
decisor sea un clic en vez de dos minutos de tipeo por lead.

Agrega dos columnas al CSV:
  linkedin_busqueda  la URL lista para hacer clic
  linkedin_perfil    vacía, para pegar el perfil cuando lo encuentres

    python3 scripts/crm-linkedin.py
"""
from __future__ import annotations

import csv
import re
import urllib.parse
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent / "docs" / "crm" / "leads.csv"
BASE = "https://www.linkedin.com/search/results/people/?keywords="

# Palabras que ensucian la búsqueda: LinkedIn matchea mejor con el nombre pelado.
RUIDO = re.compile(
    r"\b(propiedades|inmobiliaria|negocios inmobiliarios|estudio jurídico|estudio|"
    r"escribanía|escribania|administración|administracion|administraciones|"
    r"contadores públicos|contadores|distribuidora|mayorista|asociados|"
    r"y asoc\.?|& asoc\.?|s\.?a\.?|s\.?r\.?l\.?)\b", re.I)

# Cargo objetivo → términos que de verdad aparecen escritos en los perfiles
CARGOS = {
    "Socio Administrador": "socio OR titular OR abogado",
    "Socio": "socio OR titular OR contador",
    "Socia": "socia OR titular OR contadora",
    "Escribano/a Titular": "escribano OR escribana OR titular",
    "Gerente de Administración": "gerente OR administración OR director",
    "Gerente de Operaciones": "gerente OR operaciones OR director",
    "Gerente de Administración y Finanzas": "gerente OR administración OR finanzas",
    "Dueño": "dueño OR titular OR fundador OR director",
    "Dueña": "dueña OR titular OR fundadora OR directora",
}


def nombre_limpio(empresa: str) -> str:
    limpio = RUIDO.sub(" ", empresa)
    limpio = re.sub(r"\(.*?\)", " ", limpio)          # "(Ramos Mejía)" no ayuda
    limpio = re.sub(r"[^\wáéíóúñüÁÉÍÓÚÑ&. -]", " ", limpio)
    limpio = re.sub(r"\s+", " ", limpio).strip(" .-")
    limpio = re.sub(r"\s*[&y]\s*$", "", limpio, flags=re.I).strip(" .-,&")
    return limpio or empresa


def busqueda(fila: dict) -> str:
    empresa = nombre_limpio(fila["empresa"])
    cargo = fila["cargo_objetivo"].split(" / ")[0].strip()
    terminos = CARGOS.get(cargo, cargo.lower())
    consulta = f'"{empresa}" ({terminos})' if terminos else f'"{empresa}"'
    return BASE + urllib.parse.quote(consulta)


def main() -> int:
    with CSV_PATH.open(encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        campos = list(reader.fieldnames or [])
        filas = list(reader)

    for nueva in ("linkedin_busqueda", "linkedin_perfil"):
        if nueva not in campos:
            campos.insert(campos.index("contacto_nombre"), nueva)

    for f in filas:
        f["linkedin_busqueda"] = busqueda(f)
        f.setdefault("linkedin_perfil", "")

    with CSV_PATH.open("w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=campos)
        w.writeheader()
        w.writerows(filas)

    print(f"{len(filas)} búsquedas armadas. Ejemplos:\n")
    for f in filas[:2] + [x for x in filas if x["grado"] == "A"][:2]:
        print(f"  {f['empresa'][:38]:38s} {urllib.parse.unquote(f['linkedin_busqueda'].split('keywords=')[1])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
