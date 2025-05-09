import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Combobox, Option, Spinner, Button, makeStyles, tokens } from "@fluentui/react-components";
import CombinedChart from "../components/CyberBullyingBarChart";
import DataBanner from "../assets/images/home/Databanner.jpg";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BackToTopButton from "../components/BackToTopButton";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Legend,
} from "recharts";

const useStyles = makeStyles({
  container: {
    padding: "0",
    backgroundColor: tokens.colorNeutralBackground3,
    margin: "0 auto",
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
    color: tokens.colorBrandForeground1,
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
  const defaultValue =
  queryKey === "group"
    ? "Victoria"
    : queryKey === "year"
    ? "2023"
    : queryKey === "region"
    ? "Monash (C)"
    : "";
  const [selected, setSelected] = React.useState<string>(defaultValue);
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
  
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "480px",
          flex: "1 1 320px",
          minWidth: "280px",
          gap: "2rem",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={s.textBlock}
          style={{
            borderLeft: `6px solid ${tokens.colorBrandStroke1}`,
            backgroundColor: tokens.colorNeutralBackground1,
          }}
        >
          <h3 style={{ color: tokens.colorBrandForeground1, marginBottom: "0.5rem" }}>
            🎯 {title}
          </h3>
          {description}
          <div className={s.controls}>
            <Combobox
              placeholder="Select a population group"
              value={selected}
              onOptionSelect={(_, d) => setSelected(d.optionValue ?? "")}
              style={{
                borderRadius: "8px",
                border: "1px solid black",
                backgroundColor: tokens.colorNeutralBackground2,
                color: tokens.colorNeutralForeground1,
                minWidth: "240px",
                boxShadow: tokens.shadow8,
              }}
            >
              {options.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Combobox>
          </div>
          {error && <p className={s.hint}>{error}</p>}
        </motion.div>


        {queryKey === "group" && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={s.textBlock}
          style={{
            borderLeft: `6px solid ${tokens.colorPaletteSeafoamBorderActive}`,
            backgroundColor: tokens.colorNeutralBackground1,
          }}
        >
          <h3
            style={{
              color: tokens.colorPaletteSeafoamForeground2,
              marginBottom: "0.5rem",
            }}
          >
            🧬 Differences Between Groups
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: tokens.colorNeutralForeground2,
            }}
          >
            Different groups face different risks — comparing cohorts reveals how identity and background affect experiences.
          </p>
        </motion.div>
      )}

      {queryKey === "year" && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={s.textBlock}
          style={{
            borderLeft: `6px solid ${tokens.colorPaletteCranberryBorderActive}`,
            backgroundColor: tokens.colorNeutralBackground1,
          }}
        >
          <h3
            style={{
              color: tokens.colorPaletteCranberryForeground2,
              marginBottom: "0.5rem",
            }}
          >
            📅 What Trends Over Time Reveal
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: tokens.colorNeutralForeground2,
            }}
          >
            Year-by-year comparison shows how interventions, awareness, and policies impact bullying rates — data tells us what’s working and where more focus is needed.
          </p>
        </motion.div>
      )}

      {queryKey === "region" && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={s.textBlock}
          style={{
            borderLeft: `6px solid ${tokens.colorPaletteRoyalBlueBorderActive}`,
            backgroundColor: tokens.colorNeutralBackground1,
          }}
        >
          <h3
            style={{
              color: tokens.colorPaletteCornflowerForeground2,
              marginBottom: "0.5rem",
            }}
          >
            🌍 Why Region Matters
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: tokens.colorNeutralForeground2,
            }}
          >
            Regional differences highlight environmental, cultural, and social factors impacting bullying — helping us identify local needs and develop place-based support.
          </p>
        </motion.div>
      )}
      </div>
    </section>
  );
};

const BSData: React.FC = () => {
  const s = useStyles();
  const navigate = useNavigate();

  const getLineColorForKey = (key: string): string => {
    if (key === "Victoria - Non Aboriginal") return tokens.colorStatusDangerBackground3;
    if (key === "Victoria - Aboriginal") return tokens.colorStatusWarningBorderActive;
    if (key.includes("Female")) return tokens.colorStatusDangerBackground3;
    if (key.includes("Male")) return tokens.colorStatusWarningBorderActive;
    if (key.includes("Other")) return tokens.colorStatusSuccessForeground3;
    return tokens.colorBrandForeground1;
  };
  

  const dimensions = {

    
    Gender: ["Victoria - Male", "Victoria - Female", "Victoria - Other Gender"],
    "Aboriginal Status": ["Victoria - Aboriginal", "Victoria - Non Aboriginal"],
  };
  
  const [dimensionKey, setDimensionKey] = React.useState<"Gender" | "Aboriginal Status">("Gender");
  const [chartData, setChartData] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/3_2a/search?query=Victoria");
      const rawData: ResultRow[] = await res.json();
  
      const grouped: { [year: string]: any } = {};
      rawData.forEach(({ year, group, value }) => {
        if (!grouped[year]) grouped[year] = { year: year.toString() };
        grouped[year][group] = value;
      });
  
      const reshaped = Object.values(grouped);
      setChartData(reshaped);
    };
  
    fetchData();
  }, []);

  const yearOptions = ["2017", "2018", "2019", "2021", "2022", "2023"];

  const regionOptions = [
    "Alpine (S)", "Ararat (RC)", "Ballarat (C)", "Banyule (C)", "Bass Coast (S)", "Baw Baw (S)",
    "Bayside (C)", "Benalla (RC)", "Boroondara (C)", "Brimbank (C)", "Buloke (S)", "Campaspe (S)",
    "Cardinia (S)", "Casey (C)", "Central Goldfields (S)", "Colac-Otway (S)", "Corangamite (S)",
    "Darebin (C)", "East Gippsland (S)", "Frankston (C)", "Gannawarra (S)", "Glen Eira (C)",
    "Glenelg (S)", "Golden Plains (S)", "Greater Bendigo (C)", "Greater Dandenong (C)",
    "Greater Geelong (C)", "Greater Shepparton (C)", "Hepburn (S)", "Hindmarsh (S)",
    "Hobsons Bay (C)", "Horsham (RC)", "Hume (C)", "Indigo (S)", "Kingston (C)", "Knox (C)",
    "Latrobe (C)", "Loddon (S)", "Macedon Ranges (S)", "Manningham (C)", "Mansfield (S)",
    "Maribyrnong (C)", "Maroondah (C)", "Melbourne (C)", "Melton (C)", "Merri-bek (C)",
    "Mildura (RC)", "Mitchell (S)", "Moira (S)", "Monash (C)", "Moonee Valley (C)",
    "Moorabool (S)", "Mornington Peninsula (S)", "Mount Alexander (S)", "Moyne (S)",
    "Murrindindi (S)", "Nillumbik (S)", "Northern Grampians (S)", "Port Phillip (C)",
    "Pyrenees (S)", "South Gippsland (S)", "Southern Grampians (S)", "Stonnington (C)",
    "Strathbogie (S)", "Surf Coast (S)", "Swan Hill (RC)", "Towong (S)", "Wangaratta (RC)",
    "Warrnambool (C)", "Wellington (S)", "West Wimmera (S)", "Whitehorse (C)", "Whittlesea (C)",
    "Wodonga (C)", "Wyndham (C)", "Yarra (C)", "Yarra Ranges (S)", "Yarriambiack (S)"
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
                Key Insight (What can be seen?)
              </h3>
              <p
                style={{
                  color: tokens.colorPaletteGreenForeground2,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                Victoria state data revealed that students who experienced higher levels of cyberbullying 
                reported lower levels of emotional wellbeing and confidence.
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
                  color: tokens.colorBrandForeground2,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                This trend underscores a pressing need for effective support systems 
                to help young people navigate online challenges.
              </p>
            </motion.div>

            {/* Orange Emotional Impact Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
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
                  color: tokens.colorPaletteDarkOrangeBackground3,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                You're not alone. Explore real data, see shared experiences, and find support in a safe, understanding space. 
                BrightSpace helps you build resilience, emotional intelligence, and confidence through interactive, real-life scenarios.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 1 – Population Group */}
      <div
        style={{
          backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
          padding: "2rem 3rem",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            textAlign: "center",
            color: tokens.colorBrandForeground1,
            marginBottom: "4rem",
          }}
        >
          📊 Who Is Most at Risk? Explore Bullying by Group.
        </motion.h2>
        <section className={s.section}>
          <div className={s.chartWrapper}>
            <ResponsiveContainer width="100%" height="90%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  formatter={(value: number, name: string) => [`${value?.toFixed(2)}%`, name]}
                  labelFormatter={(label: string) => `${label} — Proportion of bullied children`}
                />
                <Legend />
                <Bar
                  dataKey="Victoria"
                  barSize={28}
                  fill={tokens.colorBrandForeground1 }
                  name="Victoria"
                />
                {dimensions[dimensionKey].map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={key}
                    stroke={getLineColorForKey(key)}
                    dot={{ r: 3 }}
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "480px",
              flex: "1 1 320px",
              minWidth: "280px",
              gap: "2rem",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={s.textBlock}
              style={{
                borderLeft: `6px solid ${tokens.colorBrandStroke1}`,
                backgroundColor: tokens.colorNeutralBackground1,
              }}
            >
              <h3 style={{ color: tokens.colorBrandForeground1, marginBottom: "0.5rem" }}>
                🎯 Bullying by Population Group
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Compare Victoria-wide data and specific population groups. Use the filter below to explore bullying across cohorts.
              </p>

                <div className={s.controls}>
                <Combobox
                  placeholder="Select a dimension"
                  value={dimensionKey}
                  onOptionSelect={(_, data) => setDimensionKey(data.optionValue as any)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid black",
                    backgroundColor: tokens.colorNeutralBackground2,
                    color: tokens.colorNeutralForeground1,
                    minWidth: "240px",
                    boxShadow: tokens.shadow8,
                  }}
                >
                  {Object.keys(dimensions).map((dim) => (
                    <Option key={dim} value={dim}>
                      {dim}
                    </Option>
                  ))}
                </Combobox>
              </div>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={s.textBlock}
              style={{
                borderLeft: `6px solid ${tokens.colorPaletteSeafoamBorderActive}`,
                backgroundColor: tokens.colorNeutralBackground1,
              }}
            >
              <h3
                style={{
                  color: tokens.colorPaletteSeafoamForeground2,
                  marginBottom: "0.5rem",
                }}
              >
                🧬 Differences Between Groups
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: tokens.colorNeutralForeground2,
                }}
              >
                Different groups face different risks — comparing cohorts reveals how identity and background affect experiences.
              </p>
            </motion.div>
          </div>
        </section>
        </div> 
      </div>

      {/* Section 2 – Year */}
      <div
        style={{
          backgroundColor: tokens.colorNeutralBackground3,
          padding: "2.5rem 1.5rem",
          borderRadius: "0",
          marginTop: "1rem",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            textAlign: "center",
            color: tokens.colorBrandForeground1,
            marginTop: "1rem",
            marginBottom: "3rem",
          }}
        >
          🗺️ Where Does It Happen? Discover Region Bullying by Year.
        </motion.h2>

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
          reverse={true}
        />
      </div>

       {/* Section 3 – Region  */}
      <div
        style={{
          backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
          padding: "3rem 1.5rem",
          marginTop: "1rem",
          display: "flex",
          width: "100vw",
          position: "relative",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              textAlign: "center",
              color: tokens.colorBrandForeground1,
              marginBottom: "4rem",
            }}
          >
            🌍 Place Matters — See Bullying Trends Across Regions.
          </motion.h2>

          <ChartSection
            title="Bullying by Region"
            description={
              <p>
                Explore localised data by selecting a Local Government Area (LGA). This helps
                identify hotspots and areas where targeted interventions might be needed.
              </p>
            }
            dropdownLabel="Select a region"
            options={regionOptions}
            queryKey="region"
          />
        </div>
      </div>
      
      {/* 👇 Explore More Section */}
      <div
        style={{
          padding: "4rem 1rem",
          backgroundColor: tokens.colorNeutralBackground3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          marginTop: "1rem",
          minHeight: "350px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            textAlign: "center",
            marginTop: "0.1rem",
            color: tokens.colorBrandForeground1,
          }}
        >
          ✨ Explore More Tools to Help You Take Action
        </motion.h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* 1. Resources */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              flex: "1 1 280px",
              backgroundColor: tokens.colorNeutralBackground1,
              borderLeft: `6px solid ${tokens.colorBrandStroke1}`,
              padding: "1.5rem",
              borderRadius: "16px",
              boxShadow: tokens.shadow16,
              cursor: "pointer",
            }}
            onClick={() => navigate("/bs-resource")}
          >
            <h3 style={{ color: tokens.colorBrandForeground1, marginBottom: "0.5rem" }}>
              🔍 Resource Library
            </h3>
            <p style={{ color: tokens.colorNeutralForeground2, fontSize: "0.95rem", lineHeight: 1.6 }}>
              Browse tips, guides and scenarios to better understand how to recognise and respond to online bullying.
            </p>
          </motion.div>

          {/* 2. Tone Checker */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              flex: "1 1 280px",
              backgroundColor: tokens.colorNeutralBackground1,
              borderLeft: `6px solid ${tokens.colorPaletteSeafoamBorderActive}`,
              padding: "1.5rem",
              borderRadius: "16px",
              boxShadow: tokens.shadow16,
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/bs-posting-coach")}
          >
            <h3 style={{ color: tokens.colorPaletteSeafoamForeground2, marginBottom: "0.5rem" }}>
              🗣️ Check Your Tone
            </h3>
            <p style={{ color: tokens.colorNeutralForeground2, fontSize: "0.95rem", lineHeight: 1.6 }}>
              Get feedback on your message tone — ensure you're communicating positively online.
            </p>
          </motion.div>

          {/* 3. Report Page */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              flex: "1 1 280px",
              backgroundColor: tokens.colorNeutralBackground1,
              borderLeft: `6px solid ${tokens.colorPaletteCranberryBorderActive}`,
              padding: "1.5rem",
              borderRadius: "16px",
              boxShadow: tokens.shadow16,
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/report")}
          >
            <h3 style={{ color: tokens.colorPaletteCranberryForeground2, marginBottom: "0.5rem" }}>
              📋 Report a Case
            </h3>
            <p style={{ color: tokens.colorNeutralForeground2, fontSize: "0.95rem", lineHeight: 1.6 }}>
              Know something serious? Let’s make it count. Submit a report and help make digital spaces safer.
            </p>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          marginTop: "1rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <BSNavLink text="Go Back to Home" route="/" back />
        <BackToTopButton />
      </div>
    </div>
    
  );
};

export default BSData;
