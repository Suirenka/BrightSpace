import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles, tokens, Select, Option, Button } from "@fluentui/react-components";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    padding: "4rem 2rem",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
  },
  description: {
    fontSize: "1.125rem",
    color: tokens.colorNeutralForeground2,
    maxWidth: "700px",
    textAlign: "center",
    lineHeight: "1.8",
  },
  controls: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chartWrapper: {
    width: "100%",
    maxWidth: "1000px",
    height: "500px",
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: tokens.shadow8,
  },
});

const BSData = () => {
  const styles = useStyles();
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [indicator, setIndicator] = useState("3_3");
  const [data, setData] = useState([]);

  const indicators = [
    { code: "3_1", label: "Emotional / Behavioural difficulties" },
    { code: "3_2a", label: "Children bullied" },
    { code: "3_2c", label: "Youth bullied (most days)" },
    { code: "3_3", label: "Cyber-bullying" },
    { code: "3_4", label: "High psychological distress" },
    { code: "3_7_0", label: "Emotional wellbeing (high)" },
  ];

  useEffect(() => {
    fetch("/api/years")
      .then((res) => res.json())
      .then((yrs) => {
        setYears(yrs);
        setYear(yrs.at(-1));
      });
  }, []);

  useEffect(() => {
    if (!year) return;
    fetch(`/api/chart-data?year=${year}&indicator=${indicator}`)
      .then((res) => res.json())
      .then((rows) => setData(rows));
  }, [year, indicator]);

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Real-World Bullying Data
      </motion.h1>

      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Explore visualized insights on how teens experience bullying in real-world contexts.
      </motion.p>

      <div className={styles.controls}>
        <Select value={year?.toString() ?? ""} onChange={(e, data) => setYear(+data.value)}>
        {years
          .filter((y): y is number => y !== null) // 先过滤掉 null
          .map((y) => (
            <Option key={y} value={y.toString()} text={y.toString()} />
        ))}
        </Select>

        {indicators.map((ind) => (
          <Button key={ind.code} appearance={indicator === ind.code ? "primary" : "outline"} onClick={() => setIndicator(ind.code)}>
            {ind.label}
          </Button>
        ))}
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lga" hide />
            <YAxis tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Bar dataKey="value" fill="#4a89dc" name="% of population" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BSData;
