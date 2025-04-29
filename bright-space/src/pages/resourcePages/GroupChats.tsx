import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  shorthands as padding,
} from "@fluentui/react-components";
import {
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
} from "@fluentui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BSNavLink from "../../components/BSLinks/BSNavLink";
import { ProgressBar } from "@fluentui/react-components";

const useStyles = makeStyles({
  outerContainer: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: tokens.colorStrokeFocus1,
    marginTop: "-2rem",
  },
  leftPanel: {
    flex: "1 1 50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.padding("2rem"),
  },
  rightPanel: {
    flex: "1 1 50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ...shorthands.padding("2rem"),
    marginTop: "-3rem",
  },
  scenarioTitle: {
    fontSize: "2.2rem",
    fontWeight: 600,
    marginBottom: "2rem",
    color: tokens.colorNeutralForeground1,
  },
  scenarioImage: {
    width: "100%",
    height: "auto",
    maxWidth: "550px",
    borderRadius: "12px",
    marginBottom: "6rem",
    objectFit: "cover",
  },
  scenarioIndex: {
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    marginBottom: "0.5rem",
    marginTop: "-4rem",
  },
  questionText: {
    fontSize: "1.6rem",
    fontWeight: 600,
    marginBottom: "9rem",
    lineHeight: "1.4",
    color: tokens.colorStatusWarningForeground2,
  },
  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "4rem",
    marginTop: "-5rem",
  },
  optionButton: {
    justifyContent: "flex-start",
    fontWeight: 500,
    borderRadius: "12px",
    padding: "1rem 1.25rem",
    fontSize: "1rem",
    backgroundColor: tokens.colorPaletteLavenderBackground2,
    color: tokens.colorNeutralForeground1,
    border: `2px solid transparent`,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    ":hover": {
      backgroundColor: tokens.colorPaletteLavenderBackground2,
    },
  },
  feedbackBox: {
    lineHeight: "1.7",
    backgroundColor: tokens.colorNeutralBackground2,
    borderLeft: `4px solid ${tokens.colorStatusSuccessBorder1}`,
    ...shorthands.padding("1.25rem"),
    borderRadius: "10px",
    color: tokens.colorNeutralForeground1,
    fontSize: "1.1rem",
    fontWeight: 600,
    whiteSpace: "pre-line",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    alignItems: "flex-start",
    maxWidth: "600px",
    width: "100%",
    boxShadow: tokens.shadow4,
  },
  buttonRow: {
    marginTop: "1.5rem",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    width: "100%",
  },
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "10px",
    ...shorthands.padding("1.5rem"),
    marginBottom: "1.8rem",
    maxWidth: "750px",
    width: "100%",
    boxShadow: tokens.shadow4,
    transition: "transform 0.3s ease",
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
    ":hover": {
      transform: "translateY(-6px)",
      boxShadow: tokens.shadow64,
    },
  },
  subtitle: {
    fontWeight: "600",
    fontSize: "1.2rem",
    marginBottom: "0.75rem",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.7",
  },
  backLink: {
    marginTop: "2.5rem",
    textAlign: "center",
  },
});

const scenariosData = [
  {
    title: "Scenario 1: Group Chats",
    image: require("../../assets/images/home/GroupChats.png"),
    question:
      "A group chat you’re in starts joking about someone’s appearance. It keeps going, and people are reacting with 💀 and 😂.\nWhat do you do?",
    options: [
      "Say “Not cool guys” and leave the chat",
      "Stay quiet — you don’t want to ruin the vibe",
    ],
    correctIndex: 0,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Even a short comment shows you don’t agree — and leaving sets a boundary.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "It’s okay to feel unsure, but silence can feel like approval.\nEven leaving the chat sends a message.",
    },
  },
  {
    title: "Scenario 2: Group Chats",
    image: require("../../assets/images/home/GroupChats.png"),
    question:
      "Someone in the chat gets left on read after standing up for someone. Now people are ignoring them completely.\nWhat do you do?",
    options: [
      "DM them: “I saw what you said — I thought it was brave.”",
      "Stay silent — you don’t want attention on you",
    ],
    correctIndex: 0,
    correctFeedback: {
      title: "You chose right!",
      message:
        "One message of support can undo a lot of silence. You don’t have to speak up in public to show respect.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "It’s normal to want to stay under the radar, but quiet support matters too.\nTry checking in privately.",
    },
  },
  {
    title: "Scenario 3: Group Chats",
    image: require("../../assets/images/home/GroupChats.png"),
    question:
      "You realize you’ve been laughing along in chats where someone keeps getting picked on. You didn’t mean harm — but now you feel weird about it.\nWhat do you do?",
    options: [
      "DM the person: “Hey, I’ve been thinking. That wasn’t cool. You okay?”",
      "Leave the chat quietly and never bring it up",
    ],
    correctIndex: 0,
    correctFeedback: {
      title: "You chose right!",
      message:
        "It takes real maturity to reflect and own up — even in a small way.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Leaving can be good, but reaching out shows you care and want to make things better.",
    },
  },
];

export default function GroupChats() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scenario = scenariosData[step];
  const totalCount = scenariosData.length;

  const handleOptionSelect = (index: number) => {
    setSelectedIndex(index);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (step < totalCount - 1) {
        setStep(step + 1);
        setSelectedIndex(null);
        setShowFeedback(false);
        setIsTransitioning(false);
      } else {
        setShowFinal(true);
        setIsTransitioning(false);
      }
    }, 600);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelectedIndex(null);
      setShowFeedback(false);
    } else {
      navigate("/bs-resource");
    }
  };

  return (
    <div className={styles.outerContainer}>
      {!showFinal && (
        <>
          <div className={styles.leftPanel}>
            <h2 className={styles.scenarioTitle}>{scenario.title}</h2>
            <img
              src={scenario.image}
              alt="Scenario"
              className={styles.scenarioImage}
            />
            <div className={styles.scenarioIndex}>
              Scenario {step + 1}/{totalCount}
            </div>

            {/* Progress Line */}
            <div style={{ width: "100%", maxWidth: "450px", marginBottom: "1rem" }}>
              <div
                style={{
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: tokens.colorNeutralStroke2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${((step + 1) / totalCount) * 100}%`,
                    backgroundColor: tokens.colorBrandBackground,
                  }}
                />
              </div>
            </div>
            {/* Dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              {[...Array(totalCount)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setStep(i);
                    setSelectedIndex(null);
                    setShowFeedback(false);
                    setShowFinal(false);
                  }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      i === step
                        ? tokens.colorBrandBackground
                        : tokens.colorNeutralStroke2,
                    border: `1px solid ${tokens.colorNeutralStroke2}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: i === step ? tokens.shadow4 : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.rightPanel}>
            <AnimatePresence mode="wait">
              {isTransitioning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "300px",
                  }}
                >
                  <ProgressBar thickness="medium" value={undefined} />
                </motion.div>
              ) : showFeedback && selectedIndex !== null ? (
                <motion.div
                  key="feedback"
                  className={styles.feedbackBox}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  {selectedIndex === scenario.correctIndex ? (
                    <>
                      <CheckmarkCircle24Filled
                        style={{ color: tokens.colorStatusSuccessForeground1 }}
                      />
                      <p
                        style={{
                          color: tokens.colorStatusSuccessForeground1,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {scenario.correctFeedback.title +
                          "\n" +
                          scenario.correctFeedback.message}
                      </p>
                      <div className={styles.buttonRow}>
                        <Button onClick={handleBack}>Back</Button>
                        <Button appearance="primary" onClick={handleNext}>
                          {step === totalCount - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <DismissCircle24Filled
                        style={{ color: tokens.colorStatusDangerForeground1 }}
                      />
                      <p
                        style={{
                          color: tokens.colorStatusDangerForeground1,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {scenario.incorrectFeedback.title +
                          "\n" +
                          scenario.incorrectFeedback.message}
                      </p>
                      <div className={styles.buttonRow}>
                        <Button
                          appearance="primary"
                          onClick={() => {
                            setSelectedIndex(null);
                            setShowFeedback(false);
                          }}
                        >
                          Try Again
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  style={{ marginTop: "2rem" }}
                >
                  <h3 className={styles.questionText}>
                    {scenario.question}
                  </h3>
                  <div className={styles.optionList}>
                    {scenario.options.map((opt, idx) => (
                      <Button
                        key={idx}
                        className={styles.optionButton}
                        appearance={
                          selectedIndex === idx ? "primary" : "outline"
                        }
                        onClick={() => handleOptionSelect(idx)}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {showFinal && (
        <motion.div
          key="final"
          className={styles.rightPanel}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              textAlign: "center",
              marginTop: "6rem",
              marginBottom: "2rem",
              color: tokens.colorNeutralForeground1,
            }}
          >
            Support Starts with You 💙
          </h2>
          <div
            style={{
              lineHeight: "1.6",
              marginBottom: "2rem",
              textAlign: "center",
              color: tokens.colorNeutralForeground1,
            }}
          >
            What to do when the whole vibe goes toxic.
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>😣 Feeling uncomfortable?</h3>
            <p className={styles.paragraph}>
              If a group chat starts to feel negative or toxic, take a step back.
              You don’t have to stay in a conversation that makes you feel bad.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>💬 Change the tone</h3>
            <p className={styles.paragraph}>
              Try to redirect the conversation or send a private message to
              someone you trust. If things stay hostile, don’t be afraid to mute,
              leave, or report it.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🛟 Take care of you</h3>
            <p className={styles.paragraph}>
              If you're feeling overwhelmed, talk to a friend or adult you trust.
              It’s totally okay to remove yourself from a space that doesn’t feel
              safe.
            </p>
          </div>

          <div className={styles.backLink}>
            <BSNavLink text="Go Back to Resources" route="/bs-resource" back />
          </div>
        </motion.div>
      )}
    </div>
  );
}
