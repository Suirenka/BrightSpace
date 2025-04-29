// Sample Page
import { makeStyles, shorthands, Text } from "@fluentui/react-components";
import BSCard from "../components/BSCard/BSCard";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BSCardFooter from "../components/BSCard/BSCardFooter";

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
  return (
    <>
      <Text>Description.</Text>
    </>
  );
};
export default BSHome;
