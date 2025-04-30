"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const files = [
    { code: "3_1", name: "VCAMS_indicator_3_1.xlsx" },
    { code: "3_2a", name: "VCAMS_indicator_3_2a.xlsx" },
    { code: "3_2c", name: "VCAMS_indicator_3_2c.xlsx" },
    { code: "3_3", name: "VCAMS_indicator_3_3.xlsx" },
    { code: "3_4", name: "VCAMS_indicator_3_4.xlsx" },
    { code: "3_7_0", name: "VCAMS_indicator_3_7_0.xlsx" }
];
const toInt = (v) => v !== undefined && v !== null && v !== ""
    ? parseInt(String(v).replace(/,/g, "").trim(), 10)
    : null;
const toFloat = (v) => v !== undefined && v !== null && v !== ""
    ? parseFloat(String(v).replace(/[, %]/g, "").trim())
    : null;
const isEmpty = (v) => v === undefined || v === null || String(v).trim() === "";
(async () => {
    for (const { code, name } of files) {
        const excelPath = path_1.default.join(__dirname, "..", "..", "data", name);
        if (!fs_1.default.existsSync(excelPath)) {
            console.warn(`⚠️  File not found: ${name}`);
            continue;
        }
        const wb = xlsx_1.default.readFile(excelPath);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx_1.default.utils.sheet_to_json(sheet, { defval: "" });
        console.log(`📥  [${code}] ${rows.length} rows parsed – importing…`);
        const batch = [];
        for (const r of rows) {
            const year = toInt(r["Year"]);
            const lgaKey = toInt(r["LGA_KEY"]); // optional
            const lgaDesc = r["LGA_DESC"] ??
                r["Population group"] ??
                r["LGA or Population group"] ??
                r["DHS AREA"] ??
                "";
            const indicator = toFloat(r["Indicator"]) ??
                toFloat(r["Indicator calculation"]);
            const numerator = toInt(r["Numerator"]);
            const denominator = toInt(r["Denominator"]);
            if (year === null || !lgaDesc || indicator === null)
                continue;
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
        }
        else {
            console.log(`⚠️  [${code}] No valid rows found; skipped.`);
        }
    }
    console.log("🎉  All files processed.");
    await prisma.$disconnect();
})();
