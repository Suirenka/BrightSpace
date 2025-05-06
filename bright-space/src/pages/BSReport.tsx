import {
  makeStyles,
  tokens,
  Title1,
  Link,
} from "@fluentui/react-components";
import {
  Call24Regular,
  Mail24Regular,
} from "@fluentui/react-icons";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BackToTopButton from "../components/BackToTopButton";
import { ReactComponent as InstagramIcon } from "../assets/images/icons/instagram.svg";
import { ReactComponent as TiktokIcon } from "../assets/images/icons/tiktok.svg";
import { ReactComponent as SnapchatIcon } from "../assets/images/icons/snapchat.svg";
import { ReactComponent as DiscordIcon } from "../assets/images/icons/discord.svg";

const useStyles = makeStyles({
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
  headerWrapper: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "2.5rem",
    marginBottom: "0.75rem",
    color: tokens.colorBrandForeground1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
    marginBottom: "2.5rem",
  },
  card: {
    marginTop: "2rem",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "10px",
    boxShadow: tokens.shadow4,
    padding: "1.5rem",
    textAlign: "center",
    textDecoration: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    color: "inherit",

    ":hover": {
      transform: "scale(1.05)",
      boxShadow: tokens.shadow16,
      cursor: "pointer",
    },
  },
  icon: {
    marginBottom: "1rem",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: "1.15rem",
  },
  reportLink: {
    marginTop: "0.3rem",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  cardContent: {
    textAlign: "left",
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
    marginTop: "0.5rem",
  },
  list: {
    paddingLeft: "1rem",
    marginTop: "0.5rem",
    textAlign: "left",
  },
  link: {
    color: tokens.colorBrandForeground1,
    fontWeight: 500,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  backWrapper: {
    textAlign: "center",
  },
});

const handleExternalLinkClick = (url: string) => {
  const confirmed = window.confirm("You're about to leave BrightSpace and visit an external site. Continue?");
  if (confirmed) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};
const BSReport = () => {
  const styles = useStyles();
  
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <Title1 className={styles.title}>
          Report Harmful Content and Get Support
        </Title1>
      </div>

      <div className={styles.grid}>
        {/* Instagram */}
        <div
          className={styles.card}
          onClick={() => handleExternalLinkClick("https://help.instagram.com/")}
        >
          <div className={styles.icon}>
            <InstagramIcon style={{ width: 32, height: 32 }} />
          </div>
          <div className={styles.cardTitle}>Instagram</div>
          <div className={styles.reportLink}>
            <span className={styles.link}>Report on Instagram</span>
          </div>
          <div className={styles.cardContent}>
            Report private DMs, comments, posts, or Stories that break rules.
            <ul className={styles.list}>
              <li>You’ll get a confirmation</li>
              <li>Instagram reviews each case</li>
            </ul>
          </div>
        </div>

        {/* TikTok */}
        <div
          className={styles.card}
          onClick={() => handleExternalLinkClick("https://support.tiktok.com/")}
        >
          <div className={styles.icon}>
            <TiktokIcon style={{ width: 32, height: 32 }} />
          </div>
          <div className={styles.cardTitle}>TikTok</div>
          <div className={styles.reportLink}>
            <span className={styles.link}>Report on TikTok</span>
          </div>
          <div className={styles.cardContent}>
            Flag videos, comments, or profiles that feel harmful or unsafe.
            <ul className={styles.list}>
              <li>You’ll be notified after action</li>
              <li>TikTok may remove content</li>
            </ul>
          </div>
        </div>

        {/* Snapchat */}
        <div
          className={styles.card}
          onClick={() => handleExternalLinkClick("https://support.snapchat.com/")}
        >
          <div className={styles.icon}>
            <SnapchatIcon style={{ width: 32, height: 32 }} />
          </div>
          <div className={styles.cardTitle}>Snapchat</div>
          <div className={styles.reportLink}>
            <span className={styles.link}>Report on Snapchat</span>
          </div>
          <div className={styles.cardContent}>
            Report snaps, chats, or stories directly from the app.
            <ul className={styles.list}>
              <li>Snap’s Trust & Safety team reviews fast</li>
              <li>Serious cases may involve legal action</li>
            </ul>
          </div>
        </div>

        {/* Discord */}
        <div
          className={styles.card}
          onClick={() => handleExternalLinkClick("https://discord.com/safety")}
        >
          <div className={styles.icon}>
            <DiscordIcon style={{ width: 32, height: 32 }} />
          </div>
          <div className={styles.cardTitle}>Discord</div>
          <div className={styles.reportLink}>
            <span className={styles.link}>Get help via eSafety</span>
          </div>
          <div className={styles.cardContent}>
            Report abusive messages or servers directly to Discord Trust & Safety.
            <ul className={styles.list}>
              <li>Visit: esafety.gov.au</li>
              <li>Legal reporting tools for serious cases</li>
            </ul>
          </div>
        </div>

        {/* Kids Helpline */}
        <div
          className={styles.card}
          onClick={() => handleExternalLinkClick("https://kidshelpline.com.au")}
        >
          <div className={styles.icon}>
            <Call24Regular style={{ width: 32, height: 32 }} />
          </div>
          <div className={styles.cardTitle}>Kids Helpline</div>
          <div className={styles.reportLink}>
            <span className={styles.link}>kidshelpline.com.au</span>
          </div>
          <div className={styles.cardContent}>
            Free, private, and 100% for kids and young people
            <ul className={styles.list}>
              <li>Call: 1800 55 1800 (24/7)</li>
              <li>Chat: kidshelpline.com.au</li>
            </ul>
          </div>
        </div>

        {/* Safety Commissioner */}
        <div
          className={styles.card}
          onClick={() => handleExternalLinkClick("https://esafety.gov.au")}
        >
          <div className={styles.icon}>
            <Mail24Regular style={{ width: 32, height: 32 }} />
          </div>
          <div className={styles.cardTitle}>Safety Commissioner</div>
          <div className={styles.reportLink}>
            <span className={styles.link}>esafety.gov.au</span>
          </div>
          <div className={styles.cardContent}>
            Support, investigate, and respond to online cyberbullying incidents.
            <ul className={styles.list}>
              <li>Help with image-based abuse</li>
              <li>Legal tools for serious cases</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.backWrapper}>
        <BSNavLink text="Go Back to Resources" route="/bs-resource" back />
      </div>
      <BackToTopButton />
    </div>
  );
};

export default BSReport;
