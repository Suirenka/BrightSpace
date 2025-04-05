import * as React from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle1,
  Text,
  Button,
  Image,
  Divider,
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
    padding: "2rem",
    marginTop: "2rem",
    boxShadow: `0 2px 8px ${tokens.colorNeutralShadowKeyDarker}`,
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
    justifyContent: "space-between",
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
      <BSBanner />
      <ResourceCard />
    </>
  );
};

const ResourceCard = () => {
  const styles = useResourceStyles();
  const navigate = useNavigate();
  return (
    <BSCard givenCardStyle={styles.card}>
      <BSCardHeader>
        <Title1 className={styles.resourceTitle}>
          Digital Citizenship Resources for Teens
        </Title1>
      </BSCardHeader>
      <BSCardBody givenCardBodyStyle={styles.cardBody}>
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
  const styles = useResourceStyles();
  return (
    <>
      <Text>
        Find the tools and tips you need to navigate the online world safely and
        responsibly.
      </Text>
      <Image className={styles.resourceImage} src={ResourceImage} />
    </>
  );
};
export default BSHome;
