import { Text } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>
        {/* <Link to="/contact">Contact Us</Link>
        <Link to="/terms-and-condition">Terms and Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link> */}
      </div>
      <Text as="p" size={200}>
        &copy; {new Date().getFullYear()} Bright Space
      </Text>
    </footer>
  );
};

export default Footer;
