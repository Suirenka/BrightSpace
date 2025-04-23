/**
 * Express 服务器 + API
 * 启动方式：node index.js
 * 依赖：express、cors、@prisma/client
 */

const express = require('express');
const cors    = require('cors');
const { PrismaClient } = require('@prisma/client');

const app     = express();
const prisma  = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ---------- API：按年份获取数据 ---------- */
app.get('/api/chart-data', async (req, res) => {
  const year = parseInt(req.query.year);

  if (!year) {
    return res.status(400).json({ error: 'Missing query parameter: year' });
  }

  try {
    const data = await prisma.record.findMany({
      where: { year },
      orderBy: { lgaKey: 'asc' },
    });
    res.json(data);
  } catch (err) {
    console.error('❌ 获取数据失败:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* ---------- 启动服务器 ---------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
