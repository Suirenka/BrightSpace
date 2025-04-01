import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { WeatherSunnyLow24Filled } from "@fluentui/react-icons";
// ^ Adjust this import if you prefer a different icon variant, e.g. WeatherSunnyLow24Regular

const useHeaderStyles = makeStyles({
  header: {
    backgroundColor: "#E8C33080",
    ...shorthands.padding("1rem"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  title: {
    margin: "0",
  },
  icon: {
    color: "orange",
    marginLeft: "8px",
  },
});

const Header: React.FC = () => {
  const navigate = useNavigate();
  const styles = useHeaderStyles();

  return (
    <header className={styles.header}>
      <div className={styles.brand} onClick={() => navigate("/")}>
        <h1 className={styles.title}>BrightSpace</h1>
        <WeatherSunnyLow24Filled className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;
