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
  introText: {
    fontSize: "1rem",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.6",
    marginTop: "1rem",
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
  sectionTitle: {
    fontWeight: "600",
    fontSize: "1.15rem",
    marginBottom: "0.6rem",
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
  backButtonStyled: {
    backgroundColor: "white",
    color: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorBrandForeground1}`,
  },
});

const questions = [
  {
    text: `🎯 Scenario 1\nYou post a photo. Someone comments: “No one asked” and others like it. What do you do?\n\nOption A: Delete the post immediately and say nothing\nOption B: Screenshot it, report the comment, and block the person`,
    correct: "B",
    correctFeedback: `✅ You chose right!\nSaving the proof and reporting it protects you — and blocking keeps your space safe.\nYou don’t have to respond to stay strong.`,
    wrongFeedback: `❌ Not quite.\nDeleting the post might seem easiest, but that lets the harm slide.\nTake control by reporting and blocking — you deserve a safe space.`,
  },
  {
    text: `🎯 Scenario 2\nYou get a DM saying, “You should just quit trying.” It feels aggressive and personal. What do you do?\n\nOption A: Respond with “lol ok” to make it seem like you don’t care\nOption B: Don’t reply, block the sender, and tell someone you trust`,
    correct: "B",
    correctFeedback: `✅ You chose right!\nYou don’t owe anyone a response. Blocking + talking to someone builds real support.\nProtecting your peace is strength.`,
    wrongFeedback: `❌ Not quite.\nTrying to play it cool can leave the door open for more.\nInstead, take action — and get support.`,
  },
  {
    text: `🎯 Scenario 3\nYou’ve been left out of a class group chat. When you ask about it, someone says “It’s not for everyone.” What do you do?\n\nOption A: Pretend it doesn’t bother you and try harder to fit in\nOption B: Talk to a teacher or counselor about what’s happening`,
    correct: "B",
    correctFeedback: `✅ You chose right!\nExclusion can be a form of bullying. It’s okay to speak up about how it’s affecting you.`,
    wrongFeedback: `❌ Not quite.\nTrying to force yourself in doesn’t solve it.\nYou deserve to be included — asking for help is a strong move.`,
  },
];

const WhatToDoIfTargeted = () => {
  const styles = useStyles();
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

  const navigate = useNavigate();

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
            <Title1 className={styles.title}>What To Do If You’re Targeted</Title1>
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
                      <Button
                        onClick={() => {
                          setSelected(null);
                          setIsCorrect(null);
                        }}
                      >
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
          <Title1 className={styles.title}>Great Job 🎉</Title1>
          <div style={{ lineHeight: "1.6", marginTop: "1rem", marginBottom: "2rem" }}>
            You've completed the scenarios! Here are some quick reminders to help you stay safe:
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>1. 🧘 Stay Calm: </Text>
            <Text className={styles.paragraph}>
              It's okay to feel upset. Take a deep breath — responding when emotional may make things worse.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>2. 🚫 Don’t Engage: </Text>
            <Text className={styles.paragraph}>
              You don’t have to reply. Bullies often want a reaction — silence can be powerful.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>3. 🚷 Block and Report: </Text>
            <Text className={styles.paragraph}>
              Use the platform’s tools to block the person and report the content. You have the right to feel safe online.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>4. 📸 Save the Evidence: </Text>
            <Text className={styles.paragraph}>
              Take screenshots of mean messages, posts, or DMs. This helps if you need to report them later.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>5. 🗣️ Tell Someone You Trust: </Text>
            <Text className={styles.paragraph}>
              You’re not alone. Talk to a parent, teacher, friend, or counselor — support makes a big difference.
            </Text>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>6. 🛡️ Get More Support if Needed: </Text>
            <Text className={styles.paragraph}>
              If things get serious or threatening, reach out to school staff or local authorities for help.
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

export default WhatToDoIfTargeted;
