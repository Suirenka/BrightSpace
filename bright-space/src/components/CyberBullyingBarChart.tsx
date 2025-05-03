import React, { useState, useEffect, CSSProperties } from "react";

const CombinedChart: React.FC = () => {
  const [hideLabels, setHideLabels] = useState<boolean>(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const fontFamily = "'Segoe UI', 'Inter', 'Helvetica Neue', 'Arial', sans-serif";

  const data = [
    {
      group: "Year 5",
      cyber: 25.0,
      positive: 72.4,
      colorCyber: "#5d4c7f",
      colorPositive: "#5d4c7f",
    },
    {
      group: "Year 8",
      cyber: 33.3,
      positive: 68.1,
      colorCyber: "#8cc152",
      colorPositive: "#8cc152",
    },
    {
      group: "Year 11",
      cyber: 34.8,
      positive: 65.5,
      colorCyber: "#4a89dc",
      colorPositive: "#4a89dc",
    },
  ];

  const barStyle = (width: number, color: string, isHovered: boolean): CSSProperties => ({
    width: `${width}%`,
    backgroundColor: color,
    height: isHovered ? "3.5rem" : "3rem",
    transition: "all 0.2s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transformOrigin: "center",
    boxShadow: isHovered ? "0 0 10px rgba(0, 0, 0, 0.25)" : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.875rem",
    fontFamily,
    borderRadius: "6px",
    zIndex: isHovered ? 2 : 1,
    position: "relative",
  });

  const arrowStyle = (direction: "up" | "down", color: string): CSSProperties => ({
    animation: "fadeIn 1s ease-in forwards",
    opacity: 0,
    animationDelay: "0.3s",
    color,
    fontSize: "1rem",
    transform: direction === "up" ? "rotate(0deg)" : "rotate(180deg)",
  });

  const yearItemStyle = (index: number): CSSProperties => ({
    width: "6rem",
    textAlign: "right",
    fontSize: "0.875rem",
    fontWeight: hoveredBar?.startsWith(index.toString()) ? "700" : "500",
    color: hoveredBar?.startsWith(index.toString()) ? "#1f2937" : "#000",
    transform: animateItems ? "translateX(0)" : "translateX(-50px)",
    opacity: animateItems ? 1 : 0,
    transition: `transform 0.5s ease-out ${index * 0.15}s, opacity 0.5s ease ${index * 0.15}s`,
  });

  const legendItemStyle = (index: number): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transform: animateItems ? "translateY(0)" : "translateY(20px)",
    opacity: animateItems ? 1 : 0,
    transition: `transform 0.5s ease-out ${0.5 + index * 0.1}s, opacity 0.5s ease ${0.5 + index * 0.1}s`,
  });

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "56 rem",
        margin: "0 auto",
        fontFamily,
      }}
    >
      {/* Column Headers */}
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <div style={{ width: "6rem" }}></div>
        <div style={{ flex: 1, display: "flex", gap: "1rem", paddingLeft: "1rem" }}>
          <div style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            color: "#dc2626",
            backgroundColor: "#fee2e2",
            height: "3.5rem",
            borderRadius: "6px",
            transform: animateItems ? "translateY(0)" : "translateY(-20px)",
            opacity: animateItems ? 1 : 0,
            transition: "transform 0.5s ease-out 0.2s, opacity 0.5s ease 0.2s",
          }}>
            Experience Cyberbullying
            <span style={arrowStyle("down", "#dc2626")}>⬇</span>
          </div>

          <div style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            color: "#16a34a",
            backgroundColor: "#bbf7d0",
            height: "3.5rem",
            borderRadius: "6px",
            transform: animateItems ? "translateY(0)" : "translateY(-20px)",
            opacity: animateItems ? 1 : 0,
            transition: "transform 0.5s ease-out 0.3s, opacity 0.5s ease 0.3s",
          }}>
            Positive Development
            <span style={arrowStyle("up", "#16a34a")}>⬆</span>
          </div>
        </div>
      </div>

      {/* Data Rows */}
      {data.map((item, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <div style={yearItemStyle(index)}>{item.group}</div>
          <div style={{ flex: 1, display: "flex", gap: "1rem", paddingLeft: "1rem" }}>
            <div style={{
              flex: 1,
              background: "#e5e7eb",
              borderRadius: "6px",
              height: "3.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              transform: animateItems ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transition: `transform 0.5s ease-out ${index * 0.15 + 0.2}s`,
            }}>
              <div
                style={barStyle(item.cyber, item.colorCyber, hoveredBar === `${index}-cyber`)}
                onMouseEnter={() => setHoveredBar(`${index}-cyber`)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {!hideLabels && `${item.cyber}%`}
              </div>
            </div>

            <div style={{
              flex: 1,
              background: "#e5e7eb",
              borderRadius: "6px",
              height: "3.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              transform: animateItems ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transition: `transform 0.5s ease-out ${index * 0.15 + 0.3}s`,
            }}>
              <div
                style={barStyle(item.positive, item.colorPositive, hoveredBar === `${index}-positive`)}
                onMouseEnter={() => setHoveredBar(`${index}-positive`)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {!hideLabels && `${item.positive}%`}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <div style={legendItemStyle(0)}>
          <div style={{ width: "1rem", height: "1rem", backgroundColor: "#5d4c7f", borderRadius: "4px" }}></div>
          <span>Year 5</span>
        </div>
        <div style={legendItemStyle(1)}>
          <div style={{ width: "1rem", height: "1rem", backgroundColor: "#8cc152", borderRadius: "4px" }}></div>
          <span>Year 8</span>
        </div>
        <div style={legendItemStyle(2)}>
          <div style={{ width: "1rem", height: "1rem", backgroundColor: "#4a89dc", borderRadius: "4px" }}></div>
          <span>Year 11</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CombinedChart;
