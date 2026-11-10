/**
 * Google Apps Script backend — Sewmini & Oshada wedding invitation
 *
 * Saves RSVPs and Wishes from the website into this spreadsheet:
 * https://docs.google.com/spreadsheets/d/1EYiobM9oXaz-upkrYzGO28948Oc9ej8wjRMT4o0LWqQ/edit
 *
 * Each form gets its own sheet ("RSVP" and "Wishes"), auto-created with
 * styled, frozen headers the first time it is needed.
 *
 * SETUP
 *  1. Open the spreadsheet → Extensions → Apps Script.
 *  2. Replace everything in Code.gs with this file and Save.
 *  3. Select the function `setup` in the toolbar and click Run (approve permissions).
 *     This creates both sheets with headers straight away.
 *  4. Deploy → New deployment → type "Web app"
 *       Execute as: Me
 *       Who has access: Anyone
 *     Click Deploy and copy the Web app URL (ends with /exec).
 *  5. Put that URL in src/wedding.ts → SCRIPT_URL.
 *
 * If you edit this script later: Deploy → Manage deployments → Edit → Version: New version.
 */

var SPREADSHEET_ID = '1EYiobM9oXaz-upkrYzGO28948Oc9ej8wjRMT4o0LWqQ';

var SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Full Name', 'Guests', 'Attendance', 'Dietary Notes', 'Invited As'],
    fields: ['name', 'guests', 'attendance', 'dietary', 'invitedAs'],
    widths: [170, 200, 80, 110, 280, 200],
  },
  WISHES: {
    name: 'Wishes',
    headers: ['Timestamp', 'Guest Name', 'Message', 'Invited As'],
    fields: ['name', 'message', 'invitedAs'],
    widths: [170, 200, 450, 200],
  },
};

var HEADER_BG = '#7a1f2b'; // royal maroon
var HEADER_FG = '#ffffff';

// ---------- Web endpoints ----------

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = parsePayload_(e);
    var config = resolveSheetConfig_(data.sheet);
    if (!config) {
      return json_({ result: 'error', error: 'Unknown sheet "' + data.sheet + '". Use RSVP or Wishes.' });
    }

    var sheet = getOrCreateSheet_(config);
    var row = [new Date()];
    for (var i = 0; i < config.fields.length; i++) {
      row.push(clean_(data[config.fields[i]]));
    }
    sheet.appendRow(row);

    return json_({ result: 'success', sheet: config.name, row: sheet.getLastRow() });
  } catch (error) {
    return json_({ result: 'error', error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ result: 'success', message: 'Sewmini & Oshada wedding endpoint is running.' });
}

/** Run once from the Apps Script editor to create both sheets and authorize the script. */
function setup() {
  getOrCreateSheet_(SHEETS.RSVP);
  getOrCreateSheet_(SHEETS.WISHES);
}

// ---------- Helpers ----------

function resolveSheetConfig_(value) {
  var key = String(value || '').trim().toUpperCase();
  if (key === 'RSVP') return SHEETS.RSVP;
  if (key === 'WISHES' || key === 'WISH') return SHEETS.WISHES;
  return null;
}

function getOrCreateSheet_(config) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  ensureHeaders_(sheet, config);
  return sheet;
}

function ensureHeaders_(sheet, config) {
  var width = config.headers.length;
  var current = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, width).getValues()[0]
    : [];

  var matches = current.length === width && current.every(function (v, i) {
    return String(v) === config.headers[i];
  });
  if (matches) return;

  if (sheet.getLastRow() > 0 && String(current[0]) !== 'Timestamp') {
    // Sheet has data but no header row — insert one on top instead of overwriting.
    sheet.insertRowBefore(1);
  }

  var header = sheet.getRange(1, 1, 1, width);
  header.setValues([config.headers]);
  header
    .setFontWeight('bold')
    .setBackground(HEADER_BG)
    .setFontColor(HEADER_FG)
    .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  for (var i = 0; i < config.widths.length; i++) {
    sheet.setColumnWidth(i + 1, config.widths[i]);
  }
  if (sheet.getMaxRows() > 1) {
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  }
  sheet.getRange(1, 1, sheet.getMaxRows(), width).setWrap(true).setVerticalAlignment('top');
}

function parsePayload_(e) {
  var params = (e && e.parameter) || {};
  if (Object.keys(params).length > 0) return params;

  var contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!contents) return {};

  try {
    return JSON.parse(contents);
  } catch (_ignored) {
    var out = {};
    contents.split('&').forEach(function (pair) {
      if (!pair) return;
      var idx = pair.indexOf('=');
      var k = idx >= 0 ? pair.slice(0, idx) : pair;
      var v = idx >= 0 ? pair.slice(idx + 1) : '';
      out[decodeURIComponent(k.replace(/\+/g, ' '))] = decodeURIComponent(v.replace(/\+/g, ' '));
    });
    return out;
  }
}

/** Trims input and stops values starting with = + - @ from being run as spreadsheet formulas. */
function clean_(value) {
  var s = String(value == null ? '' : value).trim().slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
