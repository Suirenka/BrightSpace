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
      <ProtectionBox />
      <Divider />
      <LocationSearch />
    </>
  );
};

const Banner = () => {
  const styles = useStyles();
  return (
    <div className={styles.Container}>
      <Title1 className={styles.title}>Sunshield</Title1>
      <Subtitle1 className={styles.subtitle}>
        Stay Safe Under the Sun!
      </Subtitle1>
      <Body1 className={styles.intro}>
        The sun brightens our days, lifts our spirits, and gives us that golden
        glow. But beneath its radiant light lies an invisible threat: UV
        radiation. You can’t see or feel it. Yet, it can damage your skin in
        minutes, leading to sunburn, premature aging, and even long-term health
        risks like skin cancer.
      </Body1>
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
          <Button appearance="primary" onClick={() => navigate("/infotab")}>
            Learn More about UV Risk
          </Button>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <img src="/sunset_1.jpeg" alt="Sunset" className={styles.infoImage} />
      </div>
    </div>
  );
};

const ProtectionBox = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.infoSection}>
      <div className={styles.rightColumn}>
        <img
          src="/protection_img.jpeg"
          alt="Protection"
          className={styles.infoImage}
        />
      </div>
      <div className={styles.leftColumn}>
        <Title1 className={styles.risksTitle}>Protection</Title1>
        <Body1 className={styles.risksParagraph}>
          Protect yourself by checking the UV index before heading out. Wear
          sunscreen, put on protective clothing, and seek shade when needed.
        </Body1>
        <div className={styles.buttonRow}>
          <Button appearance="primary" onClick={() => navigate("/protection")}>
            Learn More about Sun Protection
          </Button>
        </div>
      </div>
    </div>
  );
};

function LocationSearch() {
  const styles = useStyles();
  return (
    <div className={styles.locationContainer}>
      <h2 className={styles.heading2}>Find Your Local UV Index</h2>
      <p className={styles.paragraph}>
        Enter your location below to get the latest UV Index data and
        personalized sun protection tips. Stay informed and stay safe in the
        sun!
      </p>
    </div>
  );
}

export default Home;
