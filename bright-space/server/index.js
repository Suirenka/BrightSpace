/**
 * Express server + API
 * Run with: node index.js
 * Dependencies: express, cors, @prisma/client
 */

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ---------- GET /api/years ---------- *
 * Returns an array like: [2010, 2011, 2012, …]
 */
app.get('/api/years', async (_, res) => {
  try {
    const years = await prisma.record.groupBy({
      by: ['year'],
      _count: true,
      orderBy: { year: 'asc' }
    });
    res.json(years.map(y => y.year));
  } catch (err) {
    console.error('Failed to fetch years:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* ---------- GET /api/chart-data ---------- *
 * Required query:  year=YYYY
 * Optional query:  indicator=3_1 (defaults to 3_1)
 * Returns: [{ lga: 'Melbourne (C)', value: 4.92 }, …]
 */
app.get('/api/chart-data', async (req, res) => {
  const year = parseInt(req.query.year);
  const indicator = req.query.indicator ?? '3_1';

  if (!year) {
    return res.status(400).json({ error: 'Query parameter "year" is required' });
  }

  try {
    const rows = await prisma.record.findMany({
      where: { year, indicatorCode: indicator },
      orderBy: { lgaKey: 'asc' },
    });

    const data = rows.map(r => ({
      lga: r.lgaDesc,
      value: r.indicator != null ? +(r.indicator * 100).toFixed(2) : null
    }));

    res.json(data);
  } catch (err) {
    console.error('Failed to fetch chart data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* ---------- start server ---------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});
