import React from "react";
import BSCard from "../../components/BSCard/BSCard";
import BSCardHeader from "../../components/BSCard/BSCardHeader";
import BSCardBody from "../../components/BSCard/BSCardBody";
import { Text, tokens } from "@fluentui/react-components";

const BSPrivacy = () => {
  const sectionTitleStyle = {
    marginTop: "2rem",
    marginBottom: "0.75rem",
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
    paddingLeft: "0.6rem",
    color: tokens.colorNeutralForeground1,
  };

  const paragraphStyle = {
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.75",
    marginBottom: "1rem",
  };

  const listStyle = {
    paddingLeft: "1.5rem",
    marginTop: "0.5rem",
    marginBottom: "1.25rem",
    lineHeight: "1.7",
    color: tokens.colorNeutralForeground2,
  };

  return (
    <BSCard>
      <BSCardHeader>Privacy Policy</BSCardHeader>
      <BSCardBody>
        <Text as="p" size={400} style={{ ...paragraphStyle, fontStyle: "italic" }}>
          Last Updated: April 2025
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          1. About BrightSpace
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          BrightSpace is built for teens and young people who want to build a healthier, kinder digital life. Your privacy and safety are our top priorities.
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          2. What We Collect (And Why)
        </Text>
        <ul style={listStyle}>
          <li>
            <Text as="p" size={400}>
              <strong>Emotional Check-ins:</strong> We store your daily reflections to help you track mood patterns.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              <strong>Kindness Actions:</strong> We log your positive actions to celebrate and encourage growth.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              <strong>Anonymous Submissions:</strong> You can send anonymous support or notes. We never store identity.
            </Text>
          </li>
        </ul>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          3. What We Do NOT Collect
        </Text>
        <ul style={listStyle}>
          <li>
            <Text as="p" size={400}>No real names or email addresses unless you choose to provide them.</Text>
          </li>
          <li>
            <Text as="p" size={400}>No tracking across other apps or websites.</Text>
          </li>
          <li>
            <Text as="p" size={400}>No ads. No selling of your data.</Text>
          </li>
        </ul>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          4. Your Choices
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          You can review, edit, or delete your information at any time. All features are optional and designed for your comfort and safety.
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          5. For Parents & Guardians
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          BrightSpace is a platform for youth aged 13+. If you're a parent or guardian and have concerns about your child’s data, please contact us — we’re here to help.
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          6. Staying Safe
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          We use secure servers, encrypted storage, and never store anything that isn’t essential. BrightSpace is a judgment-free space.
        </Text>
      </BSCardBody>
    </BSCard>
  );
};

export default BSPrivacy;