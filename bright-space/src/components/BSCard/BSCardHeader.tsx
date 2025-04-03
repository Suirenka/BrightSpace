import {
  CardHeader,
  Body1,
  Text,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  cardHeader: {
    borderBottom: "1px solid var(--colorNeutralStroke1)",
    paddingBottom: "0.5rem",
  },
});

interface BSCardHeaderProps {
  children: React.ReactNode;
  givenStyles?: Record<string, string>;
}

const BSCardHeader = ({ children, givenStyles }: BSCardHeaderProps) => {
  const defaultCardStyles = useStyles();
  const styles = givenStyles ? givenStyles : defaultCardStyles;
  return (
    <CardHeader
      className={styles.cardHeader}
      header={
        <Text as="h1" weight="semibold" size={600}>
          {children}
        </Text>
      }
    />
  );
};

export default BSCardHeader;
