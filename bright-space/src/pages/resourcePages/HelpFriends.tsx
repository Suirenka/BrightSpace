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

const HelpFriends = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions = [
    {
      question: `Your friend keeps getting weird DMs from someone at school. They tell you it’s fine — but you can tell it’s bothering them. What do you do?`,
      options: [
        "Let them deal with it on their own",
        "Offer to help them report it or talk to someone",
      ],
      correctIndex: 1,
      correctFeedback:
        "You chose right!\nJust offering support shows you’ve got their back — even if they say they’re okay.",
      incorrectFeedback:
        "Not quite.\nIt’s tempting to step back, but friends check in even when it's awkward.\nYou don’t have to fix it — just show up.",
    },
    {
      question: `You see your friend getting roasted in a group chat. They try to joke back, but they seem upset. What do you do?`,
      options: [
        "Drop a laughing emoji to go with the flow",
        "DM them privately and ask if they’re okay",
      ],
      correctIndex: 1,
      correctFeedback:
        "You chose right!\nQuiet support can mean everything — even a quick “You okay?” shows you care.",
      incorrectFeedback:
        "Not quite.\nGoing with the crowd might feel easier, but it can add to the harm.\nSupport privately if you’re not ready to speak up publicly.",
    },
    {
      question: `Your friend tells you they’re thinking of deleting all their socials. They’ve been getting negative comments nonstop. What do you do?`,
      options: [
        "Say “Yeah maybe that’s best” and move on",
        "Ask them what’s been happening and if they want help reporting",
      ],
      correctIndex: 1,
      correctFeedback:
        "You chose right!\nListening comes first. Then you can support them in taking action — together.",
      incorrectFeedback:
        "Not quite.\nBrushing it off might make them feel even more alone.\nTake a minute to listen. It matters more than you think.",
    },
  ];

  const scenario = questions[step];
  const totalCount = questions.length;

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
          <h2 className={styles.scenarioTitle}>
            Scenario {step + 1}: Help Friends
          </h2>
            <img
              src={require("../../assets/images/home/HelpFriends.png")}
              alt="Scenario"
              className={styles.scenarioImage}
            />
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
                        {scenario.correctFeedback}
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
                        {scenario.incorrectFeedback}
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
            Support Starts with You 💙
          </h2>
          <div style={{ lineHeight: "1.6", marginBottom: "2rem", textAlign: "center" }}>
            If you notice a friend being bullied online, your support can make all the difference.
          </div>

          <div className={styles.section}>
            <div className={styles.paragraph}>
              👥 Reach out privately: Let them know you're there for them without putting them on the spot.
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.paragraph}>
              👂 Be a listener: Let them talk — don’t interrupt or judge.
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.paragraph}>
              💬 Show kindness: Small words of encouragement go a long way.
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.paragraph}>
              🛟 Help them get support: Suggest talking to a trusted adult or using a helpline.
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.paragraph}>
              🌟 Lead by example: Model respectful behavior online and speak up when needed.
            </div>
          </div>

          <div className={styles.backLink}>
            <BSNavLink text="Go Back to Resources" route="/bs-resource" back />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HelpFriends;