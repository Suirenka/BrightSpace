import { makeStyles, tokens, Button } from "@fluentui/react-components";
import BannerImage from "../assets/images/home/Banner.jpg";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "88vh",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground1,

    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  textSection: {
    flex: 0.9,
    padding: "3rem 6rem 5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground1,

    "@media (max-width: 900px)": {
      textAlign: "center",
      padding: "2rem 1.5rem",
    },
  },
  title: {
    fontSize: "3rem",
    fontWeight: 700,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.3",
    marginBottom: "3rem",
  },
  subtitle: {
    fontSize: "1.3rem",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.8",
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
    flex: 1.1,
    backgroundImage: `url(${BannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",

    "@media (max-width: 900px)": {
      clipPath: "none",
      height: "260px",
    },
  },
});

const BSBanner = ({ onExploreClick }: { onExploreClick: () => void }) => {
  const styles = useStyles();

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={styles.textSection}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className={styles.title}>
          Your Daily Companion for Positive Digital Living
        </h1>
        <p className={styles.subtitle}>
          Become the digital citizen who makes the online world better — one
          choice, one voice, one moment at a time.
        </p>
        <Button className={styles.button} onClick={onExploreClick}>
          Explore More
        </Button>
      </motion.div>

      <motion.div
        className={styles.imageSection}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>
  );
};

export default BSBanner;
