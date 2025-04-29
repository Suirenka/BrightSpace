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
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import BSNavLink from "../components/BSLinks/BSNavLink";

const useStyles = makeStyles({
  page: {
    backgroundColor: tokens.colorBrandBackground2Hover,
    padding: "4rem 1rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    minHeight: "65vh",
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
});

const BSPostingCoach = () => {
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
        `/api/intention-analysis?prompt=${encodeURIComponent(prompt)}`
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
      <div>
        <h1 className={styles.title}>Post Coach</h1>
        <p className={styles.subtitle}>
          Let’s make sure your post says what you mean, in a kind and confident
          way.
        </p>
      </div>

      <div className={styles.card}>
        <Field label="What are you about to post?" className={styles.label}>
          <Textarea
            placeholder="Type your post here..."
            value={prompt}
            onChange={onChange}
            className={styles.textarea}
            style={{ height: "100px" }}
          />
        </Field>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Checking..." : "Check My Tone"}
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
    response = "Tone: Harsh 😡";
    responseStyle = styles.harshResponse;
  } else if (apiResponse.level === "1") {
    response = "Tone: Negative 😟";
    responseStyle = styles.negativeResponse;
  } else if (apiResponse.level === "2") {
    response = "Tone: Neutral 😐";
    responseStyle = styles.neutralResponse;
  } else {
    response = "Tone: Positive ☺️";
    responseStyle = styles.positiveResponse;
  }

  return (
    <MessageBar className={responseStyle} icon={null}>
      <MessageBarBody>
        <div>
          <strong>{response}</strong> {apiResponse.suggestion}
        </div>
      </MessageBarBody>
    </MessageBar>
  );
};

export default BSPostingCoach;
