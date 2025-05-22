import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowCircleLeft20Regular,
  ArrowCircleRight20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  navLink: {
    position: "relative",
    color: tokens.colorNeutralForeground1,
    fontWeight: 600,
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.gap("6px"),
    transition: "color .25s ease",

    ":hover": {
      color: tokens.colorBrandForeground1,
      textDecoration: "none",
    },
  },
});

export interface BSNavLinkProps {
  text: string;
  route: string;
  back?: boolean;
  noArrow?: boolean;
  className?: string;
}

const BSNavLink: React.FC<BSNavLinkProps> = ({
  text,
  route,
  back,
  noArrow,
  className = "",
}) => {
  const s = useStyles();
  const combined = `${s.navLink} ${className}`.trim();

  return (
    <RouterLink to={route} className={combined}>
      {back && !noArrow && <ArrowCircleLeft20Regular />}
      {text}
      {!back && !noArrow && <ArrowCircleRight20Regular />}
    </RouterLink>
  );
};

export default BSNavLink;
