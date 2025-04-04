import {
    makeStyles,
    shorthands,
    tokens,
    Title1,
    Subtitle2,
    Text,
  } from "@fluentui/react-components";
  import BSNavLink from "../components/BSLinks/BSNavLink";
  
  const useStyles = makeStyles({
    pageWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "4rem",
      paddingBottom: "4rem",
      ...shorthands.padding("2rem"),
      textAlign: "center",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.75rem",
    },
    subtitle: {
      fontSize: "1rem",
      maxWidth: "700px",
      color: tokens.colorNeutralForeground3,
      marginBottom: "3rem",
    },
    tip: {
      marginTop: "1rem",
      fontSize: "0.95rem",
      color: tokens.colorNeutralForeground2,
    },
    backLink: {
      marginTop: "3rem",
    },
  });
  
  const BSResource = () => {
    const styles = useStyles();
  
    return (
      <div className={styles.pageWrapper}>
        <Subtitle2 className={styles.subtitle}>
          This section is currently under development.
        </Subtitle2>
  
        <div className={styles.backLink}>
          <BSNavLink text={"Go Back to Home"} route={"/"} back={true} />
        </div>
      </div>
    );
  };
  
  export default BSResource;
  