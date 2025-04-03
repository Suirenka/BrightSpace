import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const BSNavButton = ({ text, route }: { text: string; route: string }) => {
  const navigate = useNavigate();
  return (
    <Button appearance="primary" onClick={() => navigate(route)}>
      {text}
    </Button>
  );
};

export default BSNavButton;
