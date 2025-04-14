import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle1,
  Text,
  Button,
  ProgressBar,
} from "@fluentui/react-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
} from "@fluentui/react-icons";
import BSNavLink from "../../components/BSLinks/BSNavLink";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.padding("2rem"),
    minHeight: "60vh",
    backgroundColor: "white",
    textAlign: "center",
    gap: "2rem",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "20px",
    border: `2px solid ${tokens.colorPaletteLavenderBorderActive}`,
    boxShadow: tokens.shadow64,
    maxWidth: "850px",
    width: "100%",
    ...shorthands.padding("2rem"),
    marginBottom: "1rem",
  },
  progressBar: {
    width: "100%",
    maxWidth: "700px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: tokens.colorBrandBackground,
    textAlign: "center",
  },
  question: {
    fontSize: "1.2rem",
    marginTop: "1rem",
    lineHeight: "1.8",
    whiteSpace: "pre-line",
    textAlign: "left",
  },
  optionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
    marginTop: "1.5rem",
  },
  answerButton: {
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "1rem",
  },
  feedback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    fontSize: "1rem",
    marginTop: "1.5rem",
    textAlign: "left",
  },
  correctText: {
    color: "#15803d",
    fontStyle: "italic",
  },
  wrongText: {
    color: "#b91c1c",
    fontStyle: "italic",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  nextButton: {
    backgroundColor: "#a78bfa",
    color: "white",
  },
  backButtonStyled: {
    backgroundColor: "white",
    color: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorBrandForeground1}`,
  },
  section: {
    backgroundColor: tokens.colorSubtleBackgroundHover,
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.8rem",
    maxWidth: "750px",
    width: "100%",
    boxShadow: tokens.shadow4,
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: tokens.shadow16,
      cursor: "pointer",
    },
  },
  paragraph: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
  },
  backLink: {
    textAlign: "center",
    marginTop: "2.5rem",
  },
  introText: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.6",
    marginTop: "1rem",
    textAlign: "center",
    maxWidth: "700px",
    marginInline: "auto", // ✅ 水平居中容器
  },
});

const questions = [
  {
    text: `🎯 Scenario 1\nA group chat you’re in starts joking about someone’s appearance. It keeps going, and people are reacting with 💀 and 😂. What do you do?\n\nOption A: Say “Not cool guys” and leave the chat\nOption B: Stay quiet — you don’t want to ruin the vibe`,
    correct: "A",
    correctFeedback: `✅ You chose right!\nEven a short comment shows you don’t agree — and leaving sets a boundary.`,
    wrongFeedback: `❌ Not quite.\nIt’s okay to feel unsure, but silence can feel like approval.\nEven leaving the chat sends a message.`,
  },
  {
    text: `🎯 Scenario 2\nSomeone in the chat gets left on read after standing up for someone. Now people are ignoring them completely. What do you do?\n\nOption A: DM them: “I saw what you said — I thought it was brave.”\nOption B: Stay silent — you don’t want attention on you`,
    correct: "A",
    correctFeedback: `✅ You chose right!\nOne message of support can undo a lot of silence. You don’t have to speak up in public to show respect.`,
    wrongFeedback: `❌ Not quite.\nIt’s normal to want to stay under the radar, but quiet support matters too.\nTry checking in privately.`,
  },
  {
    text: `🎯 Scenario 3\nYou realize you’ve been laughing along in chats where someone keeps getting picked on. You didn’t mean harm — but now you feel weird about it. What do you do?\n\nOption A: DM the person: “Hey, I’ve been thinking. That wasn’t cool. You okay?”\nOption B: Leave the chat quietly and never bring it up`,
    correct: "A",
    correctFeedback: `✅ You chose right!\nIt takes real maturity to reflect and own up — even in a small way.`,
    wrongFeedback: `❌ Not quite.\nLeaving can be good, but reaching out shows you care and want to make things better.`,
  },
];

const GroupChats = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFinal, setShowFinal] = useState(false);
  const current = questions[step];
  const progress = ((step + (isCorrect ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (choice: "A" | "B") => {
    setSelected(choice);
    setIsCorrect(choice === current.correct);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setShowFinal(true);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/bs-resource");
    } else {
      setStep(step - 1);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className={styles.container}>
      <ProgressBar className={styles.progressBar} value={progress} color="brand" />
      <AnimatePresence mode="wait">
        {!showFinal && (
          <motion.div
            key={step}
            className={styles.card}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Title1 className={styles.title}>When it Happens in Group Chats</Title1>
            {step === 0 && (
              <div className={styles.introText}>
                Let’s see how you'd handle a few real-life moments. You can try again if you pick the wrong option.
              </div>
            )}
            <div className={styles.question}>{current.text}</div>
            <div className={styles.optionButtons}>
              {["A", "B"].map((opt) => (
                <Button
                  key={opt}
                  className={styles.answerButton}
                  appearance={selected === opt ? "primary" : "outline"}
                  onClick={() => handleSelect(opt as "A" | "B")}
                  disabled={selected !== null}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {selected && (
              <motion.div
                className={styles.feedback}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isCorrect ? (
                  <>
                    <CheckmarkCircle24Filled style={{ color: "#15803d" }} />
                    <div className={styles.correctText}>{current.correctFeedback}</div>
                    <div className={styles.buttonRow}>
                      <Button className={styles.backButtonStyled} onClick={handleBack}>Back</Button>
                      <Button className={styles.nextButton} onClick={handleNext}>{step === questions.length - 1 ? "Finish" : "Next"}</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DismissCircle24Filled style={{ color: "#b91c1c" }} />
                    <div className={styles.wrongText}>{current.wrongFeedback}</div>
                    <div className={styles.buttonRow}>
                      <Button onClick={() => { setSelected(null); setIsCorrect(null); }}>Try Again</Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showFinal && (
        <motion.div
          key="final"
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title1 className={styles.title}>Support Starts with You 💙</Title1>
          <div style={{ lineHeight: "1.6", marginTop: "1rem", marginBottom: "2rem" }}>
            What to do when the whole vibe goes toxic.
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              😣 Feeling uncomfortable? If a group chat starts to feel negative or toxic, take a step back. You don’t have to stay in a conversation that makes you feel bad.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              💬 Change the tone: Try to redirect the conversation or send a private message to someone you trust in the group. If things stay hostile, don’t be afraid to mute, leave, or report it.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              🛟 Take care of you: If you're feeling overwhelmed, talk to a friend or adult you trust. It’s totally okay to remove yourself from a space that doesn’t feel safe.
            </Text>
          </div>

          <div className={styles.backLink}>
            <BSNavLink text="Go Back to Resources" route="/bs-resource" back={true} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GroupChats;