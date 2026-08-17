#!/usr/bin/env python3
"""Genera docs/crm/Collectionat-CRM.xlsx a partir de docs/crm/leads.csv.

El CSV es la fuente de verdad (versionada en git); el .xlsx es la copia cómoda para
subir a Google Drive y abrir con Google Sheets, ya con filtros, listas desplegables y
resaltado de los leads grado A.

    pip install openpyxl
    python3 scripts/crm-build-xlsx.py
"""

from __future__ import annotations

import csv
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "docs" / "crm" / "leads.csv"
XLSX_PATH = ROOT / "docs" / "crm" / "Collectionat-CRM.xlsx"

BRAND = "0E7490"  # cyan/petróleo de la marca
ESTADOS = ["nuevo", "verificado", "contactado", "respondió", "demo agendada", "propuesta", "ganado", "perdido"]
GRADOS = ["A", "B", "C"]
MS365 = ["si", "no", "revisar"]
VERTICALES = [
    "Inmobiliarias", "Estudios jurídicos", "Administradoras de consorcios",
    "Escribanías", "Estudios contables", "Distribuidoras / mayoristas",
]
ANCHOS = {
    "empresa": 34, "vertical": 28, "ciudad": 12, "sitio_web": 44, "dominio": 30,
    "proveedor_mail": 18, "cargo_objetivo": 30, "contacto_nombre": 22, "contacto_email": 28,
    "telefono": 18, "estado": 15, "proxima_accion": 32, "ultimo_contacto": 14,
    "fuente": 14, "notas": 70,
}

CRITERIOS = [
    ("Los 4 filtros del ICP", ""),
    ("1. Tamaño", "8 a 150 empleados. Menos de 8 no justifican los USD 4.500; más de 150 ya tienen ERP y comité de compras."),
    ("2. Microsoft 365", "Es el diferencial entero. Una empresa 100% Google Workspace no es lead: es una migración."),
    ("3. Vencimientos que duelen", "Contratos, matrículas, habilitaciones, plazos procesales, expensas, pólizas."),
    ("4. Dueño del desorden", "Alguien cuyo día se arruina cuando falta un papel. Si no existe ese cargo, no hay comprador."),
    ("", ""),
    ("Criterio de fondo", "Collectionat encaja donde el caos es documental y de plazos, no productivo: empresas que administran obligaciones, no que fabrican o mueven cosas."),
    ("", ""),
    ("Verticales A", "Inmobiliarias · Estudios jurídicos · Administradoras de consorcios · Escribanías · Estudios contables · Distribuidoras"),
    ("Verticales B", "Clínicas · Brokers de seguros · Constructoras · Agencias de RRHH · Despachantes de aduana · Colegios privados"),
    ("No perder tiempo", "Retail y gastronomía · Industria y manufactura · Agencias y startups · Freelancers · Corporativos de +300"),
    ("", ""),
    ("Grado A", "Usa Microsoft 365 y entra en tamaño. Acá va el esfuerzo."),
    ("Grado B", "Otro proveedor de mail. Sirve, pero cuesta más."),
    ("Grado C", "Google Workspace, sin dominio propio o fuera de tamaño. Descartar."),
    ("", ""),
    ("Regla de foco", "100 contactos de UN vertical antes de abrir el segundo. Sugerido: estudios jurídicos de La Plata."),
]

FUENTES = [
    ("Estudios jurídicos", "Legal.com.ar (31 estudios en La Plata)", "https://www.legal.com.ar/abogados/estudios-juridicos/la-plata"),
    ("Estudios jurídicos", "AbogadosDe.com.ar", "https://abogadosde.com.ar/buenos-aires/la-plata-147"),
    ("Inmobiliarias", "Zonaprop (181 inmobiliarias en La Plata)", "https://www.zonaprop.com.ar/inmobiliarias-la-plata.html"),
    ("Inmobiliarias", "Inmobúsqueda", "https://www.inmobusqueda.com.ar/inmobiliarias-la-plata.html"),
    ("Inmobiliarias", "Índice La Plata", "https://comercios.indicelaplata.com.ar/inmobiliarias.php"),
    ("Escribanías", "Colegio de Escribanos PBA", "https://www.colescba.org.ar/portal/"),
    ("Escribanías", "Escribanías Argentinas", "https://escribaniasargentinas.com.ar/localidad/la-plata/"),
    ("Administradoras de consorcios", "Registro provincial de administradores", "https://www.gba.gob.ar/dppj/administracion-consorcios"),
]


def sheet_leads(wb: Workbook) -> None:
    with CSV_PATH.open(encoding="utf-8", newline="") as fh:
        rows = list(csv.reader(fh))
    header, body = rows[0], rows[1:]

    ws = wb.create_sheet("Leads")
    ws.append(header)
    for row in body:
        ws.append(row)

    last_row = len(body) + 1
    for idx, name in enumerate(header, start=1):
        letter = get_column_letter(idx)
        ws.column_dimensions[letter].width = ANCHOS.get(name, 16)
        cell = ws.cell(row=1, column=idx)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor=BRAND)
        cell.alignment = Alignment(vertical="center")
    ws.row_dimensions[1].height = 24
    ws.freeze_panes = "C2"
    ws.auto_filter.ref = f"A1:{get_column_letter(len(header))}{last_row}"

    for name, opciones in (("estado", ESTADOS), ("grado", GRADOS), ("ms365", MS365), ("vertical", VERTICALES)):
        col = get_column_letter(header.index(name) + 1)
        dv = DataValidation(type="list", formula1=f'"{",".join(opciones)}"', allow_blank=True)
        ws.add_data_validation(dv)
        dv.add(f"{col}2:{col}500")

    grado_col = get_column_letter(header.index("grado") + 1)
    rango = f"{grado_col}2:{grado_col}{max(last_row, 2)}"
    ws.conditional_formatting.add(rango, CellIsRule(
        operator="equal", formula=['"A"'], fill=PatternFill("solid", bgColor="C6F6D5"), font=Font(bold=True)))
    ws.conditional_formatting.add(rango, CellIsRule(
        operator="equal", formula=['"C"'], fill=PatternFill("solid", bgColor="FED7D7")))

    web_col = header.index("sitio_web") + 1
    for r in range(2, last_row + 1):
        cell = ws.cell(row=r, column=web_col)
        if cell.value:
            cell.hyperlink = cell.value
            cell.font = Font(color="0563C1", underline="single")


def sheet_criterios(wb: Workbook) -> None:
    ws = wb.create_sheet("Criterios ICP")
    ws.column_dimensions["A"].width = 28
    ws.column_dimensions["B"].width = 110
    for titulo, detalle in CRITERIOS:
        ws.append([titulo, detalle])
        cell = ws.cell(row=ws.max_row, column=1)
        cell.font = Font(bold=True)
        ws.cell(row=ws.max_row, column=2).alignment = Alignment(wrap_text=True, vertical="top")


def sheet_fuentes(wb: Workbook) -> None:
    ws = wb.create_sheet("Fuentes")
    ws.append(["vertical", "directorio", "url"])
    for idx, width in enumerate((30, 44, 70), start=1):
        ws.column_dimensions[get_column_letter(idx)].width = width
        cell = ws.cell(row=1, column=idx)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor=BRAND)
    for vertical, nombre, url in FUENTES:
        ws.append([vertical, nombre, url])
        cell = ws.cell(row=ws.max_row, column=3)
        cell.hyperlink = url
        cell.font = Font(color="0563C1", underline="single")
    ws.freeze_panes = "A2"


def main() -> int:
    wb = Workbook()
    wb.remove(wb.active)
    sheet_leads(wb)
    sheet_criterios(wb)
    sheet_fuentes(wb)
    wb.save(XLSX_PATH)
    print(f"Generado {XLSX_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
