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

const useStyles = makeStyles({
  cardPreview: {
    marginBottom: "1rem",
    padding: "1rem",
  },
});

interface BSCardProps {
  children: React.ReactNode;
  givenCardPreviewStyles?: string;
}
const BSCardPreview = ({ children, givenCardPreviewStyles }: BSCardProps) => {
  const defaultCardStyles = useStyles();
  const cardPreviewStyle = givenCardPreviewStyles
    ? givenCardPreviewStyles
    : defaultCardStyles.cardPreview;
  return <CardPreview className={cardPreviewStyle}>{children}</CardPreview>;
};

export default BSCardPreview;
