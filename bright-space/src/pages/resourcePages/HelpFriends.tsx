import {
  makeStyles,
  tokens,
  Title1,
  Subtitle2,
  Text,
} from "@fluentui/react-components";
import BSNavLink from "../../components/BSLinks/BSNavLink";

const useStyles = makeStyles({
  pageWrapper: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "2.5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "0.75rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    maxWidth: "700px",
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    marginBottom: "3rem",
    lineHeight: "1.7",
  },
  section: {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    borderRadius: "10px",
    padding: "1.2rem 1.5rem",
    marginBottom: "1.5rem",
    width: "100%",
    boxShadow: tokens.shadow4,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: tokens.shadow16,
      cursor: "pointer",
    },
  },  
  suggestionText: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
  },
  bold: {
    fontWeight: 600,
  },
  backLink: {
    marginTop: "2.5rem",
    textAlign: "center",
  },
});

const HelpFriends = () => {
  const styles = useStyles();

  return (
    <div className={styles.pageWrapper}>
      <Title1 className={styles.title}>Helping a Friend</Title1>
      <Subtitle2 className={styles.subtitle}>
        If you notice a friend being bullied online, your support can make all the difference.
      </Subtitle2>

      <div className={styles.section}>
        <Text className={styles.suggestionText}>
          👥 <span className={styles.bold}>Reach out privately:</span> Let them know you're there for them without putting them on the spot.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.suggestionText}>
          👂 <span className={styles.bold}>Be a listener:</span> Let them talk — don’t interrupt or judge.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.suggestionText}>
          💬 <span className={styles.bold}>Show kindness:</span> Small words of encouragement go a long way.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.suggestionText}>
          🛟 <span className={styles.bold}>Help them get support:</span> Suggest talking to a trusted adult or using a helpline.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.suggestionText}>
          🌟 <span className={styles.bold}>Lead by example:</span> Model respectful behavior online and speak up when needed.
        </Text>
      </div>

      <div className={styles.backLink}>
        <BSNavLink text="Go Back to Resources" route="/bs-resource" back />
      </div>
    </div>
  );
};

export default HelpFriends;
