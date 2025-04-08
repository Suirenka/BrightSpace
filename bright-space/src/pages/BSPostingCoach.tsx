import React, { useState } from "react";
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

const useStyles = makeStyles({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.5rem",
  },
  userInput: {
    width: "100%",
    height: "20vh",
    padding: "8px",
    marginBottom: "0.5rem",
  },
  errorBar: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground3,
  },
  submitBox: {
    display: "flex",
    flexDirection: "row",
  },
  negativeResponse: {
    backgroundColor: tokens.colorStatusWarningForegroundInverted,
  },
  harshResponse: {
    backgroundColor: tokens.colorPaletteRedBackground2,
  },
  neutralResponse: {
    backgroundColor: tokens.colorPaletteMarigoldBorder1,
  },
  positiveResponse: {
    backgroundColor: tokens.colorStatusSuccessBorder1,
  },
});

export const BSPostingCoach = () => {
  return <ResourceCard />;
};

const ResourceCard = () => {
  const styles = useStyles();
  return (
    <BSCard>
      <BSCardHeader>Intention Analysis</BSCardHeader>
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
    <>
      <div style={{ marginTop: "1rem" }}>
        <Field label="Write your message...">
          <Textarea
            placeholder="Enter your post..."
            value={prompt}
            onChange={onChange}
          />
        </Field>
        <Field className={styles.submitBox}>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Submit"}
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
      </div>

      {apiResponse && <ResponseContent {...apiResponse} />}
    </>
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
