import { Card, makeStyles, shorthands } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    maxWidth: "800px",
    width: "90%",
    minHeight: "65vh",
    ...shorthands.padding("1rem"),
    marginTop: "2rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
});

interface BSCardProps {
  children: React.ReactNode;
}

const BSCard = ({ children }: BSCardProps) => {
  const styles = useStyles();
  return <Card className={styles.card}>{children}</Card>;
};

export default BSCard;
