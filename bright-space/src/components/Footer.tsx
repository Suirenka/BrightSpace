import {
  Text,
  Image,
  Link,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { teamsLightTheme } from "@fluentui/react-components";
import { useContext } from "react";
import { ThemeContext } from "../App";
import BSNavLink from "./BSLinks/BSNavLink";
import BSThemeToggle from "./BSThemeToggle";
import githubLogoSrc from "../assets/images/logos/github-mark.png";
import githubLogoWhiteSrc from "../assets/images/logos/github-mark-white.png";

const useFooterStyles = makeStyles({
  footer: {
    backgroundColor: tokens.colorBrandBackground2,
    padding: "2.5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  contentRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "4rem",
    width: "100%",
    maxWidth: "1000px",
  },
  column: {
    flex: "1 1 250px",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  columnTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    color: tokens.colorNeutralForeground1,
  },
  link: {
    color: tokens.colorBrandForegroundLink,
    fontSize: "0.95rem",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    ":hover": {
      textDecoration: "underline",
    },
  },
  bottomRow: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: "1.2rem",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  bottomText: {
    fontSize: "0.875rem",
    color: tokens.colorNeutralForeground3,
  },
  iconRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "1rem",
  },
  logo: {
    width: "24px",
    height: "24px",
  },
});

const Footer = () => {
  const styles = useFooterStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const githubLogo =
    theme === teamsLightTheme ? githubLogoSrc : githubLogoWhiteSrc;

  return (
    <footer className={styles.footer}>
      <div className={styles.contentRow}>
        <div className={styles.column}>
          <Text className={styles.columnTitle}>About Us</Text>
          <Text>
            BrightSpace helps young people stay safe and confident online.
            Through interactive tools and real-life guidance, we support teens
            in handling cyberbullying and building healthy digital habits.
          </Text>
        </div>

        <div className={styles.column}>
          <Text className={styles.columnTitle}>Quick Links</Text>
          <BSNavLink text="Home" route="/" noArrow />
          <BSNavLink text="Insights" route="/bs-data" noArrow />
          <BSNavLink text="Resources" route="/bs-resource" noArrow />
          <BSNavLink text="Post Coach" route="/bs-posting-coach" noArrow />
          <BSNavLink text="Reflective Twin" route="/bs-reflective-twin" noArrow/>
          <BSNavLink text="Build Boundary" route="/bs-boundaries-builder" noArrow/>
          <BSNavLink text="Report It" route="/report" noArrow/>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.iconRow}>
          <BSThemeToggle currentTheme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
