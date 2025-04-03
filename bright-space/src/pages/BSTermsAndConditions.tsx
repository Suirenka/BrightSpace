import BSCard from "../components/BSCard/BSCard";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardFooter from "../components/BSCard/BSCardFooter";
import { Text } from "@fluentui/react-components";

const BSTermsAndCondition = () => {
  return (
    <BSCard>
      <BSCardHeader>Terms and Conditions</BSCardHeader>
      <BSCardBody>
        <Text as="p" size={400}>
          Last Updated: March 2025
        </Text>

        <Text
          as="h2"
          weight="semibold"
          size={500}
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          1. Introduction
        </Text>
        <Text as="p" size={400}>
          Welcome to SunShield. By accessing or using our services, you agree to
          be bound by the following Terms and Conditions.
        </Text>

        <Text
          as="h2"
          weight="semibold"
          size={500}
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          2. Use of Services
        </Text>
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          <li>
            <Text as="p" size={400}>
              You may use SunShield for personal, non-commercial purposes.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              Misuse, modification, or disruption of the service is strictly
              prohibited.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              SunShield provides general sun protection advice, but it should
              not be considered as medical advice.
            </Text>
          </li>
        </ul>

        <Text
          as="h2"
          weight="semibold"
          size={500}
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          3. Limitation of Liability
        </Text>
        <Text as="p" size={400}>
          While we strive to provide accurate UV index data and recommendations,
          SunShield is not responsible for:
        </Text>
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          <li>
            <Text as="p" size={400}>
              Any health-related outcomes resulting from sun exposure.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              Inaccuracies in UV data provided by third-party sources.
            </Text>
          </li>
          <li>
            <Text as="p" size={400}>
              Service interruptions or technical errors.
            </Text>
          </li>
        </ul>

        <Text
          as="h2"
          weight="semibold"
          size={500}
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          4. Privacy and Data Collection
        </Text>
        <Text as="p" size={400}>
          Your privacy is important to us. By using our services, you agree to
          the collection and usage of data as outlined in our Privacy Policy.
        </Text>

        <Text
          as="h2"
          weight="semibold"
          size={500}
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          5. Changes to Terms
        </Text>
        <Text as="p" size={400}>
          We reserve the right to update these Terms and Conditions at any time.
          Continued use of our services after updates constitutes acceptance of
          the changes.
        </Text>
      </BSCardBody>
    </BSCard>
  );
};

export default BSTermsAndCondition;
