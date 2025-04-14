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
    backgroundColor: tokens.colorNeutralForegroundInverted,
    padding: "2rem",
    borderRadius: "24px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
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
    backgroundColor: tokens.colorCompoundBrandBackgroundHover,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "12px",
    height: "3rem",
    width: "100%",
    ":hover": {
      backgroundColor: "#7c3aed",
    },
  },
  errorBar: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderLeft: `4px solid #dc2626`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  harshResponse: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderLeft: `4px solid #dc2626`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  negativeResponse: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    borderLeft: `4px solid #f59e0b`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  neutralResponse: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
    borderLeft: `4px solid #eab308`,
    borderRadius: "12px",
    ...shorthands.padding("1rem"),
  },
  positiveResponse: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    borderLeft: `4px solid #10b981`,
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
          <MessageBar className={styles.errorBar}>
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
        <div style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
          "{apiResponse.improvedPost}"
        </div>
      </MessageBarBody>
    </MessageBar>
  );
};

export default BSPostingCoach;
