// By fluent's design, please avoid use button to navigate
// Only use if you really want to use button :)
// just put the use of button here for future reference
import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { ArrowExit20Regular } from "@fluentui/react-icons";

const BSNavButton = ({ text, route }: { text: string; route: string }) => {
  const navigate = useNavigate();
  return (
    <Button icon={<ArrowExit20Regular />} onClick={() => navigate(route)}>
      {text}
    </Button>
  );
};

export default BSNavButton;
