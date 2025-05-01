// By fluent's design, please avoid use button to navigate
// Only use if you really want to use button :)
// just put the use of button here for future reference
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { ArrowExit20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "fit-content",

    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

const BSNavButton = ({ text, route }: { text: string; route: string }) => {
  const navigate = useNavigate();
  const styles = useStyles();
  return (
    <Button
      className={styles.button}
      icon={<ArrowExit20Regular />}
      onClick={() => navigate(route)}
    >
      {text}
    </Button>
  );
};

export default BSNavButton;
