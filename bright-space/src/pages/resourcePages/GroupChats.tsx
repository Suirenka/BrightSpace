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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2.5rem",
    paddingBottom: "4rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
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

const GroupChats = () => {
  const styles = useStyles();

  return (
    <div className={styles.pageWrapper}>
      <Title1 className={styles.title}>When It Happens in Group Chats</Title1>
      <Subtitle2 className={styles.subtitle}>
        What to do when the whole vibe goes toxic.
      </Subtitle2>

      <div className={styles.section}>
        <Text className={styles.paragraph}>
          If a group chat starts to feel negative or toxic, take a step back. You
          don’t have to stay in a conversation that makes you uncomfortable.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.paragraph}>
          Try to redirect the conversation or send a private message to someone
          you trust in the group. If the chat continues to be hostile, you can
          mute, leave, or report it—especially if bullying is involved.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.paragraph}>
          If you're feeling overwhelmed, talk to a friend or adult you trust.
          Group dynamics can be tricky, and it's okay to remove yourself from a
          situation that doesn't feel safe.
        </Text>
      </div>

      <div className={styles.backLink}>
        <BSNavLink text={"Go Back to Resources"} route={"/bs-resource"} back={true} />
      </div>
    </div>
  );
};

export default GroupChats;