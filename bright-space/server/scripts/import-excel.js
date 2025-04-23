/**
 * Bulk importer
 * Reads every VCAMS Excel file in the list, cleans the data, and writes it
 * to the `Record` table – one table, distinguished by `indicatorCode`.
 *
 * Run from the server root:
 *   node scripts/import-excel.js
 */

const path  = require('path');
const XLSX  = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* ---------- file / indicator mapping ---------- */
const files = [
  { code: '3_1',  name: 'VCAMS_indicator_3_1.xlsx' },
  { code: '3_2a', name: 'VCAMS_indicator_3_2a.xlsx' },
  { code: '3_2c', name: 'VCAMS_indicator_3_2c.xlsx' },
  { code: '3_3',  name: 'VCAMS_indicator_3_3.xlsx' },
  { code: '3_4',  name: 'VCAMS_indicator_3_4.xlsx' }
];

/* ---------- helper functions ---------- */
const toInt   = v => v ? parseInt(String(v).replace(/,/g, '').trim(), 10)        : null;
const toFloat = v => v ? parseFloat(String(v).replace(/[, %]/g, '').trim())      : null;
const isNdp   = v => v === 'NDP' || v === undefined || v === null || v === '';

/* ---------- main logic ---------- */
(async () => {
  for (const { code, name } of files) {
    const excelPath = path.join(__dirname, '..', 'data', name);
    const wb     = XLSX.readFile(excelPath);
    const sheet  = wb.Sheets[wb.SheetNames[0]];
    const rows   = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    console.log(`📥  [${code}] ${rows.length} rows parsed – importing…`);

    const batch = [];

    for (const r of rows) {
      const yearRaw        = r['Year'];
      const lgaKeyRaw      = r['LGA_KEY'];
      const numeratorRaw   = r['Numerator'];
      const denominatorRaw = r['Denominator'];
      const indicatorRaw   = r['Indicator'];
      const lgaDesc        = (r['LGA_DESC'] || '').trim();

      // basic validation
      if (
        isNdp(yearRaw)      || isNdp(lgaKeyRaw) ||
        isNdp(numeratorRaw) || isNdp(denominatorRaw) || isNdp(indicatorRaw)
      ) continue;

      const year        = toInt(yearRaw);
      const lgaKey      = toInt(lgaKeyRaw);
      if (isNaN(year) || isNaN(lgaKey)) continue; // skip bad rows

      batch.push({
        year,
        lgaKey,
        lgaDesc,
        numerator:   toInt(numeratorRaw),
        denominator: toInt(denominatorRaw),
        indicator:   toFloat(indicatorRaw),
        indicatorCode: code
      });
    }

    if (batch.length) {
      await prisma.record.createMany({
        data: batch,
        skipDuplicates: true   // works with the unique index (year,lgaKey,indicatorCode)
      });
      console.log(`✅  [${code}] ${batch.length} rows inserted.`);
    } else {
      console.log(`⚠️  [${code}] no valid rows found; skipped.`);
    }
  }

  console.log('🎉  All files processed.');
  await prisma.$disconnect();
})();
