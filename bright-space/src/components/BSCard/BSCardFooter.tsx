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
  givenCardFooterStyles?: string;
}

const BSCardFooter = ({
  children,
  givenCardFooterStyles,
}: BSCardFooterProps) => {
  const defaultCardStyles = useStyles();
  const cardFooterStyle = givenCardFooterStyles
    ? givenCardFooterStyles
    : defaultCardStyles.cardFooter;
  return <CardFooter className={cardFooterStyle}>{children}</CardFooter>;
};

export default BSCardFooter;
