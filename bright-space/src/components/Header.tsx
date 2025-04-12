import React from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  shorthands,
  Image,
  tokens,
} from "@fluentui/react-components";
import BSLogo from "../assets/images/logos/bright-space-round.png";
import BSNavLink from "./BSLinks/BSNavLink";

const useHeaderStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorBrandBackground2,
    justifyItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  headerContent: {
    ...shorthands.padding("1rem"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    margin: "0 auto",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
  },
  title: {
    margin: "0",
    fontSize: "1.5rem",
    color: tokens.colorNeutralForeground1,
  },
  logo: {
    width: "3rem",
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const styles = useHeaderStyles();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.brand} onClick={() => navigate("/")}>
          <Image className={styles.logo} src={BSLogo} alt="Logo" />
          <h1 className={styles.title}>BrightSpace</h1>
        </div>

        <nav className={styles.nav}>
          <BSNavLink text="Home" route="/" noArrow />
          <BSNavLink text="Post Coach" route="/bs-posting-coach" noArrow />
          <BSNavLink text="Report It" route="/report" noArrow />
          <BSNavLink text="Resources" route="/bs-resource" noArrow />
        </nav>
      </div>
    </header>
  );
};

export default Header;
