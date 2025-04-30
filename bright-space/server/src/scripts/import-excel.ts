import path from "path";
import fs from "fs";
import XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const files: { code: string; name: string }[] = [
  { code: "3_1",  name: "VCAMS_indicator_3_1.xlsx"  },
  { code: "3_2a", name: "VCAMS_indicator_3_2a.xlsx" },
  { code: "3_2c", name: "VCAMS_indicator_3_2c.xlsx" },
  { code: "3_3",  name: "VCAMS_indicator_3_3.xlsx"  },
  { code: "3_4",  name: "VCAMS_indicator_3_4.xlsx"  },
  { code: "3_7_0",name: "VCAMS_indicator_3_7_0.xlsx"}
];

const toInt = (v: any): number | null =>
  v !== undefined && v !== null && v !== ""
    ? parseInt(String(v).replace(/,/g, "").trim(), 10)
    : null;

const toFloat = (v: any): number | null =>
  v !== undefined && v !== null && v !== ""
    ? parseFloat(String(v).replace(/[, %]/g, "").trim())
    : null;

const isEmpty = (v: any): boolean =>
  v === undefined || v === null || String(v).trim() === "";

(async () => {
  for (const { code, name } of files) {
    const excelPath = path.join(__dirname, "..", "..", "data", name);
    if (!fs.existsSync(excelPath)) {
      console.warn(`⚠️  File not found: ${name}`);
      continue;
    }

    const wb = XLSX.readFile(excelPath);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    console.log(`📥  [${code}] ${rows.length} rows parsed – importing…`);

    const batch: any[] = [];

    for (const r of rows as Record<string, any>[]) {
      const year   = toInt(r["Year"]);
      const lgaKey = toInt(r["LGA_KEY"]); // optional
      const lgaDesc =
        r["LGA_DESC"] ??
        r["Population group"] ??
        r["LGA or Population group"] ??
        r["DHS AREA"] ??
        "";

      const indicator =
        toFloat(r["Indicator"]) ??
        toFloat(r["Indicator calculation"]);

      const numerator = toInt(r["Numerator"]);
      const denominator = toInt(r["Denominator"]);

      if (year === null || !lgaDesc || indicator === null) continue;

      batch.push({
        year,
        lgaKey: isNaN(lgaKey ?? NaN) ? null : lgaKey,
        lgaDesc: String(lgaDesc).trim(),
        numerator,
        denominator,
        indicator,
        indicatorCode: code,
        isNdp: false
      });
    }

    if (batch.length) {
      await prisma.record.createMany({
        data: batch,
        skipDuplicates: true
      });
      console.log(`✅  [${code}] ${batch.length} rows inserted.`);
    } else {
      console.log(`⚠️  [${code}] No valid rows found; skipped.`);
    }
  }

  console.log("🎉  All files processed.");
  await prisma.$disconnect();
})();
