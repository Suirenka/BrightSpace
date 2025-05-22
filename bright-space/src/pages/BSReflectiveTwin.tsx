/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
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
  Divider,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import BSNavLink from "../components/BSLinks/BSNavLink";
import { motion } from "framer-motion";
import RTBanner from "../assets/images/ReflectiveTwin.jpg";
import RTAvatar from "../assets/images/RT/ReflectiveTwin_avatar.png";
import {
  Mic24Regular,
  MicProhibited24Regular,
  MicSparkle24Regular,
} from "@fluentui/react-icons";
import WordCloud from "wordcloud";

const useStyles = makeStyles({
  page: {
    padding: "0",
    backgroundColor: tokens.colorNeutralBackground3,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    maxWidth: "60vw",
    minHeight: "350px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    margin: "2rem auto",
    marginTop: "4rem",
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
    marginTop: "1rem",
  },
  recordButton: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    color: tokens.colorNeutralForeground2,
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "12px",
    height: "100%",
    width: "20%",
    marginLeft: "0.5rem",
    alignSelf: "center",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
});

const BSReflectiveTwin = () => {
  const styles = useStyles();
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorBar, setShowErrorBar] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const onChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement>,
    data: { value: string }
  ) => {
    if (data.value.length <= 5000) {
      setPrompt(data.value);
    }
  };

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
      const [level, subclassEmotion, suggestion, processedReflection] =
        dataString.split("-");
      const result = {
        level: level,
        subclassEmotion: subclassEmotion,
        suggestion: suggestion,
        processedReflection: processedReflection,
      };
      console.log(result);
      setApiResponse(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setShowErrorBar(true);
    } finally {
      setLoading(false);
    }
  };

  const [selectedTone, setSelectedTone] = useState<string>("");

  const toneOptions = [
    { icon: "🧘", label: "Gentle", description: "Soft, warm, encouraging." },
    { icon: "🧠", label: "Blunt", description: "Straight-up truth, no fluff." },
    { icon: "🎭", label: "Poetic", description: "Reflective and deep." },
  ];

  const handleRecord = async () => {
    setError(null);
    setShowErrorBar(false);

    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream; // Assign the stream to streamRef
        const recorder = new MediaRecorder(stream);
        audioChunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        recorder.onstop = async () => {
          setTranscribing(true);
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const form = new FormData();
          form.append("audio", blob, "recording.webm");

          try {
            const res = await fetch("/api/speech-to-text", {
              method: "POST",
              body: form,
            });
            if (!res.ok) {
              const err = await res.json();
              throw new Error(err.error || "Transcription failed");
            }
            const data = await res.json();
            setTranscription(data.transcription);
            setPrompt(data.transcription);
          } catch (err: any) {
            setError(err.message);
            setShowErrorBar(true);
          } finally {
            setTranscribing(false);
          }
        };

        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsRecording(true);
      } catch (err: any) {
        setError("Microphone access denied");
        setShowErrorBar(true);
      }
    } else {
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop()); // Stop all tracks
      mediaRecorderRef.current = null;
      streamRef.current = null;
      setIsRecording(false);
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
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const target = document.getElementById("cardTop");
            if (target) {
              const headerOffset = 80;
              const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            backgroundColor: tokens.colorBrandBackground,
            color: tokens.colorNeutralForegroundOnBrand,
            border: "none",
            borderRadius: "9999px",
            boxShadow: tokens.shadow8,
            cursor: "pointer",
          }}
        >
          Start Reflecting
        </motion.button>
      </div>

      <div className={styles.card} id="cardTop">
        <div id="reflectInput">
          <Field label="Tell us your feelings..." className={styles.label}>
            <div className={styles.inputBox}>
              <Textarea
                placeholder={
                  transcribing
                    ? "Transcribing..."
                    : isRecording
                    ? "Press the mic again to stop recording..."
                    : "Type what's on your mind ... or click on the mic to transcribe your voice into text."
                }
                value={prompt}
                onChange={onChange}
                className={styles.textarea}
                style={{ height: "100px", width: "100%" }}
              />
              <Button
                className={styles.recordButton}
                onClick={handleRecord}
                disabled={transcribing}
                icon={
                  transcribing ? (
                    <MicSparkle24Regular />
                  ) : isRecording ? (
                    <MicProhibited24Regular />
                  ) : (
                    <Mic24Regular />
                  )
                }
              />
            </div>
          </Field>
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

interface ResponseContentProps {
  level: string;
  subclassEmotion: string;
  suggestion: string;
  processedReflection: string;
}

const ResponseContent: React.FC<ResponseContentProps> = ({
  level,
  subclassEmotion,
  suggestion,
  processedReflection,
}) => {
  const styles = useStyles();
  const wordCloudRef = useRef<HTMLCanvasElement | null>(null);
  const [mostFrequentWord, setMostFrequentWord] = useState<string | null>(null);

  // determine response style (unchanged) …
  let response = "";
  let responseStyle = styles.neutralResponse;
  let colors = ["#5b5fc7", "#4f52b2", "#383966", "#7f85f5", "#b6bcfa"];
  if (level === "0") {
    response = "Not Meaningful";
    responseStyle = styles.harshResponse;
    colors = ["#7f7f7f", "#b3b3b3", "#d9d9d9", "#f2f2f2", "#ffffff"]; // gray
  } else if (level === "1") {
    response = "Negative";
    colors = ["#00008B", "#4682B4", "#1E90FF", "#1A237E", "#0000CD"]; // blue
  } else if (level === "2") {
    response = "Ambiguous";
    responseStyle = styles.neutralResponse;
    colors = ["#5b5fc7", "#4f52b2", "#383966", "#7f85f5", "#b6bcfa"]; // purple
  } else {
    response = "Positive";
    responseStyle = styles.positiveResponse;
    colors = ["#6fcf6e", "#56c8a7", "#3db8b0", "#2ab8b0", "#1f9fb0", "#1f9fb0"]; // green
  }

  // generate word cloud when prompt changes
  useEffect(() => {
    if (!wordCloudRef.current || !processedReflection) return;

    const words = processedReflection
      .split(/\s+/)
      .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
      .filter(
        (w) =>
          w.length > 0 &&
          ![
            "i",
            "me",
            "my",
            "you",
            "your",
            "he",
            "him",
            "his",
            "she",
            "her",
            "it",
            "its",
            "to",
            "a",
            "an",
            "the",
            "and",
            "or",
            "of",
            "for",
            "in",
            "on",
            "at",
            "today",
          ].includes(w)
      );
    const freq: Record<string, number> = {};
    words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
    const list: [string, number][] = Object.entries(freq);

    if (list.length > 0) {
      list.sort((a, b) => b[1] - a[1]);
      setMostFrequentWord(list[0][0]);
    } else {
      setMostFrequentWord(null);
    }

    WordCloud(wordCloudRef.current, {
      list,
      gridSize: 5,
      weightFactor: 60,
      fontFamily: "sans-serif",
      color: () => {
        return colors[Math.floor(Math.random() * colors.length)];
      },
      rotateRatio: 0,
      backgroundColor: "transparent",
    });
  }, [prompt]);

  const finalSuggestion = suggestion
    .replaceAll("<", "")
    .replaceAll(">", "")
    .replaceAll("`", "")
    .replace("action plan", "")
    .replaceAll("\\n", "");

  return (
    <>
      <Body1>
        According to your words, the most likely emotion is:{" "}
        <b>{subclassEmotion}</b>. <br />
        The most frequent word related is: <b>{mostFrequentWord}</b>.
      </Body1>
      <Divider />
      <div className={styles.responseContent}>
        <Card className={styles.resCard} style={{ height: "400px" }}>
          <canvas
            ref={wordCloudRef}
            width={800}
            height={800}
            style={{ width: "100%", height: "100%" }}
          />
        </Card>
        <Card className={styles.resCard}>
          <CardHeader
            image={<img src={RTAvatar} alt="Reflective Twin avatar" />}
            header={
              <Body1>
                <b>Reflective Twin</b>
              </Body1>
            }
          />
          {finalSuggestion}
        </Card>
      </div>
    </>
  );
};

export default BSReflectiveTwin;
