/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Body1,
  Button,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
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
    alignItems: "flex-start",
    textAlign: "left",
  },
  rightColumn: {
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
  },
  risksTitle: {
    marginBottom: "0.5rem",
    color: tokens.colorNeutralForeground1,
  },
  risksParagraph: {
    marginBottom: "1rem",
    maxWidth: "500px",
    color: tokens.colorNeutralForeground1,
  },
  image: {
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
});

const InfoTab = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button appearance="primary" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>
      <CancerByAgeBox />
      <CancerByStateBox />
      <InfoDataSourceFooter />
    </>
  );
};

const CancerByAgeBox = () => {
  const styles = useStyles();
  return (
    <div className={styles.infoSection}>
      <div className={styles.rightColumn}>
        <img
          src="/cancer_cases_by_age_interactive.png"
          alt="Cancer Cases by Age"
          className={styles.image}
        />
      </div>
      <div className={styles.leftColumn}>
        <Title1 className={styles.risksTitle}>Cancer Incidence by Age</Title1>
        <Body1 className={styles.risksParagraph}>
          The incidence gap between age groups widened significantly from 2000
          to 2020, with the older age groups (65-69, 70-74, and 75-79)
          surpassing others to reach 5000-6000 skin cancer cases by the end of
          2024.
        </Body1>
      </div>
    </div>
  );
};

const CancerByStateBox = () => {
  const styles = useStyles();
  return (
    <div className={styles.infoSection}>
      <div className={styles.leftColumn}>
        <Title1 className={styles.risksTitle}>Cancer Incidence by State</Title1>
        <Body1 className={styles.risksParagraph}>
          From 1982 to 2020, the number of skin-cancer cases increases gradually
          each year – from only 7.5k to around 30k cases. Three dominant
          territories—NSW, Queensland, and VIC—account for 80–85% of all cases.
        </Body1>
      </div>
      <div className={styles.rightColumn}>
        <img
          src="/cancer_cases_by_state_interactive.png"
          alt="Cancer Cases by Age"
          className={styles.image}
        />
      </div>
    </div>
  );
};

function InfoDataSourceFooter() {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#666",
        marginTop: "2rem",
        padding: "1rem",
        borderTop: "1px solid #ddd",
      }}
    >
      <p>
        <strong>Data Sources &amp; Attributions:</strong>
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          Incidence and mortality data from{" "}
          <a
            href="https://creativecommons.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons
          </a>{" "}
          and{" "}
          <a
            href="https://www.matthewproctor.com/australian_postcodes#downloadlinks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Matthew Proctor
          </a>
          . Please see their{" "}
          <a
            href="https://creativecommons.org/licenses/by/3.0/au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms &amp; Conditions
          </a>{" "}
          for license details.
        </li>
      </ul>
    </div>
  );
}

export default InfoTab;
