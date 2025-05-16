import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  shorthands,
  Image,
  tokens,
} from "@fluentui/react-components";
import { motion } from "framer-motion";
import BSLogo from "../assets/images/logos/bright-space-round.png";
import BSNavLink from "./BSLinks/BSNavLink";

const useHeaderStyles = makeStyles({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorBrandBackground2,
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
    margin: 0,
    fontSize: "1.5rem",
    color: tokens.colorNeutralForeground1,
  },
  logo: {
    width: "3rem",
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
    fontSize: "1.2rem",
  },
  navLink: {
    color: tokens.colorNeutralForeground1,
    textDecoration: "none",
  },
  activeNavLink: {
    color: tokens.colorBrandForeground1,
    fontWeight: 600,
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
  },
});

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const styles = useHeaderStyles();

  const links = [
    { text: "Home", route: "/" },
    { text: "Insights", route: "/bs-data" },
    { text: "Resources", route: "/bs-resource" },
    { text: "Post Coach", route: "/bs-posting-coach" },
    { text: "Reflective Twin", route: "/bs-reflective-twin" },
    { text: "Build Boundary", route: "/bs-boundaries-builder" },
    { text: "Report It", route: "/report" },
  ];

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className={styles.headerContent}>
        <div className={styles.brand} onClick={() => navigate("/")}>
          <Image className={styles.logo} src={BSLogo} alt="Logo" />
          <h1 className={styles.title}>BrightSpace</h1>
        </div>

        <nav className={styles.nav}>
          {links.map(({ text, route }) => (
            <BSNavLink
              key={route}
              text={text}
              route={route}
              noArrow
              className={
                `${styles.navLink} ` +
                (location.pathname === route ? styles.activeNavLink : "")
              }
            />
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
