import React, { useEffect, useState } from "react";
import { makeStyles, Button, tokens } from "@fluentui/react-components";
import { ArrowUp24Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  button: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 9999,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    fontWeight: "bold",
    fontSize: "1rem",
    boxShadow: tokens.shadow64,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",

    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

const BackToTopButton = () => {
  const styles = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Button className={styles.button} onClick={scrollToTop}>
      <ArrowUp24Filled />
      Back to Top
    </Button>
  );
};

export default BackToTopButton;