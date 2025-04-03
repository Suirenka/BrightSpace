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
  givenStyles?: Record<string, string>;
}
const BSCardPreview = ({ children, givenStyles }: BSCardProps) => {
  const defaultCardStyles = useStyles();
  const styles = givenStyles ? givenStyles : defaultCardStyles;
  return <CardPreview className={styles.cardPreview}>{children}</CardPreview>;
};

export default BSCardPreview;
