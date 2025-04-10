import {
  Text,
  Image,
  Link,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { teamsLightTheme } from "@fluentui/react-components";
import githubLogoSrc from "../assets/images/logos/github-mark.png";
import githubLogoWhiteSrc from "../assets/images/logos/github-mark-white.png";
import { ThemeContext } from "../App";
import { useContext } from "react";
import BSNavLink from "./BSLinks/BSNavLink";
import BSThemeToggle from "./BSThemeToggle";

const useFooterStyles = makeStyles({
  footer: {
    backgroundColor: tokens.colorBrandBackground2,
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
  navLink: {
    color: tokens.colorBrandForegroundLinkHover,
    textDecoration: "none",
    fontSize: "14px",
    ":hover": {
      textDecoration: "underline",
    },
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.gap("4px"),
  },
  themeRow: {
    borderTop: "1px solid #e0e0e0",
    paddingTop: "0.75rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: tokens.colorNeutralForeground3,
  },
});

const Footer = () => {
  const styles = useFooterStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const githubLogo =
    theme === teamsLightTheme ? githubLogoSrc : githubLogoWhiteSrc;

  return (
    <footer className={styles.footer}>
      <div className={styles.linkContainer}>
        <Link href="https://github.com/Suirenka/BrightSpace">
          <Image className={styles.logo} src={githubLogo} alt="Logo" />
        </Link>
        <BSNavLink
          givenLinkStyle={styles.navLink}
          text={"Contact Us"}
          route={"/contact"}
          noArrow={true}
        />
        <BSNavLink
          givenLinkStyle={styles.navLink}
          text={"Terms and Conditions"}
          route={"/terms-and-condition"}
          noArrow={true}
        />
        <BSNavLink
          givenLinkStyle={styles.navLink}
          text={"Privacy Policy"}
          route={"/privacy"}
          noArrow={true}
        />
      </div>

      <Text as="p" size={200}>
        All rights reserved. Copyright&copy; {new Date().getFullYear()} Bright
        Space by Digicon.
      </Text>

      <div className={styles.themeRow}>
        {/* <Text>Theme: {theme === teamsLightTheme ? "Light" : "Dark"}</Text> */}
        <BSThemeToggle currentTheme={theme} onToggle={toggleTheme} />
      </div>
    </footer>
  );
};

export default Footer;
