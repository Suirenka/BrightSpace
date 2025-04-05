// Sample Page
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle1,
  Text,
  Image,
  CardHeader,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import BSCard from "../components/BSCard/BSCard";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BSCardFooter from "../components/BSCard/BSCardFooter";

const useStyles = makeStyles({
  Container: {
    backgroundImage: "url('/sunset_bg.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("20px"),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  title: {
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  subtitle: {
    maxWidth: "600px",
    margin: "0 auto",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  locationContainer: {
    ...shorthands.padding("2rem"),
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading2: {
    marginBottom: "1rem",
  },
  paragraph: {
    marginBottom: "1.5rem",
  },
  locationBoxWrapper: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  infoSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    ...shorthands.gap("1rem"),
    ...shorthands.padding("2rem"),
    "@media(max-width: 768px)": {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  leftColumn: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  risksParagraph: {
    marginBottom: "1rem",
    maxWidth: "500px",
  },
  intro: {
    marginTop: "1rem",
    maxWidth: "500px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  card: {
    margin: "auto",
    width: "90%",
    ...shorthands.padding("1rem"),
    marginTop: "2rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
});

const useResourceStyles = makeStyles({
  card: {
    margin: "auto",
    width: "70%",
    ...shorthands.padding("1rem"),
    marginTop: "2rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  resourceTitle: {
    marginBottom: "0.5rem",
  },
  resourceCardBody: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "1.5rem",
  },
  cardBody: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "1.5rem",
  },
  resourceImage: {
    width: "200px",
    height: "200px",
  },
});

export const BSHome = () => {
  return (
    <>
      <ResourceCard />
    </>
  );
};

const ResourceCard = () => {
  const styles = useResourceStyles();
  const navigate = useNavigate();
  return (
    <BSCard givenCardStyle={styles.card}>
      <BSCardHeader>Title</BSCardHeader>
      <BSCardBody givenCardBodyStyle={styles.cardBody}>
        <CardContent />
      </BSCardBody>
      <BSCardFooter>
        <BSNavLink text={"Go Back to Home"} route={"/"} back={true} />
      </BSCardFooter>
    </BSCard>
  );
};

const CardContent = () => {
  const styles = useResourceStyles();
  return (
    <>
      <Text>Description.</Text>
    </>
  );
};
export default BSHome;
