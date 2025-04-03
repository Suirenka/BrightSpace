import BSCard from "../../components/BSCard/BSCard";
import BSCardBody from "../../components/BSCard/BSCardBody";
import BSCardHeader from "../../components/BSCard/BSCardHeader";
import BSCardFooter from "../../components/BSCard/BSCardFooter";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    marginTop: "2rem",
    width: "800px",
    maxWidth: "90%",
    padding: "2rem",
  },
});

const BSContact = () => {
  const contactStyle = useStyles();
  return (
    <BSCard givenStyles={contactStyle}>
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
