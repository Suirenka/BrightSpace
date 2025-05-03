import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import BSBanner from "../components/BSBanner";
import BackToTopButton from "../components/BackToTopButton";
import ResourceImage from "../assets/images/home/Resource.png";
import PostingCoachImage from "../assets/images/home/Coach.png";
import BoundaryImage from "../assets/images/home/Boundary.png";
import BSData from "./BSData";
import { motion } from "framer-motion";
import DailyChallengeNotification from "../components/DailyChallengeNotification";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  wrapper: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "3rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
  },
  section: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "480px",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground1,

    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  textSection: {
    flex: 1,
    padding: "4rem 3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 2,

    "@media (max-width: 900px)": {
      textAlign: "center",
      padding: "2rem 1.5rem",
    },
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    lineHeight: "1.3",
    marginBottom: "1.5rem",
    color: tokens.colorNeutralForeground1,
    wordBreak: "break-word",
  },
  description: {
    fontSize: "1.125rem",
    lineHeight: "1.8",
    color: tokens.colorNeutralForeground2,
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "fit-content",

    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  imageSection: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",

    "@media (max-width: 900px)": {
      height: "260px",
    },
  },
  reverse: {
    flexDirection: "row-reverse",

    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  intro: {
    padding: "5rem 2rem 4rem",
    maxWidth: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: tokens.colorNeutralForeground1,
  },
  introTitle: {
    fontSize: "2.25rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
    color: tokens.colorNeutralForeground1,
  },
  introParagraph: {
    fontSize: "1.125rem",
    lineHeight: "1.8",
    marginBottom: "1.5rem",
    color: tokens.colorNeutralForeground2,
  },
});

const BSHome = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BSBanner onExploreClick={handleExploreClick} />
      <div
        ref={sectionRef}
        style={{
          backgroundColor: tokens.colorNeutralBackground3,
          padding: "5rem 1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "3.25rem",
              fontWeight: 800,
              color: tokens.colorNeutralForeground1,
            }}
          >
            The Heart Behind{" "}
            <span style={{ color: tokens.colorBrandForeground1 }}>BrightSpace</span>
          </h2>
          <p
            style={{
              marginTop: "-1rem",
              fontSize: "1.125rem",
              color: tokens.colorNeutralForeground2,
              maxWidth: "700px",
              lineHeight: "1.8",
            }}
          >
            A safer digital space means more than just avoiding harm — it’s
            about building kindness, confidence, and empathy in every click and
            conversation.
          </p>
          {(() => {
          const stats = [
            {
              icon: "📊",
              title: "Cyberbullying Still Hurts",
              desc: (
                <>
                  2,383 cases reported by eSafety in Australia in 2023.
                </>
              ),
            },
            {
              icon: "🛡️",
              title: "Rising Need for Online Safety",
              desc: (
                <>
                  Estimated 18,300 cases in Victoria by 2028.
                </>
              ),
            },
            {
              icon: "📩",
              
              title: "Real Stories from Victoria",
              desc: (
                <>
                  748 eSafety reports in Victoria in 2022.
                </>
              ),
            },
          ];

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    flex: "1 1 280px",
                    backgroundColor: tokens.colorNeutralBackground1,
                    borderRadius: "16px",
                    padding: "2rem",
                    boxShadow: tokens.shadow28,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: tokens.colorNeutralForeground1,
                        marginBottom: "0.5rem",
                      }}
                    >
                    {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: tokens.colorNeutralForeground2,
                        lineHeight: "1.6",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })()}

          <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <button
            className={styles.button}
            onClick={() => navigate("/bs-data")}
          >
            View Full Data Insights
          </button>
        </div>

          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.imageSection}>
            <img src={ResourceImage} className={styles.image} alt="Resource" />
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.title}>
              Digital Citizenship Scenario and Guides
            </h2>
            <p className={styles.description}>
              Experience common online challenges, choose how to respond, and
              build real-life skills for digital wellbeing.
            </p>
            <button
              className={styles.button}
              onClick={() => navigate("/bs-resource")}
            >
              Learn More about Stay Safe Online
            </button>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.section} ${styles.reverse}`}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.imageSection}>
            <img
              src={PostingCoachImage}
              className={styles.image}
              alt="Posting Coach"
            />
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Intentional Posting Coach</h2>
            <p className={styles.description}>
              The Posting Coach helps you to navigate the complexities of online
              communication, offering guidance on kind and respectful
              expression.
            </p>
            <button
              className={styles.button}
              onClick={() => navigate("/bs-posting-coach")}
            >
              Try the Posting Coach
            </button>
          </div>
        </motion.div>

        <motion.div
          className={styles.section}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.imageSection}>
            <img src={BoundaryImage} className={styles.image} alt="Resource" />
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Build My Boundaries</h2>
            <p className={styles.description}>
              This interactive canvas helps you define the personal digital
              values — one boundary at a time.
            </p>
            <button
              className={styles.button}
              onClick={() => (window.location.href = "/bs-boundaries-builder")}
            >
              Try Building Boundaries
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          minHeight: "600px",
          maxWidth: "1310px",
          backgroundImage: `url(${require("../assets/images/home/ReportImage.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <h2
            style={{
              fontSize: "2.75rem",
              fontWeight: 800,
              marginBottom: "1rem",
              textShadow: "0px 4px 20px rgba(0,0,0,0.7)",
            }}
          >
            Report Harmful Behavior
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              maxWidth: "700px",
              lineHeight: "1.8",
              marginInline: "auto",
              textShadow: "0px 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            If you or someone you know has experienced online harm, speak up.
            Your action can help create a safer space for everyone.
          </p>
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/report")}
          >
            Learn More about Reporting Method
          </button>
        </div>
      </motion.div>
      <BackToTopButton />
      <DailyChallengeNotification />
    </>
  );
};

export default BSHome;
