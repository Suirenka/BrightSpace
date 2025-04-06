import {
    makeStyles,
    shorthands,
    tokens,
    Title1,
    Subtitle2,
    Text,
    Link,
  } from "@fluentui/react-components";
  import {
    Call24Regular,
    Mail24Regular,
    Share24Regular,
    ShieldError24Regular,
  } from "@fluentui/react-icons";
  import BSNavLink from "../components/BSLinks/BSNavLink";
  
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
      fontSize: "2rem",
      marginBottom: "0.75rem",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: tokens.colorNeutralForeground3,
      lineHeight: "1.7",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
      marginTop: "1rem",
      marginBottom: "2.5rem",
    },
    card: {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      borderRadius: "10px",
      boxShadow: tokens.shadow4,
      padding: "1.5rem",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      ":hover": {
        transform: "scale(1.05)",
        boxShadow: tokens.shadow16,
        cursor: "pointer",
      },
    },
    icon: {
      marginBottom: "0.75rem",
      color: tokens.colorBrandForeground1,
    },
    cardTitle: {
      fontWeight: 600,
      fontSize: "1.15rem",
      marginBottom: "0.5rem",
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
  
  const BSReport = () => {
    const styles = useStyles();
  
    return (
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <Subtitle2 className={styles.subtitle}>
            If something’s not okay, here’s how to report it on the platforms you use every day. Quick links, no stress.
          </Subtitle2>
        </div>
  
        <div className={styles.grid}>
          {/* Instagram */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <Share24Regular fontSize={32} />
            </div>
            <div className={styles.cardTitle}>Instagram</div>
            <Text>
              Report private DMs, comments, posts, or Stories that break rules.
              <br />
              <Link
                className={styles.link}
                href="https://help.instagram.com/"
                target="_blank"
              >
                Report on Instagram
              </Link>
            </Text>
            <ul className={styles.list}>
              <li>You’ll get a confirmation</li>
              <li>Instagram reviews each case</li>
            </ul>
          </div>
  
          {/* TikTok */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <ShieldError24Regular fontSize={32} />
            </div>
            <div className={styles.cardTitle}>TikTok</div>
            <Text>
              Flag videos, comments, or profiles that feel harmful or unsafe.
              <br />
              <Link
                className={styles.link}
                href="https://support.tiktok.com/"
                target="_blank"
              >
                Report on TikTok
              </Link>
            </Text>
            <ul className={styles.list}>
              <li>You’ll be notified after action</li>
              <li>TikTok may remove content</li>
            </ul>
          </div>
  
          {/* Snapchat */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <Mail24Regular fontSize={32} />
            </div>
            <div className={styles.cardTitle}>Snapchat</div>
            <Text>
              Report snaps, chats, or stories directly from the app.
              <br />
              <Link
                className={styles.link}
                href="https://support.snapchat.com/"
                target="_blank"
              >
                Report on Snapchat
              </Link>
            </Text>
            <ul className={styles.list}>
              <li>Snap’s Trust & Safety team reviews fast</li>
              <li>Serious cases may involve legal action</li>
            </ul>
          </div>
  
          {/* Discord */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <ShieldError24Regular fontSize={32} />
            </div>
            <div className={styles.cardTitle}>Discord</div>
            <Text>
              Report abusive messages or servers directly to Discord Trust & Safety.
              <br />
              <Link
                className={styles.link}
                href="https://discord.com/safety"
                target="_blank"
              >
                Get help via eSafety
              </Link>
            </Text>
            <ul className={styles.list}>
              <li>Visit: esafety.gov.au</li>
              <li>Legal reporting tools for serious cases</li>
            </ul>
          </div>
  
          {/* Kids Helpline */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <Call24Regular fontSize={32} />
            </div>
            <div className={styles.cardTitle}>Kids Helpline</div>
            <Text>
              Call: 1800 55 1800 (24/7)
              <br />
              Chat:{" "}
              <Link
                className={styles.link}
                href="https://kidshelpline.com.au"
                target="_blank"
              >
                kidshelpline.com.au
              </Link>
            </Text>
            <ul className={styles.list}>
              <li>Free, private, and 100% for young people</li>
            </ul>
          </div>
  
          {/* Safety Commissioner */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <Mail24Regular fontSize={32} />
            </div>
            <div className={styles.cardTitle}>Safety Commissioner</div>
            <Text>
              Visit:{" "}
              <Link
                className={styles.link}
                href="https://esafety.gov.au"
                target="_blank"
              >
                esafety.gov.au
              </Link>
            </Text>
            <ul className={styles.list}>
              <li>Support and investigate cyberbullying</li>
              <li>Help with image-based abuse</li>
              <li>Legal tools for serious cases</li>
            </ul>
          </div>
        </div>
  
        <div className={styles.backWrapper}>
          <BSNavLink text="Go Back to Resources" route="/bs-resource" back />
        </div>
      </div>
    );
  };
  
  export default BSReport;
  