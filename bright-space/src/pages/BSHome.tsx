import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import BSBanner from "../components/BSBanner";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BackToTopButton from "../components/BackToTopButton";
import ResourceImage from "../assets/images/home/Resource.png";
import PostingCoachImage from "../assets/images/home/Coach.png";
import { motion } from "framer-motion";

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
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "9999px",
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
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BSBanner onExploreClick={handleExploreClick} />
      <div
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
        fontSize: "2.25rem",
        fontWeight: 800,
        color: tokens.colorNeutralForeground1,
      }}
    >
      The Heart Behind BrightSpace
    </h2>
    <p
      style={{
        fontSize: "1.125rem",
        color: tokens.colorNeutralForeground2,
        maxWidth: "700px",
        lineHeight: "1.8",
      }}
    >
      A safer digital space means more than just avoiding harm — it’s about building kindness, confidence, and empathy
      in every click and conversation.
    </p>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.5rem",
        marginTop: "2rem",
      }}
    >
      {[
  {
    title: "Support",
    desc: "Because no one should feel alone online. We're here to walk with you.",
  },
  {
    title: "Skills",
    desc: "Build the tools to navigate online spaces with care, courage, and clarity.",
  },
  {
    title: "Confidence",
    desc: "Grow your voice and feel proud of how you show up in the digital world.",
  },
].map((item, i) => (
  <motion.div
    key={i}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    style={{
      flex: "1 1 260px",
      backgroundColor: tokens.colorNeutralBackground1,
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: tokens.shadow28,
      textAlign: "center",
      cursor: "default",
    }}
  >
    <h3
      style={{
        fontSize: "1.75rem",
        fontWeight: 700,
        color: tokens.colorBrandForeground1,
        marginBottom: "0.5rem",
      }}
    >
      {item.title}
    </h3>
    <p
      style={{
        fontSize: "1rem",
        color: tokens.colorNeutralForeground2,
        lineHeight: "1.6",
      }}
    >
      {item.desc}
    </p>
  </motion.div>
))}

    </div>
  </div>
</div>
  
      <div ref={sectionRef} className={styles.wrapper}>
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
            <h2 className={styles.title}>Digital Citizenship Scenario and Guides</h2>
            <p className={styles.description}>
              Experience common online challenges, choose how to respond, and build real-life skills for digital wellbeing.
            </p>
            <button
              className={styles.button}
              onClick={() => (window.location.href = "/bs-resource")}
            >
              Learn More about the resources
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
            <img src={PostingCoachImage} className={styles.image} alt="Posting Coach" />
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Intentional Posting Coach</h2>
            <p className={styles.description}>
              The Posting Coach helps teens navigate the complexities of online communication,
              offering guidance on kind and respectful expression.
            </p>
            <button
              className={styles.button}
              onClick={() => (window.location.href = "/bs-posting-coach")}
            >
              Try the Posting Coach
            </button>
          </div>
        </motion.div>
      </div>
  
      <BackToTopButton />
    </>
  );
};

export default BSHome;
