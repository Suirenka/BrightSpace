import BSCard from "../components/BSCard/BSCard";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSCardFooter from "../components/BSCard/BSCardFooter";

const BSContact = () => {
  return (
    <BSCard>
      <BSCardHeader>Contact Us</BSCardHeader>
      <BSCardBody>
        If you have any questions or concerns, please contact us at:
        <br />
        <strong>📧 Email:</strong> support@brightspace.com
        <br />
        <strong>📍 Address:</strong> 123 Brightspace Avenue, Melbourne,
        Australia
      </BSCardBody>
      <BSCardFooter> We look forward to hearing from you! </BSCardFooter>
    </BSCard>
  );
};

export default BSContact;
