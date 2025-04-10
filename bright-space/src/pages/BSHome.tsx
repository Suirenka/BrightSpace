import * as React from "react";
import {
  makeStyles,
  Title1,
  Text,
  Image,
} from "@fluentui/react-components";
import { mergeClasses } from "@fluentui/react-components";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BSCard from "../components/BSCard/BSCard";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardFooter from "../components/BSCard/BSCardFooter";
import BSBanner from "../components/BSBanner";
import ResourceImage from "../assets/images/home/Resource.png";
import PostingCoachImage from "../assets/images/home/Coach.png";

const useStyles = makeStyles({
  card: {
    margin: "2rem auto",
    width: "70%",
    padding: "2rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
  },
  sectionBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  image: {
    maxWidth: "240px",
    height: "auto",
    width: "auto", 
    borderRadius: "8px",
    objectFit: "contain",
  },
  centeredTitle: {
    textAlign: "center",
  },
  description: {
    fontSize: "1rem",
    lineHeight: "1.6",
  },
});

const BSHome = () => {
  return (
    <>
      <BSBanner />
      <InfoSection
        title="Digital Citizenship Resources for Teens"
        description="Find the tools and tips you need to navigate the online world safely and responsibly."
        linkText="Learn More about the resources"
        linkTo="/bs-resource"
        image={ResourceImage}
      />
      <InfoSection
        title="Intentional Posting Coach"
        description="The Posting Coach helps teens navigate the complexities of online communication, offering guidance on kind and respectful expression."
        linkText="Try the Posting Coach"
        linkTo="/bs-posting-coach"
        image={PostingCoachImage}
        reverse
      />
    </>
  );
};

type InfoSectionProps = {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  image: string;
  reverse?: boolean;
};

const InfoSection = ({
  title,
  description,
  linkText,
  linkTo,
  image,
  reverse = false,
}: InfoSectionProps) => {
  const styles = useStyles();

  return (
    <BSCard givenCardStyle={styles.card}>
      <BSCardHeader>
        <Title1>{title}</Title1>
      </BSCardHeader>

      <BSCardBody
        givenCardBodyStyle={mergeClasses(
          styles.sectionBody,
          reverse && styles.reverse
        )}
      >
        <div className={styles.content}>
        <Text className={styles.description}>{description}</Text>
          <BSNavLink text={linkText} route={linkTo} />
        </div>
        <Image className={styles.image} src={image} />
      </BSCardBody>

      <BSCardFooter><></></BSCardFooter>
    </BSCard>
  );
};

export default BSHome;
