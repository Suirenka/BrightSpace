/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  makeStyles,
  Textarea,
  Button,
  Field,
  MessageBar,
  MessageBarBody,
  MessageBarActions,
  shorthands,
  tokens,
  Card,
  CardHeader,
  Body1,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import BSNavLink from "../components/BSLinks/BSNavLink";
import { motion } from "framer-motion";
import RTBanner from "../assets/images/ReflectiveTwin.jpg";
import RTAvatar from "../assets/images/RT/ReflectiveTwin_avatar.png";

const useStyles = makeStyles({
  page: {
    padding: "0",
    backgroundColor: tokens.colorNeutralBackground3,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: tokens.colorCompoundBrandBackgroundHover,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1rem",
    color: tokens.colorNeutralStrokeAccessible,
    textAlign: "center",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "2rem",
    borderRadius: "24px",
    boxShadow: tokens.shadow16,
    maxWidth: "550px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "0.25rem",
    width: "100%",
  },
  textarea: {
    borderRadius: "12px",
    padding: "12px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "12px",
    height: "3rem",
    width: "100%",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  errorBar: {
    borderLeft: `4px solid ${tokens.colorPaletteRedBorderActive}`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  harshResponse: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteRedBorderActive}`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  negativeResponse: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteYellowBorderActive}`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  neutralResponse: {
    backgroundColor: tokens.colorPaletteYellowBackground2,
    color: tokens.colorPaletteYellowForeground2,
    borderLeft: `4px solid ${tokens.colorPaletteYellowBorderActive}`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  positiveResponse: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground2,
    borderLeft: `4px solid ${tokens.colorPaletteGreenBorderActive}`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  responseContent: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    width: "100%",
  },
  resCard: {
    flex: 1,
    display: "flex",
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  recordButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "12px",
    height: "",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

const BSReflectiveTwin = () => {
  const styles = useStyles();
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorBar, setShowErrorBar] = useState(false);

  const handleSubmit = async () => {
    setApiResponse(null);
    setError(null);
    setShowErrorBar(false);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/reflective-twin?prompt=${encodeURIComponent(prompt)}`
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${errorData.error}`);
      }
      const data = await res.json();
      let dataString = JSON.stringify(data);
      dataString = dataString.replace(/^"|"$/g, "");
      const [level, suggestion, improvedPost] = dataString.split("-");
      const result = {
        level: level,
        suggestion: suggestion,
        improvedPost: improvedPost,
      };
      setApiResponse(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setShowErrorBar(true);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement>,
    data: { value: string }
  ) => {
    if (data.value.length <= 1000) {
      setPrompt(data.value);
    }
  };

  return (
    <div className={styles.page}>
      <div
        style={{
          width: "100%",
          height: "550px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${RTBanner})`,

          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          color: "white",
          textShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontSize: "2.5rem", fontWeight: 900 }}
        >
          Feeling Something? Reflect with Your Twin!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{
            marginTop: "1rem",
            fontSize: "1.25rem",
            maxWidth: "720px",
            lineHeight: 1.6,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            textAlign: "center",
            color: "white",
          }}
        >
          Your feelings matter. Let your Reflective Twin help you understand
          them better.
        </motion.p>
      </div>

      <div className={styles.card}>
        <div className={styles.inputBox}>
          <Field label="Tell us your feelings..." className={styles.label}>
            <Textarea
              placeholder="Type what's on your mind..."
              value={prompt}
              onChange={onChange}
              className={styles.textarea}
              style={{ height: "100px", width: "100%" }}
            />
          </Field>
          <Button className={styles.recordButton}>Record</Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </Button>

        {showErrorBar && error && (
          <MessageBar className={styles.errorBar} intent="error">
            <MessageBarBody>{error}</MessageBarBody>
            <MessageBarActions
              containerAction={
                <Button
                  aria-label="dismiss"
                  appearance="transparent"
                  icon={<DismissRegular />}
                  onClick={() => setShowErrorBar(false)}
                />
              }
            />
          </MessageBar>
        )}

        {apiResponse && <ResponseContent {...apiResponse} />}

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <BSNavLink text="Go Back to Home" route="/" back />
        </div>
      </div>
    </div>
  );
};

const ResponseContent = (apiResponse: {
  level: string;
  suggestion: string;
  improvedPost: string;
}) => {
  const styles = useStyles();
  if (!apiResponse) return null;

  let response = "";
  let responseStyle = styles.neutralResponse;

  if (apiResponse.level === "0") {
    response = "Mood: Angry";
    responseStyle = styles.harshResponse;
  } else if (apiResponse.level === "1") {
    response = "Mood: Sad";
    responseStyle = styles.negativeResponse;
  } else if (apiResponse.level === "2") {
    response = "Mood: Neutral";
    responseStyle = styles.neutralResponse;
  } else {
    response = "Mood: Happy";
    responseStyle = styles.positiveResponse;
  }

  return (
    <div className={styles.responseContent}>
      <Card className={styles.resCard}>placeholder for visualisation</Card>
      <Card className={styles.resCard}>
        <CardHeader
          image={<img src={RTAvatar} alt="Reflective Twin avatar picture" />}
          header={
            <Body1>
              <b>Reflective Twin</b>
            </Body1>
          }
        />
        {apiResponse.suggestion}
      </Card>
    </div>
  );
};

export default BSReflectiveTwin;
