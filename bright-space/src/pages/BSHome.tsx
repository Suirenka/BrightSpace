// src/pages/BSHome.tsx
import * as React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Text,
  Button,
  Image,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BSCard from "../components/BSCard/BSCard";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardFooter from "../components/BSCard/BSCardFooter";
import ResourceImage from "../assets/images/home/Resource.png";
import BSBanner from "../components/BSBanner";
import PostingCoachCard from "../components/BSPostingCoach/PostingCoachCard";

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

const BSHome = () => {
  return (
    <>
      <BSBanner />
      <ResourceCard />
      <PostingCoachCard />
    </>
  );
};

const ResourceCard = () => {
  const styles = useStyles();

  return (
    <BSCard givenCardStyle={styles.card}>
      <BSCardHeader>
        <Title1 className={styles.resourceTitle}>
          Digital Citizenship Resources for Teens
        </Title1>
      </BSCardHeader>

      <BSCardBody givenCardBodyStyle={styles.resourceCardBody}>
        <ResourceCardContent />
      </BSCardBody>
      <BSCardFooter>
        <BSNavLink
          text={"Learn More about the resources"}
          route={"/bs-resource"}
        />
      </BSCardFooter>
    </BSCard>
  );
};

const ResourceCardContent = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.resourceCardBody}>
      <div className={styles.leftColumn}>
        <Text className={styles.text}>
          Find the tools and tips you need to navigate the online world safely
          and responsibly.
        </Text>

        <Button
          className={styles.button}
          appearance="primary"
          onClick={() => navigate("/bs-staysafe")}
        >
          Tools →
        </Button>
      </div>
      <Image className={styles.resourceImage} src={ResourceImage} />
    </div>
  );
};

export default BSHome;
