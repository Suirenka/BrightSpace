import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowCircleLeft20Regular,
  ArrowCircleRight20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  navLink: {
    color: tokens.colorBrandForegroundLinkHover,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
    ":hover": {
      textDecoration: "underline",
    },
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.gap("4px"),
  },
});

interface BSNavLinkProps {
  text: string;
  route: string;
  givenLinkStyle?: string;
  back?: boolean;
  noArrow?: boolean;
}

const BSNavLink = ({
  text,
  route,
  givenLinkStyle,
  back = false,
  noArrow = false,
}: BSNavLinkProps) => {
  const defaultCardStyles = useStyles();
  const linkStyle = givenLinkStyle ? givenLinkStyle : defaultCardStyles.navLink;
  if (noArrow) {
    return !back ? (
      <RouterLink className={linkStyle} to={route}>
        {text}
      </RouterLink>
    ) : (
      <RouterLink className={linkStyle} to={route}>
        {text}
      </RouterLink>
    );
  }
  return !back ? (
    <RouterLink className={linkStyle} to={route}>
      {text}
      <ArrowCircleRight20Regular />
    </RouterLink>
  ) : (
    <RouterLink className={linkStyle} to={route}>
      <ArrowCircleLeft20Regular />
      {text}
    </RouterLink>
  );
};

export default BSNavLink;
