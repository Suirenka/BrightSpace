import {
  Subtitle1,
  Title1,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
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
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    width: "100%",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
  },
  subtitle: {
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
  },
});

const BSBanner = () => {
  const styles = useStyles();

  return (
    <div className={styles.Banner}>
      <div className={styles.Overlay} />
      <div className={styles.Container}>
        <Title1 className={styles.title}>
          Your Daily Companion for Positive Digital Living
        </Title1>
      </div>
    </div>
  );
};

export default BSBanner;
