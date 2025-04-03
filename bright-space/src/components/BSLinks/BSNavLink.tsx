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

interface BSNavButtonProps {
  text: string;
  route: string;
  givenStyles?: Record<string, string>;
  back?: boolean;
  noArrow?: boolean;
}

const BSNavLink = ({
  text,
  route,
  givenStyles,
  back = false,
  noArrow = false,
}: BSNavButtonProps) => {
  const defaultCardStyles = useStyles();
  const linkStyle = givenStyles ? givenStyles : defaultCardStyles;
  if (noArrow) {
    return !back ? (
      <RouterLink className={linkStyle.navLink} to={route}>
        {text}
      </RouterLink>
    ) : (
      <RouterLink className={linkStyle.navLink} to={route}>
        {text}
      </RouterLink>
    );
  }
  return !back ? (
    <RouterLink className={linkStyle.navLink} to={route}>
      {text}
      <ArrowCircleRight20Regular />
    </RouterLink>
  ) : (
    <RouterLink className={linkStyle.navLink} to={route}>
      <ArrowCircleLeft20Regular />
      {text}
    </RouterLink>
  );
};

export default BSNavLink;
