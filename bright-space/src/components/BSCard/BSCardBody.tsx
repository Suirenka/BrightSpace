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
  body: {
    marginBottom: "1rem",
    lineHeight: 1.5,
    padding: "20px",
  },
});

interface BSCardProps {
  fontSize?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
  children: React.ReactNode;
}

const BSCardBody = ({ children, fontSize = 400 }: BSCardProps) => {
  const styles = useStyles();
  return <CardPreview className={styles.body}>{children}</CardPreview>;
};

export default BSCardBody;
