import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/** 后端根路径（根据实际端口调整） */
const API = 'http://localhost:4000';

/** 指标代码枚举 */
export type IndicatorCode = '3_1' | '3_2a' | '3_2c' | '3_3' | '3_4';

/** 图表下拉选项 */
const indicators: { code: IndicatorCode; label: string }[] = [
  { code: '3_1',  label: '3.1 Emotional / Behavioural difficulties' },
  { code: '3_2a', label: '3.2a Children bullied' },
  { code: '3_2c', label: '3.2c Youth bullied (most days)' },
  { code: '3_3',  label: '3.3 Cyber-bullying' },
  { code: '3_4',  label: '3.4 High psychological distress' },
];

/** 后端 `/api/chart-data` 返回的单条数据结构 */
interface ChartRow {
  lga: string;
  value: number;   // 已转为百分比
}

export default function VcamsChart() {
  /* ------------------------ state ------------------------ */
  const [years, setYears]         = useState<number[]>([]);
  const [year, setYear]           = useState<number | null>(null);
  const [indicator, setIndicator] = useState<IndicatorCode>('3_1');
  const [data, setData]           = useState<ChartRow[]>([]);
  const [loading, setLoading]     = useState<boolean>(false);
  const [error, setError]         = useState<string | null>(null);

  /* ---------- fetch year list once ---------- */
  useEffect(() => {
    fetch(`${API}/api/years`)
      .then((r) => r.json())
      .then((list: number[]) => {
        setYears(list);
        setYear(list.at(-1) ?? null); // 默认选最后一年
      })
      .catch((e) => setError(e.message));
  }, []);

  /* ---------- fetch chart data whenever year / indicator changes ---------- */
  useEffect(() => {
    if (!year) return;

    setLoading(true);
    fetch(`${API}/api/chart-data?year=${year}&indicator=${indicator}`)
      .then((r) => r.json())
      .then((rows: ChartRow[]) => setData(rows))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [year, indicator]);

  /* ------------------------ UI ------------------------ */
  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {/* --- 控件区 --- */}
      <div className="flex gap-4 items-center">
        {/* Year selector */}
        <select
          className="border rounded p-1"
          value={year ?? ''}
          onChange={(e) => setYear(+e.target.value)}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Indicator selector */}
        <select
          className="border rounded p-1"
          value={indicator}
          onChange={(e) => setIndicator(e.target.value as IndicatorCode)}
        >
          {indicators.map((i) => (
            <option key={i.code} value={i.code}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      {/* --- 图表区 --- */}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={data}>
            <XAxis dataKey="lga" hide /> {/* LGA 太多，隐藏文字 */}
            <YAxis tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Bar dataKey="value" name="% of population" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
