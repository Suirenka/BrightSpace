import { Card, makeStyles, shorthands } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "70%",
    padding: "2rem",
  },
});

interface BSCardProps {
  children: React.ReactNode;
  givenStyles?: Record<string, string>;
}

const BSCard = ({ children, givenStyles }: BSCardProps) => {
  const defaultCardStyles = useStyles();
  const styles = givenStyles ? givenStyles : defaultCardStyles;
  return <Card className={styles.card}>{children}</Card>;
};

export default BSCard;
