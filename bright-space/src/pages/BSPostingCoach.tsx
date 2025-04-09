import React, { useState } from "react";
import { shorthands } from "@fluentui/react-components";
import {
  makeStyles,
  tokens,
  Button,
  Field,
  Textarea,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from "@fluentui/react-components";
import BSCard from "../components/BSCard/BSCard";
import BSCardBody from "../components/BSCard/BSCardBody";
import BSCardHeader from "../components/BSCard/BSCardHeader";
import BSNavLink from "../components/BSLinks/BSNavLink";
import BSCardFooter from "../components/BSCard/BSCardFooter";
import { DismissRegular } from "@fluentui/react-icons";
import CoachImage from "../assets/images/home/CoachCheck.jpeg";

const useStyles = makeStyles({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.6",
    gap: "1rem",
    padding: "1rem",
  },
  userInput: {
    width: "100%",
    height: "20vh",
    padding: "8px",
    marginBottom: "0.5rem",
  },
  cardHeaderCentered: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  errorBar: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteRedBorder2}`,
    borderRadius: "6px",
    ...shorthands.padding("0.75rem"),
  },
  submitBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.05rem",
    marginBottom: "-1rem",
  },
  negativeResponse: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground2,
    color: tokens.colorPaletteDarkOrangeForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteDarkOrangeBorderActive}`,
    borderRadius: "6px",
    ...shorthands.padding("0.75rem"),
  },
  harshResponse: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteRedBorder2}`,
    borderRadius: "6px",
    ...shorthands.padding("0.75rem"),
  },
  neutralResponse: {
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
    color: tokens.colorPaletteMarigoldForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteMarigoldBorderActive}`,
    borderRadius: "6px",
    ...shorthands.padding("0.75rem"),
  },
  positiveResponse: {
    backgroundColor: tokens.colorPaletteLightGreenBackground2,
    color: tokens.colorPaletteLightGreenForeground1,
    borderLeft: `4px solid ${tokens.colorPaletteLightGreenBorder2}`,
    borderRadius: "6px",
    ...shorthands.padding("0.75rem"),
  },
  checkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0.5rem 0",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#1E3A8A",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "0.75rem",
  },
  promptItem: {
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  ctaButton: {
    backgroundColor: "#3B82F6",
    color: "white",
  },
});

export const BSPostingCoach = () => {
  return <ResourceCard />;
};

const ResourceCard = () => {
  const styles = useStyles();
  return (
    <BSCard>
      <BSCardHeader>✨Message Tone Check</BSCardHeader>
      <BSCardBody givenCardBodyStyle={styles.cardBody}>
        <CardContent />
      </BSCardBody>
      <BSCardFooter>
        <BSNavLink text={"Go Back to Home"} route={"/"} back={true} />
      </BSCardFooter>
    </BSCard>
  );
};

const CardContent = () => {
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorBar, setShowErrorBar] = useState(false);
  const styles = useStyles();

  const handleSubmit = async () => {
    setShowErrorBar(false);
    setLoading(true);
    setError(null);
    setApiResponse(null);
    try {
      const res = await fetch(
        `/api/intention-analysis?prompt=${encodeURIComponent(prompt)}`
      );

      if (!res.ok) {
        setShowErrorBar(true);
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
    } finally {
      setLoading(false);
    }
  };

  const onChange: (
    ev: React.ChangeEvent<HTMLTextAreaElement>,
    data: { value: string }
  ) => void = (ev, data) => {
    if (data.value.length <= 1000) {
      setPrompt(data.value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "2rem", alignItems: "flex-start" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px" }}>

        <Field label="Let’s see how your message sounds before posting it….">
          <Textarea
            placeholder="Enter your post..."
            value={prompt}
            onChange={onChange}
            style={{ height: "100px" }}
          />
        </Field>

        <Field className={styles.submitBox}>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            appearance="primary"
            className={styles.ctaButton}
          >
            {loading ? "Processing..." : "Try tone detection"}
          </Button>
          {showErrorBar && (
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
              ></MessageBarActions>
            </MessageBar>
          )}
        </Field>

        {apiResponse && (
          <div style={{ marginTop: "1rem" }}>
            <ResponseContent {...apiResponse} />
          </div>
        )}
      </div>

      <div style={{ maxWidth: "300px", flexShrink: 0 }}>
        <img
          src={CoachImage}
          alt="Coach Illustration"
          style={{ width: "100%", borderRadius: "12px" }}
        />
      </div>
    </div>
  );
};

export const ResponseContent = (apiResponse: {
  level: string;
  suggestion: string;
  improvedPost: string;
}) => {
  const styles = useStyles();
  if (!apiResponse) {
    return null;
  }

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
    <>
      <MessageBar className={responseStyle}>
        <MessageBarBody>
          <MessageBarTitle>{response}</MessageBarTitle>
          {apiResponse.suggestion}
        </MessageBarBody>
      </MessageBar>
      <Field>{apiResponse.improvedPost}</Field>
    </>
  );
};

export default BSPostingCoach;