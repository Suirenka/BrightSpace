import * as React from "react";
import { Combobox, Option, Spinner, Button, makeStyles, tokens } from "@fluentui/react-components";
import CombinedChart from "../components/CyberBullyingBarChart";
import DataBanner from "../assets/images/home/Databanner.jpg";
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
    padding: "0 1rem 3rem",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",
  },
  section: {
    width: "100%",
    maxWidth: "1800px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "2rem",
  },
  textBlock: {
    flex: "1 1 320px",
    minWidth: "280px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    padding: "1.25rem 1.5rem",
    boxShadow: tokens.shadow16,
    fontSize: "0.95rem",
    lineHeight: 1.7,
    color: tokens.colorNeutralForeground2,
  },
  sectionHeading: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "0.75rem",
    color: tokens.colorNeutralForeground1,
  },
  chartWrapper: {
    flex: "2 1 600px",
    minWidth: "360px",
    height: "480px",
    background: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: tokens.shadow16,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginTop: "0.75rem",
    flexWrap: "wrap",
  },
  hint: {
    fontSize: "0.875rem",
    color: tokens.colorNeutralForeground3,
    marginTop: "0.5rem",
  },
});

type ResultRow = { year: number; group: string; value: number | null };

type ChartSectionProps = {
  title: string;
  description: React.ReactNode;
  dropdownLabel: string;
  options: string[];
  queryKey: "group" | "year" | "region";
  reverse?: boolean;
};

const ChartSection: React.FC<ChartSectionProps> = ({
  title,
  description,
  dropdownLabel,
  options,
  queryKey,
  reverse = false,
}) => {
  const s = useStyles();
  const [selected, setSelected] = React.useState<string>("");
  const [rows, setRows] = React.useState<ResultRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async (q: string) => {
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/3_2a/search?query=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ResultRow[] = await res.json();

      let filtered: ResultRow[] = [];
      if (queryKey === "year") {
        filtered = data.filter((r) => r.year.toString() === q);
      } else if (queryKey === "group") {
        filtered = data.filter((r) => r.group.toLowerCase() === q.toLowerCase());
      } else {
        // region – match substring for safety
        filtered = data.filter((r) => r.group.toLowerCase().includes(q.toLowerCase()));
      }
      setRows(filtered);
      if (filtered.length === 0) setError("No data found for this selection.");
    } catch (e) {
      setError("Failed to fetch data.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (selected) fetchData(selected);
  }, [selected]);

  const layoutStyle: React.CSSProperties = reverse
    ? { flexDirection: "row-reverse" }
    : { flexDirection: "row" };

  // Determine x-axis key
  const xKey = queryKey === "year" ? "group" : "year";

  return (
    <section className={s.section} style={layoutStyle}>
      <div className={s.textBlock}>
        <h3 className={s.sectionHeading}>{title}</h3>
        {description}
        <div className={s.controls}>
          <Combobox
            placeholder={dropdownLabel}
            value={selected}
            onOptionSelect={(_, d) => setSelected(d.optionValue ?? "")}
          >
            {options.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Combobox>
        </div>
        {error && <p className={s.hint}>{error}</p>}
      </div>

      <div className={s.chartWrapper}>
        {loading ? (
          <Spinner label="Loading..." />
        ) : rows.length === 0 ? (
          <p className={s.hint}>Select an option to view data.</p>
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
              <Bar dataKey="value" name="% children bullied" fill="#6a5acd" maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

const BSDataUpdated: React.FC = () => {
  const s = useStyles();

  const populationOptions = [
    "Victoria",
    "Victoria - Male",
    "Victoria - Female",
    "Victoria - Other Gender",
    "Victoria - Aboriginal",
    "Victoria - Non Aboriginal",
  ];

  const yearOptions = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

  const regionOptions = [
    "Monash (C)",
    "Whitehorse (C)",
    // Add more regions here as data becomes available
  ];

  return (
    <div className={s.container}>
      <div
        style={{
          width: "100%",
          height: "550px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${DataBanner})`,

          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          color: "white",
          textShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontSize: "2.5rem", fontWeight: 900 }}
        >
          Understand the Landscape of School Bullying
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{
            marginTop: "1rem",
            fontSize: "1.25rem",
            maxWidth: "720px",
            lineHeight: 1.6,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            textAlign: "center",
            color: "white",
          }}
        >
          Discover how bullying evolves across groups, years, and regions — and where interventions matter most.
        </motion.p>
      </div>


      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "1.75rem",
          fontWeight: 800,
          textAlign: "center",
          color: tokens.colorBrandForeground1,
          marginTop: "2rem",
          marginBottom: "0.1rem",
        }}
      >
        Every Number Tells a Story — You're Not Alone💜
      </motion.h2>

      {/* Outer wrapper: horizontally center */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Inner content: layout left + right */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Left: Static Chart */}
          <div
            style={{
              width: "600px",
              flex: "0 0 auto",
              minWidth: "360px",
              margin: "0 auto",
              backgroundColor: tokens.colorNeutralBackground1,
              borderRadius: "16px",
              padding: "1rem",
              boxShadow: tokens.shadow16,
              // display: "inline-block",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CombinedChart />
          </div>

          {/* Right: Summary Cards */}
          <div
            style={{
              flex: "1 1 350px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {/* Green Insight Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundColor: tokens.colorPaletteGreenBackground1,
                borderLeft: `6px solid ${tokens.colorPaletteGreenBorderActive}`,
                padding: "1rem",
                borderRadius: "8px",
                maxWidth: "440px",
                width: "100%",
                boxShadow: tokens.shadow8,
              }}
            >
              <h3
                style={{
                  color: tokens.colorPaletteGreenForeground1,
                  marginBottom: "0.5rem",
                }}
              >
                Key Insight
              </h3>
              <p
                style={{
                  color: tokens.colorPaletteGreenForeground2,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                Bullying cases in regional areas have shown a noticeable rise since 2020,
                especially among secondary students.
              </p>
            </motion.div>

            {/* Blue Data Reveal Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                backgroundColor: tokens.colorBrandBackground2,
                borderLeft: `6px solid ${tokens.colorBrandStroke1}`,
                padding: "1rem",
                borderRadius: "8px",
                maxWidth: "440px",
                width: "100%",
                boxShadow: tokens.shadow8,
              }}
            >
              <h3
                style={{
                  color: tokens.colorBrandForeground1,
                  marginBottom: "0.5rem",
                }}
              >
                Why It Matters
              </h3>
              <p
                style={{
                  color: tokens.colorNeutralForeground2,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                Grouped visualisation helps us reveal gaps and patterns inform better interventions and student wellbeing support strategies.
              </p>
            </motion.div>

            {/* Orange Emotional Impact Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundColor: tokens.colorNeutralBackground1,
                borderLeft: `6px solid ${tokens.colorPaletteDarkOrangeBorderActive ?? "#ea580c"}`,
                padding: "1rem",
                borderRadius: "8px",
                maxWidth: "440px",
                width: "100%",
                boxShadow: tokens.shadow8,
              }}
            >
              <h3
                style={{
                  color: tokens.colorPaletteDarkOrangeForeground1 ?? "#ea580c",
                  marginBottom: "0.5rem",
                }}
              >
                Emotional Wellbeing in the Digital Age
              </h3>
              <p
                style={{
                  color: tokens.colorNeutralForeground2,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                You're not alone — explore real data, see shared struggles, and find the support you deserve in a safe, understanding space.
              </p>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Section 1 – Population Group */}
      <ChartSection
        title="Bullying by Population Group"
        description={
          <p>
            Compare Victoria-wide data and specific population groups. Select a group from the dropdown to
            visualise the percentage of students experiencing bullying in the chosen cohort.
          </p>
        }
        dropdownLabel="Select a population group"
        options={populationOptions}
        queryKey="group"
        reverse={true}
      />

      {/* Section 2 – Year */}
      <ChartSection
        title="Bullying Trend by Year"
        description={
          <p>
            Examine how bullying rates have changed over time. Choose a year between 2017 and 2023 to see the
            distribution across different groups for that specific year.
          </p>
        }
        dropdownLabel="Select a year"
        options={yearOptions}
        queryKey="year"
        reverse={false}
      />

      {/* Section 3 – Region */}
      <ChartSection
        title="Bullying by Region"
        description={
          <p>
            Explore localised data by selecting a Local Government Area (LGA). This helps identify hotspots and areas
            where targeted interventions might be needed.
          </p>
        }
        dropdownLabel="Select a region"
        options={regionOptions}
        queryKey="region"
        reverse={true}
      />
    </div>
  );
};

export default BSDataUpdated;
