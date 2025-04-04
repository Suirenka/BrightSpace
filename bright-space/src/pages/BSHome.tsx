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

const useResourceStyles = makeStyles({
  card: {
    margin: "auto",
    width: "70%",
    ...shorthands.padding("1rem"),
    marginTop: "2rem",
    padding: "2rem",
    boxShadow: `0 2px 8px ${tokens.colorNeutralShadowKeyDarker}`,
    borderRadius: "8px",
  },
  resourceTitle: {
    marginBottom: "0.5rem",
  },
  cardBody: {
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

export const BSHome = () => {
  return (
    <>
      <BSBanner />
      <ResourceCard />
    </>
  );
};

const ResourceCard = () => {
  const styles = useResourceStyles();
  const navigate = useNavigate();

  return (
    <BSCard givenStyles={styles}>
      <BSCardHeader>
        <Title1 className={styles.resourceTitle}>
          Digital Citizenship Resources for Teens
        </Title1>
      </BSCardHeader>
      <BSCardBody givenStyles={styles}>
        <div className={styles.cardBody}>
          <div className={styles.leftColumn}>
            <Text className={styles.text}>
              Find the tools and tips you need to navigate the online world safely and responsibly.
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

export default BSHome;
