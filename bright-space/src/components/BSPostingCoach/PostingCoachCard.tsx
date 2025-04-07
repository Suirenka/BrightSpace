import { makeStyles, Title1 } from "@fluentui/react-components";
import exp from "constants";
import BSCard from "../BSCard/BSCard";
import BSCardBody from "../BSCard/BSCardBody";
import BSCardFooter from "../BSCard/BSCardFooter";
import BSCardHeader from "../BSCard/BSCardHeader";
import BSNavLink from "../BSLinks/BSNavLink";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "70%",
    padding: "2rem",
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
    justifyContent: "space-between",
    gap: "2rem",
    alignItems: "flex-start",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  text: {
    marginBottom: "1rem",
    lineHeight: "1.6",
  },
  button: {
    alignSelf: "flex-start",
  },
  resourceImage: {
    width: "200px",
    height: "200px",
  },
});

export const PostingCoachCard = () => {
  const styles = useStyles();

  return (
    <BSCard givenCardStyle={styles.card}>
      <BSCardHeader>
        <Title1 className={styles.resourceTitle}>
          Intentional Posting Coach
        </Title1>
      </BSCardHeader>

      <BSCardBody givenCardBodyStyle={styles.resourceCardBody}>
        <PostingCoachCardContent />
      </BSCardBody>
      <BSCardFooter>
        <BSNavLink text={"Try the Posting Coach"} route={"/bs-posting-coach"} />
      </BSCardFooter>
    </BSCard>
  );
};

const PostingCoachCardContent = () => {
  const styles = useStyles();

  return (
    <div className={styles.leftColumn}>
      <p className={styles.text}>
        The Posting Coach is a tool designed to help teens navigate the
        complexities of online communication. It provides guidance on how to
        express themselves effectively and respectfully in various digital
        contexts.
      </p>
    </div>
  );
};

export default PostingCoachCard;
