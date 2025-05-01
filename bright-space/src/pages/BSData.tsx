import * as React from "react";
import { Input } from "@fluentui/react-components";
import {
  makeStyles,
  tokens,
  Combobox,
  Option,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const useStyles = makeStyles({
  container: {
    padding: "1.5rem 1rem 3rem",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 900,
    textAlign: "center",
    color: tokens.colorNeutralForeground1,
  },
  description: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground2,
    maxWidth: "720px",
    textAlign: "center",
    lineHeight: 1.7,
  },
  controls: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chartWrapper: {
    width: "100%",
    maxWidth: "1800px",
    height: "520px",
    background: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    padding: "1.25rem",
    boxShadow: tokens.shadow16,
  },
  hint: {
    fontSize: "0.875rem",
    color: tokens.colorNeutralForeground3,
    marginTop: "0.5rem",
  },
});

type ResultRow = { year: number; group: string; value: number | null };
const BSData: React.FC = () => {
  const s = useStyles();
  const [hasSearched, setHasSearched] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState<ResultRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setHasSearched(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/3_2a/search?query=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ResultRow[] = await res.json();
  
      const qLower = q.toLowerCase();
      const isYear = /^\d{4}$/.test(qLower);
  
      let result: ResultRow[] = [];
  
      if (isYear) {
        result = data.filter((r) => r.year.toString() === q);
      } else {
        result = data.filter((r) => r.group.toLowerCase() === qLower);
      }
  
      setRows(result);
      if (result.length === 0) setError("No data found for this query.");
    } catch (e: any) {
      setError("Failed to fetch data.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const xKey =
    rows.length > 0 && new Set(rows.map((r) => r.year)).size === 1
      ? "group"
      : "year";

  return (
    <div className={s.container}>
      <motion.h1
        className={s.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Bullying Data
      </motion.h1>

        {/* ---------- Search Instruction (Always Show) ---------- */}
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.8",
            color: tokens.colorNeutralForeground2,
            textAlign: "center",
            maxWidth: "600px",
            marginBottom: "0.5rem",
          }}
        >
          <strong>Try searching by Region, Population Group, or Year:</strong><br />
          <strong>Supported Population: </strong>Victoria, Victoria - Male, Victoria - Female, Victoria - Other Gender, Victoria - Aboriginal, Victoria - Non Aboriginal<br />
          <strong>Supported regions: </strong>Monash (C),  Whitehorse (C), etc.<br />
          <strong>Supported years: </strong>2017 – 2023<br />
          
        </p>

      {/* ---------- Controls ---------- */}
      <div className={s.controls}>
        <Input
          placeholder="Type: 2023, Victoria, Monash (C)..."
          value={query}
          onChange={(_, data) => setQuery(data.value)}
          onKeyDown={onKeyDown}
          style={{ minWidth: "300px", maxWidth: "800px" }}
        />
        <Button appearance="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* ---------- Chart ---------- */}
      {hasSearched && (
      <div className={s.chartWrapper}>
        {loading ? (
          <Spinner size="medium" label="Loading..." />
        ) : error ? (
          <p className={s.hint}>{error}</p>
        ) : rows.length === 0 ? (
          <p className={s.hint}>No data found for this query.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={rows.map((r) => ({
                x: xKey === "group" ? r.group : r.year.toString(),
                value: r.value,
              }))}
              margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                tick={{ fontSize: 10 }}
                angle={-40}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar
                dataKey="value"
                name="% children bullied"
                fill="#6a5acd"
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    )}
    </div>
  );
};

export default BSData;
