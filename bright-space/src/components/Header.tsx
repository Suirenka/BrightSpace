import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, shorthands, Image } from "@fluentui/react-components";
import BSLogo from "../assets/images/logos/bright-space-round.png";
import { useContext } from "react";
import { ThemeContext } from "../App";
import BSThemeToggle from "./BSThemeToggle";
import { tokens } from "@fluentui/react-theme";

const useHeaderStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorBrandBackground2,
    justifyItems: "center",
  },
  headerContent: {
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.padding("1rem"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
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
    width: "3rem",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const styles = useHeaderStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.brand} onClick={() => navigate("/")}>
          <Image className={styles.logo} src={BSLogo} alt="Logo" />
          <h1 className={styles.title}>BrightSpace</h1>
        </div>
        <BSThemeToggle currentTheme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
