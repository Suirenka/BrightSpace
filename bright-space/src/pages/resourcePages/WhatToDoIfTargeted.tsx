import React, { useState } from "react";
import {
  makeStyles,
  Button,
  tokens,
  shorthands,
  ProgressBar,
} from "@fluentui/react-components";
import {
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
} from "@fluentui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BSNavLink from "../../components/BSLinks/BSNavLink";

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
    whiteSpace: "pre-line",
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
    fontSize: "1rem",
    fontWeight: 600,
    whiteSpace: "pre-line",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    alignItems: "flex-start",
    maxWidth: "600px",
    width: "100%",
    boxShadow: tokens.shadow4,
    marginTop: "2rem",
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
    title: "Scenario 1: When Targeted",
    image: require("../../assets/images/home/WhenTargeted.png"),
    question:
      "You post a photo. Someone comments: “No one asked” and others like it. What do you do?",
    options: [
      "Delete the post immediately and say nothing",
      "Screenshot it, report the comment, and block the person",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Saving the proof and reporting it protects you — and blocking keeps your space safe.\n\n🟣You don’t have to respond to stay strong.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Deleting the post might seem easiest, but that lets the harm slide.\nTake control by reporting and blocking — you deserve a safe space.",
    },
  },
  {
    title: "Scenario 2: When Targeted",
    image: require("../../assets/images/home/WhenTargeted.png"),
    question:
      "You get a DM saying, “You should just quit trying.” It feels aggressive and personal.\nWhat do you do?",
    options: [
      "Respond with “lol ok” to make it seem like you don’t care",
      "Don’t reply, block the sender, and tell someone you trust",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "You don’t owe anyone a response. Blocking + talking to someone builds real support.\n\n🟣Protecting your peace is strength.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Trying to play it cool can leave the door open for more.\nInstead, take action — and get support.",
    },
  },
  {
    title: "Scenario 3: When Targeted",
    image: require("../../assets/images/home/WhenTargeted.png"),
    question:
      "You’ve been left out of a class group chat. When you ask about it, someone says “It’s not for everyone.”\nWhat do you do?",
    options: [
      "Pretend it doesn’t bother you and try harder to fit in",
      "Talk to a teacher or counselor about what’s happening",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Exclusion can be a form of bullying. It’s okay to speak up about how it’s affecting you.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Trying to force yourself in doesn’t solve it.\nYou deserve to be included — asking for help is a strong move.",
    },
  },
];

export default function WhenTargeted() {
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
            <div className={styles.scenarioIndex}>
              Scenario {step + 1}/{totalCount}
            </div>

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
                      i === step ? tokens.colorBrandBackground : tokens.colorNeutralStroke2,
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
                      <p style={{ color: tokens.colorStatusSuccessForeground1 }}>
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
                      <p style={{ color: tokens.colorStatusDangerForeground1 }}>
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
          <h2
            style={{
              fontSize: "1.8rem",
              textAlign: "center",
              marginTop: "6rem",
              marginBottom: "2rem",
            }}
          >
            Great Job 🎉
          </h2>
          <div style={{ lineHeight: "1.6", marginBottom: "2rem", textAlign: "center" }}>
            You've completed the scenarios! Here are some quick reminders to help you stay safe:
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🧘 Stay Calm</h3>
            <p className={styles.paragraph}>
              It's okay to feel upset. Take a deep breath — responding when emotional may make
              things worse.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🚫 Don’t Engage</h3>
            <p className={styles.paragraph}>
              You don’t have to reply. Bullies often want a reaction — silence can be powerful.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🚷 Block and Report</h3>
            <p className={styles.paragraph}>
              Use the platform’s tools to block the person and report the content. You have the
              right to feel safe online.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>📸 Save the Evidence</h3>
            <p className={styles.paragraph}>
              Take screenshots of mean messages, posts, or DMs. This helps if you need to report
              them later.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🗣️ Tell Someone You Trust</h3>
            <p className={styles.paragraph}>
              You’re not alone. Talk to a parent, teacher, friend, or counselor — support makes a
              big difference.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>🛡️ Get More Support if Needed</h3>
            <p className={styles.paragraph}>
              If things get serious or threatening, reach out to school staff or local authorities
              for help.
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
