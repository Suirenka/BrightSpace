import {
  makeStyles,
  tokens,
  Title1,
  Subtitle2,
} from "@fluentui/react-components";
import {
  ShieldCheckmark24Regular,
  PeopleTeam24Regular,
  Alert24Regular,
  Chat24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import BSNavLink from "../components/BSLinks/BSNavLink";
import ReportImage from "../assets/images/home/ReportImage.png";
import BackToTopButton from "../components/BackToTopButton";

const useStyles = makeStyles({
  container: {
    minHeight: "500px",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingTop: "3rem",
    paddingBottom: "8rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: tokens.colorCompoundBrandBackgroundHover,
    textAlign: "center",
  },
  subtitleNote: {
    color: tokens.colorNeutralForeground3,
    fontSize: "2rem",
    lineHeight: "1.6",
  },
  description: {
    fontSize: "1.1rem",
    color: tokens.colorNeutralForeground3,
    marginBottom: "0.5rem",
    lineHeight: "1.6",
  },
  reportLineWrapper: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginTop: "6rem",
  },
  card: {
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
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
  reportSection: {
    marginTop: "10rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    maxWidth: "100%",
    padding: "4rem 2rem",

    "@media (max-width: 900px)": {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  reportImage: {
    maxWidth: "100%",
    width: "50%",
    objectFit: "cover",
    borderRadius: "0",
    boxShadow: "none",
  },
  reportText: {
    width: "50%",
    padding: "0 2rem",
    "@media (max-width: 900px)": {
      width: "100%",
      padding: 0,
    },
  },
  reportTitle: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: tokens.colorNeutralForeground1,
  },
  reportDescription: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground3,
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },
  reportButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "fit-content",

    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

const resourceCards = [
  {
    icon: <Alert24Regular fontSize={32} />,
    title: "Spotting Cyberbullying",
    desc: "Know the signs before it gets worse.",
    route: "/spotting-cyberbullying",
  },
  {
    icon: <ShieldCheckmark24Regular fontSize={32} />,
    title: "What to do if you’re Targeted",
    desc: "Step-by-step actions to protect yourself.",
    route: "/what-to-do-if-targeted",
  },
  {
    icon: <PeopleTeam24Regular fontSize={32} />,
    title: "Helping a Friend",
    desc: "Be the reason someone feels safe again.",
    route: "/help-friends",
  },
  {
    icon: <Chat24Regular fontSize={32} />,
    title: "When it Happens in Group Chats",
    desc: "What to do when the whole vibe goes toxic.",
    route: "/group-chat-guidance",
  },
];

const BSResource = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Title1 className={styles.title}>Stay Safe Online</Title1>

      <div className={styles.subtitleNote}>
        <Subtitle2>
          Try out the interactive scenarios and explore practical guides to help
          you stay safe online, speak up, and support others online.
        </Subtitle2>
      </div>

      <div className={styles.grid}>
        {resourceCards.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => navigate(item.route)}
          >
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
