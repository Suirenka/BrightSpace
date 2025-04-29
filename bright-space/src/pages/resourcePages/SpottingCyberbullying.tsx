import React, { useState } from "react";
import {
  makeStyles,
  Button,
  tokens,
  shorthands,
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
    textAlign: "center",
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
  list: {
    fontSize: "1rem",
    lineHeight: "1.7",
    margin: 0,
    paddingLeft: "1.2rem",
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
    title: "Scenario 1: Spotting Cyberbullying",
    image: require("../../assets/images/home/SpotBully.jpg"),
    question:
      "You're in a group chat. Someone keeps sending sarcastic replies to the same person, and others are laughing along.\nWhat do you do?",
    options: [
      "Add a laughing emoji to the message",
      "DM the person being targeted to check in",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Checking in privately shows support — even quiet kindness makes a big impact.\n\n🟣 \"Hey, just wanted to check if you're okay. That didn’t seem cool.\"",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Laughing along can make the person feel even more alone.\nEven if you don’t mean harm, silence or reaction can be misread.\n\n🟣 Try checking in with them privately instead — it shows you care.",
    },
  },
  {
    title: "Scenario 2: Spotting Cyberbullying",
    image: require("../../assets/images/home/SpotBully.jpg"),
    question:
      "You see a post on someone’s story tagging another student with a mean caption.\nIt’s been up for hours, and people are reacting with laughing emojis.\nWhat do you do?",
    options: [
      "Ignore it — it’s not your business",
      "Report the story and check on the tagged person",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Reporting helps stop the spread, and checking in lets the person know they’re not alone.\n\n🟣 “Hey, just saw that story. I reported it — that wasn’t okay. You good?”",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "It might feel easier to scroll past, but doing nothing lets harm keep happening.\n\n🟣 Try reporting it and showing support — it’s a small action that means a lot.",
    },
  },
  {
    title: "Scenario 3: Spotting Cyberbullying",
    image: require("../../assets/images/home/SpotBully.jpg"),
    question:
      "You overhear a conversation where someone says: “She deserves it, she always acts better than everyone.”\nLater, that same person leaves harsh comments on her TikTok.\nWhat do you do?",
    options: [
      'Call it out with: “That’s not cool — chill.”',
      "Stay out of it — you don’t want drama",
    ],
    correctIndex: 0,
    correctFeedback: {
      title: "You chose right!",
      message:
        "A simple call-out can shift the tone and make others pause.\nStanding up doesn’t mean fighting — just setting the vibe.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "It’s okay to not want drama, but silence can feel like approval.\nEven one calm comment can help someone feel supported.",
    },
  },
];

export default function SpottingCyberbullying() {
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
            <img src={scenario.image} alt="Scenario" className={styles.scenarioImage} />
            <div className={styles.scenarioIndex}>Scenario {step + 1}/{totalCount}</div>

            {/* Custom Progress Line */}
            <div style={{ width: "100%", maxWidth: "450px", marginBottom: "1rem" }}>
              <div style={{
                height: "6px",
                borderRadius: "3px",
                backgroundColor: tokens.colorNeutralStroke2,
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${(step + 1) / totalCount * 100}%`,
                  backgroundColor: tokens.colorBrandBackground
                }} />
              </div>
            </div>
            
            {/* Dots */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.75rem",
              marginTop: "0.5rem"
            }}>
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
                    backgroundColor: i === step ? tokens.colorBrandBackground : tokens.colorNeutralStroke2,
                    border: `1px solid ${tokens.colorNeutralStroke2}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: i === step ? tokens.shadow4 : undefined
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
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}
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
                      <CheckmarkCircle24Filled style={{ color: tokens.colorStatusSuccessForeground1 }} />
                      <p style={{ color: tokens.colorStatusSuccessForeground1, whiteSpace: "pre-line" }}>
                        {scenario.correctFeedback.title + "\n" + scenario.correctFeedback.message}
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
                      <DismissCircle24Filled style={{ color: tokens.colorStatusDangerForeground1 }} />
                      <p style={{ color: tokens.colorStatusDangerForeground1, whiteSpace: "pre-line" }}>
                        {scenario.incorrectFeedback.title + "\n" + scenario.incorrectFeedback.message}
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
                  <h3 className={styles.questionText}>{scenario.question}</h3>
                  <div className={styles.optionList}>
                    {scenario.options.map((opt, idx) => (
                      <Button
                        key={idx}
                        className={styles.optionButton}
                        appearance={selectedIndex === idx ? "primary" : "outline"}
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
          <h2 style={{ fontSize: "1.8rem", textAlign: "center", marginTop: "6rem", marginBottom: "2rem" }}>
            Great Job 🎉
          </h2>
          <div style={{ lineHeight: "1.6", marginBottom: "2rem", textAlign: "center" }}>
            You've completed the scenarios! Here are some quick reminders to help you stay safe:
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🔍 Common Signs</h3>
            <ul className={styles.list}>
              <li>Repeated mean or sarcastic comments</li>
              <li>Being left out of group chats on purpose</li>
              <li>Fake accounts mocking you or your friends</li>
              <li>Screenshots of your messages or posts shared without consent</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>📍 Where it Happens</h3>
            <div className={styles.paragraph}>
              Instagram, TikTok, Snapchat, Discord, group chats, gaming voice channels — bullying can happen anywhere people interact online.
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>💡 What You Can Do</h3>
            <ul className={styles.list}>
              <li>Block the person</li>
              <li>Screenshot and save evidence</li>
              <li>Report the post or comment</li>
              <li>Talk to someone you trust</li>
              <li>If it’s happening to someone else — check in with them</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>📌 Reminder</h3>
            <div className={styles.paragraph}>
              You don’t have to fix everything — just being able to spot when something feels off is a powerful first step.
            </div>
          </div>

          <div className={styles.backLink}>
            <BSNavLink text="Go Back to Resources" route="/bs-resource" back />
          </div>
        </motion.div>
      )}
    </div>
  );
}