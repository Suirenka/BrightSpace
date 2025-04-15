import React, { useState } from "react";
import {
  makeStyles,
  tokens,
  shorthands,
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
    backgroundColor: tokens.colorNeutralBackground1,
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
  subtitleCenter: {
    textAlign: "center",
    lineHeight: "1.7",
    marginTop: "1rem",
    marginBottom: "2rem",
    color: tokens.colorNeutralForeground3,
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
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
    color: tokens.colorStatusSuccessForeground1,
    fontStyle: "italic",
  },
  wrongText: {
    color: tokens.colorStatusDangerForeground1,
    fontStyle: "italic",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  nextButton: {
    backgroundColor: tokens.colorPaletteLavenderBackground2,
    color: tokens.colorNeutralForegroundInverted,
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
      transform: "scale(1.05",
      boxShadow: tokens.shadow16,
      cursor: "pointer",
    },
  },
  suggestionText: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
  },
  bold: {
    fontWeight: 600,
  },
  backLink: {
    marginTop: "2.5rem",
    textAlign: "center",
  },
  paragraph: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.7",
  },
  introText: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.6",
    marginTop: "1rem",
    textAlign: "center",
    maxWidth: "700px",
  },
});

const questions = [
  {
    text: `🎯 Scenario 1\nYour friend keeps getting weird DMs from someone at school. They tell you it’s fine — but you can tell it’s bothering them. What do you do?\n\nOption A: Let them deal with it on their own\nOption B: Offer to help them report it or talk to someone`,
    correct: "B",
    correctFeedback: `✅ You chose right!\nJust offering support shows you’ve got their back — even if they say they’re okay.`,
    wrongFeedback: `❌ Not quite.\nIt’s tempting to step back, but friends check in even when it's awkward.\nYou don’t have to fix it — just show up.`,
  },
  {
    text: `🎯 Scenario 2\nYou see your friend getting roasted in a group chat. They try to joke back, but they seem upset. What do you do?\n\nOption A: DM them privately and ask if they’re okay\nOption B: Drop a laughing emoji to go with the flow`,
    correct: "A",
    correctFeedback: `✅ You chose right!\nQuiet support can mean everything — even a quick “You okay?” shows you care.`,
    wrongFeedback: `❌ Not quite.\nGoing with the crowd might feel easier, but it can add to the harm.\nSupport privately if you’re not ready to speak up publicly.`,
  },
  {
    text: `🎯 Scenario 3\nYour friend tells you they’re thinking of deleting all their socials. They’ve been getting negative comments nonstop. What do you do?\n\nOption A: Say “Yeah maybe that’s best” and move on\nOption B: Ask them what’s been happening and if they want help reporting`,
    correct: "B",
    correctFeedback: `✅ You chose right!\nListening comes first. Then you can support them in taking action — together.`,
    wrongFeedback: `❌ Not quite.\nBrushing it off might make them feel even more alone.\nTake a minute to listen. It matters more than you think.`,
  },
];

const HelpFriends = () => {
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

  const handleBack = () => {
    if (step === 0) {
      navigate("/bs-resource");
    } else {
      setStep(step - 1);
      setSelected(null);
      setIsCorrect(null);
    }
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
            <Title1 className={styles.title}>Helping a Friend</Title1>
            {step === 0 && (
              <div className={styles.introText}>
                Let’s see how you handle a few real-life moments. You can try again if you pick the wrong option.
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
                      <Button className={styles.nextButton} onClick={handleNext}>
                        {step === questions.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DismissCircle24Filled style={{ color: "#b91c1c" }} />
                    <div className={styles.wrongText}>{current.wrongFeedback}</div>
                    <div className={styles.buttonRow}>
                      <Button onClick={() => {
                        setSelected(null);
                        setIsCorrect(null);
                      }}>
                        Try Again
                      </Button>
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
            If you notice a friend being bullied online, your support can make all the difference.
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              👥 Reach out privately: Let them know you're there for them without putting them on the spot.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              👂 Be a listener: Let them talk — don’t interrupt or judge.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              💬 Show kindness: Small words of encouragement go a long way.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              🛟 Help them get support: Suggest talking to a trusted adult or using a helpline.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.paragraph}>
              🌟 Lead by example: Model respectful behavior online and speak up when needed.
            </Text>
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
