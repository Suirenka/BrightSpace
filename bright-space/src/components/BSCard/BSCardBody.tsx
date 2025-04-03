import {
  Text,
  Card,
  CardHeader,
  CardFooter,
  CardPreview,
  Body1,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { typographyStyles } from "@fluentui/react-theme";

const useStyles = makeStyles({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.5rem",
  },
});

interface BSCardProps {
  children: React.ReactNode;
  givenStyles?: Record<string, string>;
}

const BSCardBody = ({ children, givenStyles }: BSCardProps) => {
  const defaultCardStyles = useStyles();
  const styles = givenStyles ? givenStyles : defaultCardStyles;
  return <Body1 className={styles.cardBody}>{children}</Body1>;
};

export default BSCardBody;
