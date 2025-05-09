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

    ":hover": { color: tokens.colorBrandForeground1 },

    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: "-4px",
      width: "100%",
      height: "3px",
      backgroundColor: tokens.colorBrandForeground1,
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform .25s ease",
      borderRadius: "2px",
    },
    ":hover::after": { transform: "scaleX(1)" },
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
