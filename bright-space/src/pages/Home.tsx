import * as React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle1,
  Body1,
  Button,
  Divider,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import BSNavButton from "../components/BSNavButton";

const useStyles = makeStyles({
  Container: {
    backgroundImage: "url('/sunset_bg.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("20px"),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  title: {
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  subtitle: {
    maxWidth: "600px",
    margin: "0 auto",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  locationContainer: {
    ...shorthands.padding("2rem"),
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading2: {
    marginBottom: "1rem",
  },
  paragraph: {
    marginBottom: "1.5rem",
  },
  locationBoxWrapper: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  infoSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    ...shorthands.gap("1rem"),
    ...shorthands.padding("2rem"),
    "@media(max-width: 768px)": {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  leftColumn: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  risksTitle: {
    marginBottom: "0.5rem",
  },
  risksParagraph: {
    marginBottom: "1rem",
    maxWidth: "500px",
  },
  intro: {
    marginTop: "1rem",
    maxWidth: "500px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  rightColumn: {
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
  },
  infoImage: {
    borderRadius: "8px",
    maxHeight: "40vh",
  },
});

export const Home = () => {
  return (
    <>
      <Banner />
      <UvRisksBox />
      <Divider />
    </>
  );
};

const Banner = () => {
  const styles = useStyles();
  return (
    <div className={styles.Container}>
      <Title1 className={styles.title}>BrightSpace</Title1>
      <Subtitle1 className={styles.subtitle}>
        Your Daily Companion for Positive Digital Living
      </Subtitle1>
    </div>
  );
};

const UvRisksBox = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.infoSection}>
      <div className={styles.leftColumn}>
        <Title1 className={styles.risksTitle}>UV Risks</Title1>
        <Body1 className={styles.risksParagraph}>
          Prolonged exposure to UV rays can cause sunburn, premature aging, and
          even skin cancer. It is crucial to protect yourself whenever you are
          outdoors.
        </Body1>
        <div className={styles.buttonRow}>
          <BSNavButton text={"Learn More about UV Risk"} route={"/"} />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <img src="/sunset_1.jpeg" alt="Sunset" className={styles.infoImage} />
      </div>
    </div>
  );
};

export default Home;
