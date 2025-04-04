import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle2,
  Text,
} from "@fluentui/react-components";
import {
  ShieldCheckmark24Regular,
  PeopleTeam24Regular,
  Alert24Regular,
  Chat24Regular,
} from "@fluentui/react-icons";
import BSNavLink from "../components/BSLinks/BSNavLink";

const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: tokens.colorNeutralForeground3,
    marginBottom: "2rem",
    lineHeight: "1.6",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  },
  card: {
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    textAlign: "center",
  },
  icon: {
    marginBottom: "0.75rem",
    color: tokens.colorBrandForeground1,
    fontSize: "32px",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: "0.4rem",
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: tokens.colorNeutralForeground3,
  },
  navWrapper: {
    marginTop: "3rem",
    textAlign: "center",
  },
});

const resourceCards = [
  {
    icon: <Alert24Regular fontSize={32} />,
    title: "Spotting Cyberbullying",
    desc: "Know the signs before it gets worse.",
  },
  {
    icon: <ShieldCheckmark24Regular fontSize={32} />,
    title: "What To Do If You’re Targeted",
    desc: "Step-by-step actions to protect yourself.",
  },
  {
    icon: <PeopleTeam24Regular fontSize={32} />,
    title: "Helping a Friend",
    desc: "Be the reason someone feels safe again.",
  },
  {
    icon: <Chat24Regular fontSize={32} />,
    title: "When It Happens in Group Chats",
    desc: "What to do when the whole vibe goes toxic.",
  },
];

const BSResource = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Title1 className={styles.title}>Digital Citizenship Resources</Title1>
      

      <div className={styles.grid}>
        {resourceCards.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.cardTitle}>{item.title}</div>
            <div className={styles.cardDesc}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div className={styles.navWrapper}>
        <BSNavLink text={"Go Back to Home"} route={"/"} back={true} />
      </div>
    </div>
  );
};

export default BSResource;
