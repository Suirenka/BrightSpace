import {
  Text,
  Image,
  Link,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { teamsLightTheme } from "@fluentui/react-components";
import githubLogoSrc from "../assets/images/logos/github-mark.png";
import githubLogoWhiteSrc from "../assets/images/logos/github-mark-white.png";
import { ThemeContext } from "../App";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

const useFooterStyles = makeStyles({
  footer: {
    backgroundColor: "colorNeutralForeground1",
    marginTop: "auto",
    width: "100%",
    height: "auto",
    ...shorthands.padding("1rem"),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  },
  logo: {
    width: "25px",
    height: "25px",
  },
});

const Footer = () => {
  const styles = useFooterStyles();
  const { theme } = useContext(ThemeContext);
  const githubLogo =
    theme === teamsLightTheme ? githubLogoSrc : githubLogoWhiteSrc;

  return (
    <footer className={styles.footer}>
      <div className={styles.linkContainer}>
        <Link href="https://github.com/Suirenka/BrightSpace">
          <Image className={styles.logo} src={githubLogo} alt="Logo" />
        </Link>
        <RouterLink to="/contact">Contact Us</RouterLink>
        <RouterLink to="/terms-and-condition">Terms and Conditions</RouterLink>
        <RouterLink to="/privacy">Privacy Policy</RouterLink>
      </div>
      <Text as="p" size={200}>
        All rights reserved. Copyright&copy; {new Date().getFullYear()} Bright
        Space by Digicon.
      </Text>
    </footer>
  );
};

export default Footer;
