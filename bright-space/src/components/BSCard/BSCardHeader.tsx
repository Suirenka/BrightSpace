import {
  CardHeader,
  Body1,
  Text,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    borderBottom: "1px solid var(--colorNeutralStroke1)",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
});

interface BSCardHeaderProps {
  children: React.ReactNode;
}

const BSCardHeader = ({ children }: BSCardHeaderProps) => {
  const styles = useStyles();
  return (
    <CardHeader
      className={styles.header}
      header={
        <Text as="h1" weight="semibold" size={600}>
          {children}
        </Text>
      }
    />
  );
};

export default BSCardHeader;
