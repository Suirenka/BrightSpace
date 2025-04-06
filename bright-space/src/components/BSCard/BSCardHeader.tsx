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
  givenCardHeaderStyles?: string;
}

const BSCardHeader = ({
  children,
  givenCardHeaderStyles,
}: BSCardHeaderProps) => {
  const defaultCardStyles = useStyles();
  const cardHeaderStyle = givenCardHeaderStyles
    ? givenCardHeaderStyles
    : defaultCardStyles.cardHeader;
  return (
    <CardHeader
      className={cardHeaderStyle}
      header={
        <Text as="h1" weight="semibold" size={600}>
          {children}
        </Text>
      }
    />
  );
};

export default BSCardHeader;
