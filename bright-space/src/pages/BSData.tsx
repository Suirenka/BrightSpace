import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    padding: "4rem 2rem",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
  },
  description: {
    fontSize: "1.125rem",
    color: tokens.colorNeutralForeground2,
    maxWidth: "700px",
    textAlign: "center",
    lineHeight: "1.8",
  },
});

const BSData = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Real-World Bullying Data
      </motion.h1>

      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Explore visualized insights on how teens experience bullying in real-world contexts. Coming soon!
      </motion.p>

    </div>
  );
};

export default BSData;
