import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle1,
  Text,
} from "@fluentui/react-components";
import BSNavLink from "../../components/BSLinks/BSNavLink";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2.5rem",
    paddingBottom: "4rem",
    ...shorthands.padding("2rem"),
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "0.75rem",
  },
  intro: {
    fontSize: "1.1rem",
    color: tokens.colorNeutralForeground3,
    marginBottom: "2.5rem",
    lineHeight: "1.8",
    textAlign: "center",
    maxWidth: "700px",
  },
  section: {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.8rem",
    maxWidth: "750px",
    width: "100%",
    boxShadow: tokens.shadow4,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: tokens.shadow16,
      cursor: "pointer",
    },
  },
  
  subtitle: {
    fontWeight: "600",
    fontSize: "1.2rem",
    marginBottom: "0.75rem",
  },
  list: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
    margin: 0,
    paddingLeft: "1.2rem",
  },
  paragraph: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
  },
  back: {
    marginTop: "3rem",
    textAlign: "center",
  },
});

const SpottingCyberbullying = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Title1 className={styles.title}>Spotting Cyberbullying</Title1>
      <Text className={styles.intro}>
        Not all bullying online looks like bullying. Sometimes it’s disguised as
        a joke — but that doesn’t make it okay.
      </Text>

      <div className={styles.section}>
        <Subtitle1 className={styles.subtitle}>🔍 Common Signs</Subtitle1>
        <ul className={styles.list}>
          <li>Repeated mean or sarcastic comments</li>
          <li>Being left out of group chats on purpose</li>
          <li>Fake accounts mocking you or your friends</li>
          <li>Screenshots of your messages or posts shared without consent</li>
        </ul>
      </div>

      <div className={styles.section}>
        <Subtitle1 className={styles.subtitle}>📍 Where it Happens: </Subtitle1>
        <Text className={styles.paragraph}>
          Instagram, TikTok, Snapchat, Discord, group chats, gaming voice channels — bullying can happen anywhere people interact online.
        </Text>
      </div>

      <div className={styles.section}>
        <Subtitle1 className={styles.subtitle}>💡 What You Can Do</Subtitle1>
        <ul className={styles.list}>
          <li>Block the person</li>
          <li>Screenshot and save evidence</li>
          <li>Report the post or comment</li>
          <li>Talk to someone you trust</li>
          <li>If it’s happening to someone else — check in with them</li>
        </ul>
      </div>

      <div className={styles.section}>
        <Subtitle1 className={styles.subtitle}>📌 Reminder: </Subtitle1>
        <Text className={styles.paragraph}>
          You don’t have to fix everything — just being able to spot when something feels off is a powerful first step.
        </Text>
      </div>

      <div className={styles.back}>
        <BSNavLink
          text={"Go Back to Resources"}
          route={"/bs-resource"}
          back={true}
        />
      </div>
    </div>
  );
};

export default SpottingCyberbullying;