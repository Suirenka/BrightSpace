import { Button } from "@fluentui/react-components";
import { teamsLightTheme, teamsDarkTheme } from "@fluentui/react-components";

interface BSThemeToggleProps {
  currentTheme: typeof teamsLightTheme | typeof teamsDarkTheme;
  onToggle: () => void;
}

const BSThemeToggle = ({ currentTheme, onToggle }: BSThemeToggleProps) => {
  return (
    <Button appearance="primary" onClick={onToggle}>
      {currentTheme === teamsLightTheme ? "Theme: Light" : "Theme: Dark"}
    </Button>
  );
};

export default BSThemeToggle;
