import { Text, CardFooter, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  footer: {
    borderTop: "1px solid var(--colorNeutralStroke1)",
    paddingTop: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
    color: "var(--colorNeutralForeground3)",
  },
});

interface BSCardFooterProps {
  children: React.ReactNode;
}

const BSCardFooter = ({ children }: BSCardFooterProps) => {
  const styles = useStyles();
  return <CardFooter className={styles.footer}>{children}</CardFooter>;
};

export default BSCardFooter;
