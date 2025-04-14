import React, { useRef } from "react";
import {
  Subtitle1,
  Title1,
  makeStyles,
  shorthands,
  tokens,
  Button,
} from "@fluentui/react-components";
import { ChevronDown24Regular } from "@fluentui/react-icons";
import BannerImage from "../assets/images/home/Banner.jpg";

const useStyles = makeStyles({
  Banner: {
    position: "relative",
    width: "100%",
    height: "90vh",
    backgroundImage: `url(${BannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
    zIndex: 1,
  },
  Container: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "white",
    ...shorthands.padding("20px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    width: "100%",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
  },
  button: {
    backgroundColor: "#7B5EFF",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "fit-content",
  
    ":hover": {
      backgroundColor: "#1749cc",
    },
  },
});

const BSBanner = ({ onExploreClick }: { onExploreClick: () => void }) => {
  const styles = useStyles();

  return (
    <div className={styles.Banner}>
      <div className={styles.Overlay} />
      <div className={styles.Container}>
        <Title1 className={styles.title}>
          Your Daily Companion for Positive Digital Living
        </Title1>
        <Button
          onClick={onExploreClick}
          className={styles.button}
        >
          Explore More
        </Button>
      </div>
    </div>
  );
};

export default BSBanner;
