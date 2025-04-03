import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, shorthands, Image } from "@fluentui/react-components";
import BSLogo from "../assets/images/logos/BSLogo.jpg";
import { useContext } from "react";
import { ThemeContext } from "../App";
import BSThemeToggle from "./BSThemeToggle";

const useHeaderStyles = makeStyles({
  header: {
    backgroundColor: "colorNeutralForeground1",
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
  logo: {
    width: "2vw",
    marginLeft: "1rem",
  },
});

const Header: React.FC = () => {
  const navigate = useNavigate();
  const styles = useHeaderStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <div className={styles.brand} onClick={() => navigate("/")}>
        <h1 className={styles.title}>BrightSpace</h1>
        <Image className={styles.logo} src={BSLogo} alt="Logo" />
      </div>
      <BSThemeToggle currentTheme={theme} onToggle={toggleTheme} />
    </header>
  );
};

export default Header;
