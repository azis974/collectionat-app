/**
 * CRM de leads Collectionat — Google Apps Script.
 *
 * Instalación (una sola vez, 2 minutos):
 *   1. Google Sheets → planilla nueva (sheets.new)
 *   2. Extensiones → Apps Script
 *   3. Borrá lo que haya y pegá TODO este archivo
 *   4. Guardá (disquete) y volvé a la planilla
 *   5. Recargá la página: aparece el menú "Collectionat CRM" arriba
 *
 * Desde ahí:
 *   - "Armar CRM"           → crea las columnas, los desplegables y carga los leads iniciales
 *   - "Verificar Microsoft 365" → consulta los MX de cada dominio y asigna el grado
 *   - "Agregar dominio…"    → suma un lead suelto y lo verifica en el momento
 *
 * La primera vez que corras algo, Google pide autorizar el script: es tu propia
 * planilla ejecutando tu propio código, y solo pide permiso para editar la hoja y
 * hacer consultas DNS a dns.google.
 */

var HOJA = 'Leads';

var COLUMNAS = [
  'id', 'vertical', 'empresa', 'ciudad', 'sitio_web', 'dominio', 'proveedor_mail',
  'ms365', 'tamano_estimado', 'cargo_objetivo', 'contacto_nombre', 'contacto_email',
  'telefono', 'grado', 'estado', 'proxima_accion', 'ultimo_contacto', 'fuente', 'notas'
];

var ANCHOS = {
  empresa: 240, vertical: 200, ciudad: 90, sitio_web: 280, dominio: 210,
  proveedor_mail: 140, cargo_objetivo: 220, contacto_nombre: 170, contacto_email: 210,
  telefono: 130, estado: 120, proxima_accion: 230, fuente: 110, notas: 420
};

var ESTADOS = ['nuevo', 'verificado', 'contactado', 'respondió', 'demo agendada', 'propuesta', 'ganado', 'perdido'];
var GRADOS = ['A', 'B', 'C'];
var MS365 = ['si', 'no', 'revisar'];
var VERTICALES = [
  'Inmobiliarias', 'Estudios jurídicos', 'Administradoras de consorcios',
  'Escribanías', 'Estudios contables', 'Distribuidoras / mayoristas'
];

// Leads iniciales: empresa, vertical, ciudad, sitio, dominio, cargo objetivo, notas.
var SEMILLA = [
  ['Menacho Propiedades', 'Inmobiliarias', 'La Plata', 'https://www.menacho.com.ar/', 'menacho.com.ar', 'Gerente de Administración', 'Verificar si administra alquileres o solo venta.'],
  ['Alberto Dacal Propiedades', 'Inmobiliarias', 'La Plata', 'https://dacal.com.ar/', 'dacal.com.ar', 'Gerente de Administración', 'Venta y alquiler en La Plata y City Bell.'],
  ['Jorge J. Yacoub', 'Inmobiliarias', 'La Plata', 'https://www.jjyacoub.com.ar/', 'jjyacoub.com.ar', 'Dueño / Gerente de Administración', 'Sucursales en La Plata y City Bell.'],
  ['Mirta Libera Propiedades', 'Inmobiliarias', 'La Plata', 'https://www.mirtalibera.com.ar/', 'mirtalibera.com.ar', 'Dueña', 'Posible menos de 8 empleados: verificar tamaño.'],
  ['Rivas Propiedades', 'Inmobiliarias', 'La Plata', 'https://www.rivaspropiedades.com.ar/', 'rivaspropiedades.com.ar', 'Gerente de Administración', 'Alquiler y venta.'],
  ['WS y Asociados', 'Estudios jurídicos', 'La Plata', 'https://wsyasociados.com.ar/abogados-en-la-plata/', 'wsyasociados.com.ar', 'Socio Administrador', 'Estudio jurídico integral.'],
  ['Estudio Jurídico Rocha & Asociados', 'Estudios jurídicos', 'La Plata', 'https://www.rochayasoc.com/', 'rochayasoc.com', 'Socio Administrador', 'Penal, civil, laboral, familia y sucesiones.'],
  ['Escribanía Úngaro', 'Escribanías', 'La Plata', 'https://www.escribania-ungaro.com/', 'escribania-ungaro.com', 'Escribano/a Titular', 'Verificar sede.'],
  ['Escribanía Ocampo Frontini', 'Escribanías', 'La Plata', 'https://www.escribaniaocampofrontini.com/', 'escribaniaocampofrontini.com', 'Escribano/a Titular', 'Calle 48 990, La Plata.'],
  ['Administración Lamberti', 'Administradoras de consorcios', 'La Plata', 'https://administracionlamberti.com/', 'administracionlamberti.com', 'Dueño / Gerente de Operaciones', 'Miembro de la Cámara de Administradores de La Plata.'],
  ['Administración de Consorcios Barbieratti', 'Administradoras de consorcios', 'La Plata', 'https://drluisbarbieratti.wixsite.com/administraciondecons', '', 'Dueño', 'Sitio en Wix sin dominio propio: estructura chica.']
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Collectionat CRM')
    .addItem('Armar CRM', 'armarCRM')
    .addItem('Verificar Microsoft 365', 'verificarMicrosoft365')
    .addItem('Agregar dominio…', 'agregarDominio')
    .addToUi();
}

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);
}

function indice_(nombre) {
  return COLUMNAS.indexOf(nombre) + 1; // 1-based, como las columnas de Sheets
}

function armarCRM() {
  var sh = hoja_();
  sh.clear();

  sh.getRange(1, 1, 1, COLUMNAS.length).setValues([COLUMNAS])
    .setFontWeight('bold').setFontColor('#ffffff').setBackground('#0e7490');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(3);

  for (var i = 0; i < COLUMNAS.length; i++) {
    if (ANCHOS[COLUMNAS[i]]) sh.setColumnWidth(i + 1, ANCHOS[COLUMNAS[i]]);
  }

  var filas = SEMILLA.map(function (lead, n) {
    var fila = new Array(COLUMNAS.length).fill('');
    fila[indice_('id') - 1] = n + 1;
    fila[indice_('empresa') - 1] = lead[0];
    fila[indice_('vertical') - 1] = lead[1];
    fila[indice_('ciudad') - 1] = lead[2];
    fila[indice_('sitio_web') - 1] = lead[3];
    fila[indice_('dominio') - 1] = lead[4];
    fila[indice_('cargo_objetivo') - 1] = lead[5];
    fila[indice_('notas') - 1] = lead[6];
    fila[indice_('estado') - 1] = 'nuevo';
    fila[indice_('fuente') - 1] = 'busqueda web';
    return fila;
  });
  sh.getRange(2, 1, filas.length, COLUMNAS.length).setValues(filas);

  desplegable_(sh, 'estado', ESTADOS);
  desplegable_(sh, 'grado', GRADOS);
  desplegable_(sh, 'ms365', MS365);
  desplegable_(sh, 'vertical', VERTICALES);
  resaltarGrados_(sh);

  var filtroPrevio = sh.getFilter();
  if (filtroPrevio) filtroPrevio.remove();
  sh.getDataRange().createFilter();
  SpreadsheetApp.getUi().alert(
    'CRM armado con ' + filas.length + ' leads.\n\n' +
    'Ahora corré "Verificar Microsoft 365" para calificarlos.'
  );
}

function desplegable_(sh, columna, opciones) {
  var regla = SpreadsheetApp.newDataValidation().requireValueInList(opciones, true).setAllowInvalid(true).build();
  sh.getRange(2, indice_(columna), 500, 1).setDataValidation(regla);
}

function resaltarGrados_(sh) {
  var rango = sh.getRange(2, 1, 500, COLUMNAS.length);
  var letra = columnaLetra_(indice_('grado'));
  var reglas = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$' + letra + '2="A"').setBackground('#d6f5e0').setRanges([rango]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$' + letra + '2="C"').setBackground('#fde2e1').setRanges([rango]).build()
  ];
  sh.setConditionalFormatRules(reglas);
}

function columnaLetra_(n) {
  var letra = '';
  while (n > 0) {
    var resto = (n - 1) % 26;
    letra = String.fromCharCode(65 + resto) + letra;
    n = Math.floor((n - resto) / 26);
  }
  return letra;
}

/**
 * Consulta los registros MX de un dominio vía DNS-over-HTTPS y lo clasifica.
 * Devuelve {proveedor, ms365, grado} o null si la consulta falla.
 */
function consultarMX_(dominio) {
  var url = 'https://dns.google/resolve?name=' + encodeURIComponent(dominio) + '&type=MX';
  try {
    var resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (resp.getResponseCode() !== 200) return null;
    var data = JSON.parse(resp.getContentText());
  } catch (e) {
    return null;
  }

  var registros = (data.Answer || []).filter(function (a) { return a.type === 15; })
    .map(function (a) { return String(a.data).toLowerCase(); });
  if (!registros.length) return { proveedor: 'sin MX', ms365: 'no', grado: 'C' };

  var texto = registros.join(' ');
  if (/mail\.protection\.outlook\.com|outlook\.com|office365\.com/.test(texto)) {
    return { proveedor: 'Microsoft 365', ms365: 'si', grado: 'A' };
  }
  if (/google\.com|googlemail\.com/.test(texto)) {
    return { proveedor: 'Google Workspace', ms365: 'no', grado: 'C' };
  }
  if (/zoho/.test(texto)) return { proveedor: 'Zoho', ms365: 'no', grado: 'B' };
  if (/secureserver\.net/.test(texto)) return { proveedor: 'GoDaddy', ms365: 'no', grado: 'B' };
  if (/donweb|cpanel|hostinger|ferozo|dattaweb/.test(texto)) {
    return { proveedor: 'Hosting propio', ms365: 'no', grado: 'B' };
  }
  if (/pphosted\.com|mimecast|barracuda/.test(texto)) {
    return { proveedor: 'Gateway corporativo', ms365: 'revisar', grado: 'B' };
  }
  return { proveedor: 'otro', ms365: 'no', grado: 'B' };
}

function verificarMicrosoft365() {
  var sh = hoja_();
  var ultima = sh.getLastRow();
  if (ultima < 2) {
    SpreadsheetApp.getUi().alert('No hay leads todavía. Corré "Armar CRM" primero.');
    return;
  }

  var datos = sh.getRange(2, 1, ultima - 1, COLUMNAS.length).getValues();
  var verificados = 0, sinRed = 0, gradoA = 0;

  for (var i = 0; i < datos.length; i++) {
    var dominio = String(datos[i][indice_('dominio') - 1] || '').trim().toLowerCase();
    var yaTiene = String(datos[i][indice_('proveedor_mail') - 1] || '').trim();
    if (yaTiene) continue;

    if (!dominio) {
      datos[i][indice_('proveedor_mail') - 1] = 'sin dominio propio';
      datos[i][indice_('ms365') - 1] = 'no';
      datos[i][indice_('grado') - 1] = 'C';
      continue;
    }

    var r = consultarMX_(dominio);
    if (!r) { sinRed++; continue; } // no adivinamos: la fila queda como estaba

    datos[i][indice_('proveedor_mail') - 1] = r.proveedor;
    datos[i][indice_('ms365') - 1] = r.ms365;
    datos[i][indice_('grado') - 1] = r.grado;
    if (!String(datos[i][indice_('proxima_accion') - 1] || '').trim()) {
      datos[i][indice_('proxima_accion') - 1] = r.grado === 'A'
        ? 'buscar al ' + (datos[i][indice_('cargo_objetivo') - 1] || 'decisor') + ' en LinkedIn'
        : 'verificar tamaño antes de invertir tiempo';
    }
    verificados++;
    if (r.grado === 'A') gradoA++;
    Utilities.sleep(120); // no golpear el resolver
  }

  sh.getRange(2, 1, datos.length, COLUMNAS.length).setValues(datos);
  SpreadsheetApp.getUi().alert(
    verificados + ' dominios verificados.\n' +
    gradoA + ' son grado A (usan Microsoft 365) — empezá por esos.' +
    (sinRed ? '\n' + sinRed + ' no respondieron y quedaron sin tocar.' : '')
  );
}

function agregarDominio() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.prompt('Agregar lead', 'Pegá: empresa, dominio  (ej: Estudio Pérez, estudioperez.com.ar)', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;

  var partes = resp.getResponseText().split(',');
  var empresa = (partes[0] || '').trim();
  var dominio = (partes[1] || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!empresa || !dominio) { ui.alert('Necesito empresa y dominio separados por coma.'); return; }

  var sh = hoja_();
  var fila = new Array(COLUMNAS.length).fill('');
  fila[indice_('id') - 1] = sh.getLastRow();
  fila[indice_('empresa') - 1] = empresa;
  fila[indice_('dominio') - 1] = dominio;
  fila[indice_('estado') - 1] = 'nuevo';

  var r = consultarMX_(dominio);
  if (r) {
    fila[indice_('proveedor_mail') - 1] = r.proveedor;
    fila[indice_('ms365') - 1] = r.ms365;
    fila[indice_('grado') - 1] = r.grado;
  }
  sh.appendRow(fila);
  ui.alert(empresa + ': ' + (r ? r.proveedor + ' → grado ' + r.grado : 'no pude consultar los MX'));
}
