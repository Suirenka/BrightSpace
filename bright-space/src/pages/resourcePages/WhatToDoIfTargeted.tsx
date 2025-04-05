import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle2,
  Text,
} from "@fluentui/react-components";
import BSNavLink from "../../components/BSLinks/BSNavLink";

const useStyles = makeStyles({
  pageWrapper: {
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
  subtitle: {
    fontSize: "1.1rem",
    maxWidth: "750px",
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    marginBottom: "2.5rem",
    lineHeight: "1.7",
  },
  section: {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.8rem",
    maxWidth: "750px",
    width: "100%",
    boxShadow: tokens.shadow4,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: "1.15rem",
    marginBottom: "0.6rem",
  },
  paragraph: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
  },
  backLink: {
    textAlign: "center",
    marginTop: "2.5rem",
  },
});

const WhatToDoIfTargeted = () => {
  const styles = useStyles();

  return (
    <div className={styles.pageWrapper}>
      <Title1 className={styles.title}>What To Do If You’re Targeted</Title1>
      <Subtitle2 className={styles.subtitle}>
        Step-by-step actions to protect yourself if you're experiencing online harassment.
      </Subtitle2>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>1. 🧘 Stay Calm</Text>
        <Text className={styles.paragraph}>
          It’s normal to feel upset, but try to remain calm and composed. Don’t respond immediately to hurtful comments.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>2. 🚫 Don’t Engage</Text>
        <Text className={styles.paragraph}>
          Avoid replying or retaliating. Responding may escalate the situation or encourage further bullying.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>3. 🚷 Block and Report</Text>
        <Text className={styles.paragraph}>
          Use the platform’s tools to block the bully and report their behavior. This helps platforms take action.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>4. 📸 Save the Evidence</Text>
        <Text className={styles.paragraph}>
          Take screenshots or save messages that contain abusive content in case they are needed for reports or investigations.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>5. 🗣️ Talk to Someone</Text>
        <Text className={styles.paragraph}>
          You don’t have to deal with it alone. Reach out to a trusted adult, teacher, friend, or support service.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>6. 🛡️ Report to Authorities (if serious)</Text>
        <Text className={styles.paragraph}>
          If the behavior is threatening or illegal, contact local authorities or school officials.
        </Text>
      </div>

      <div className={styles.backLink}>
        <BSNavLink text={"Go Back to Resources"} route={"/bs-resource"} back={true} />
      </div>
    </div>
  );
};

export default WhatToDoIfTargeted;
