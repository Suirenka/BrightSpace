import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, shorthands, Image } from "@fluentui/react-components";
import BSLogo from "../assets/images/logos/bright-space-round.png";
import { tokens } from "@fluentui/react-components";

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
    width: "70%",
    margin: "0 auto",
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

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.brand} onClick={() => navigate("/")}>
          <Image className={styles.logo} src={BSLogo} alt="Logo" />
          <h1 className={styles.title}>BrightSpace</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
