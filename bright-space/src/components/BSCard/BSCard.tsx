import {
  Card,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "70%",
    padding: "2rem",
    marginTop: "2rem",
    marginBottom: "2rem",
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

interface BSCardProps {
  children: React.ReactNode;
  givenCardStyle?: string;
}

const BSCard = ({ children, givenCardStyle }: BSCardProps) => {
  const defaultCardStyles = useStyles();
  const cardStyle = givenCardStyle ? givenCardStyle : defaultCardStyles.card;
  return <Card className={cardStyle}>{children}</Card>;
};

export default BSCard;
