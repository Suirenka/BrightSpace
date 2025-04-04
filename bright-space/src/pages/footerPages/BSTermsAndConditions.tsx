import React from "react";
import BSCard from "../../components/BSCard/BSCard";
import BSCardHeader from "../../components/BSCard/BSCardHeader";
import BSCardBody from "../../components/BSCard/BSCardBody";
import { Text, tokens } from "@fluentui/react-components";

const BSTermsAndCondition = () => {
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
      <BSCardHeader>Terms and Conditions</BSCardHeader>
      <BSCardBody>
        <Text as="p" size={400} style={{ ...paragraphStyle, fontStyle: "italic" }}>
          Last Updated: April 2025
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          1. Welcome to BrightSpace
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          By accessing or using BrightSpace, you agree to follow these terms. BrightSpace is a safe space for teens and young people to explore digital wellbeing and kindness.
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          2. Using BrightSpace Responsibly
        </Text>
        <ul style={listStyle}>
          <li>
            <Text as="p" size={400}>
              You can use BrightSpace for personal, non-commercial use only.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              Do not misuse the platform, post harmful content, or attempt to disrupt services.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              All content is for general educational purposes and should not replace professional health or medical advice.
            </Text>
          </li>
        </ul>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          3. Limitations and Disclaimer
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          We aim to provide helpful tools and support, but please understand:
        </Text>
        <ul style={listStyle}>
          <li>
            <Text as="p" size={400}>
              BrightSpace is not a substitute for therapy or medical guidance.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              Some content may rely on external sources and may not always be 100% accurate.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              There may occasionally be interruptions or technical errors.
            </Text>
          </li>
        </ul>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          4. Privacy and Data
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          We collect minimal data to make BrightSpace useful and safe. No personal data is ever sold. Please see our Privacy Policy for more details.
        </Text>

        <Text as="h2" weight="semibold" size={500} style={sectionTitleStyle}>
          5. Updates to These Terms
        </Text>
        <Text as="p" size={400} style={paragraphStyle}>
          We may update these terms occasionally. Continued use of BrightSpace means you accept the latest version.
        </Text>
      </BSCardBody>
    </BSCard>
  );
};

export default BSTermsAndCondition;