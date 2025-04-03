import {
  Subtitle1,
  Title1,
  Image,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import BannerGif from "../assets/images/home/Banner.gif";

const useStyles = makeStyles({
  Banner: {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    minHeight: "40vh",
    width: "100vw",
    backgroundImage: `url(${BannerGif})`,
    justifyContent: "center",
  },
  Container: {
    width: "70%",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("20px"),
    justifyContent: "center",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  title: {
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  subtitle: {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
});

const BSBanner = () => {
  const styles = useStyles();
  return (
    <div className={styles.Banner}>
      <div className={styles.Container}>
        <Title1 className={styles.title}>BrightSpace</Title1>
        <Subtitle1 className={styles.subtitle}>
          Your Daily Companion for Positive Digital Living
        </Subtitle1>
      </div>
    </div>
  );
};

export default BSBanner;
