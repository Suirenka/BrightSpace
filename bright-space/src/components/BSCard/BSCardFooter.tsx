import { Text, CardFooter, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  cardFooter: {
    borderTop: "1px solid var(--colorNeutralStroke1)",
    paddingTop: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
    color: "var(--colorNeutralForeground3)",
  },
});

interface BSCardFooterProps {
  children: React.ReactNode;
  givenStyles?: Record<string, string>;
}

const BSCardFooter = ({ children, givenStyles }: BSCardFooterProps) => {
  const defaultCardStyles = useStyles();
  const styles = givenStyles ? givenStyles : defaultCardStyles;
  return <CardFooter className={styles.cardFooter}>{children}</CardFooter>;
};

export default BSCardFooter;
