const fs = require('fs');
const csv = require('csv-parser');
const prisma = require('../prisma/client');  // 引入 prisma 客户端

const results = [];

fs.createReadStream('server/data/VCAMS_indicator_3_1.csv')
  .pipe(csv())
  .on('data', (data) => {
    // 清理数据，去除数字中的逗号
    if (data.Numerator && data.Numerator !== 'NDP') {
      data.Numerator = data.Numerator.replace(/,/g, '');
    }
    if (data.Denominator && data.Denominator !== 'NDP') {
      data.Denominator = data.Denominator.replace(/,/g, '');
    }
    if (data.Indicator && data.Indicator !== 'NDP') {
      data.Indicator = data.Indicator.replace(/,/g, '');
    }
    results.push(data);
  })
  .on('end', async () => {
    console.log(results);

    for (const row of results) {
      try {
        // 将数据插入到正确的表（比如 "Record" 表）
        await prisma.record.create({
          data: {
            year: parseInt(row.Year), // 确保year是有效数字
            lgaKey: parseInt(row.LGA_KEY),
            lgaDesc: row.LGA_DESC,
            numerator: row.Numerator && row.Numerator !== 'NDP' ? parseInt(row.Numerator) : null,
            denominator: row.Denominator && row.Denominator !== 'NDP' ? parseInt(row.Denominator) : null,
            indicator: row.Indicator && row.Indicator !== 'NDP' ? parseFloat(row.Indicator) : null,
          },
        });
      } catch (error) {
        console.error('Error inserting row:', error);
      }
    }

    console.log('CSV data has been successfully imported!');
  });
