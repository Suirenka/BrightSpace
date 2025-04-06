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
  givenCardBodyStyle?: string;
}

const BSCardBody = ({ children, givenCardBodyStyle }: BSCardProps) => {
  const defaultCardStyles = useStyles();
  const cardBodyStyle = givenCardBodyStyle
    ? givenCardBodyStyle
    : defaultCardStyles.cardBody;
  return <Body1 className={cardBodyStyle}>{children}</Body1>;
};

export default BSCardBody;
