import React, { useState } from "react";
import {
  makeStyles,
  Button,
  tokens,
  shorthands,
  ProgressBar,
  Title1,
  Subtitle1,
} from "@fluentui/react-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import BSNavLink from "../../components/BSLinks/BSNavLink";


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
  scenarioText: {
    fontSize: "1rem",
    fontWeight: 600,
    textAlign: "left",
    marginTop: "1.5rem",
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
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  correctText: {
    color: "#15803d",
    fontStyle: "italic",
  },
  wrongText: {
    color: "#b91c1c",
    fontStyle: "italic",
  },
  backButtonStyled: {
    backgroundColor: "white",
    color: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorBrandForeground1}`,
  },
  nextButton: {
    backgroundColor: "#a78bfa",
    color: "white",
  },
  section: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.8rem",
    maxWidth: "750px",
    width: "100%",
    boxShadow: tokens.shadow4,
    textAlign: "left",
    transition: "transform 0.3s ease",
    cursor: "pointer",
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
  
});

const scenariosData = [
  {
    question: `🎯 Scenario 1 of 3:\nYou're in a group chat: Someone keeps sending sarcastic replies to the same person, and others are laughing along. What do you do?\n\nOption A: Add a laughing emoji to the message\nOption B: DM the person being targeted to check in`,
    correct: "B",
    correctTitle: "You chose right!",
    correctDesc: `Checking in privately shows support — even quiet kindness makes a big impact.\n🟣 \"Hey, just wanted to check if you're okay. That didn’t seem cool.\"`,
    wrongTitle: "Not quite.",
    wrongDesc: `Laughing along can make the person feel even more alone.\nEven if you don’t mean harm, silence or reaction can be misread.\n🟣 Try checking in with them privately instead — it shows you care.`,
  },
  {
    question: `Scenario 2 of 3:\nYou see a post on someone’s story tagging another student with a mean caption.\nIt’s been up for hours, and people are reacting with laughing emojis.\nWhat do you do?\n\nOption A: Ignore it — it’s not your business\nOption B: Report the story and check on the tagged person`,
    correct: "B",
    correctTitle: "You chose right!",
    correctDesc: `Reporting helps stop the spread, and checking in lets the person know they’re not alone.\n🟣 “Hey, just saw that story. I reported it — that wasn’t okay. You good?”`,
    wrongTitle: "Not quite.",
    wrongDesc: `It might feel easier to scroll past, but doing nothing lets harm keep happening.\n🟣 Try reporting it and showing support — it’s a small action that means a lot.`,
  },
  {
    question: `Scenario 3 of 3:\nYou overhear a conversation where someone says:\n“She deserves it, she always acts better than everyone.”\nLater, that same person leaves harsh comments on her TikTok.\nWhat do you do?\n\nOption A: Call it out with: “That’s not cool — chill.”\nOption B: Stay out of it — you don’t want drama`,
    correct: "A",
    correctTitle: "You chose right!",
    correctDesc: `A simple call-out can shift the tone and make others pause.\nStanding up doesn’t mean fighting — just setting the vibe.`,
    wrongTitle: "Not quite.",
    wrongDesc: `It’s okay to not want drama, but silence can feel like approval.\nEven one calm comment can help someone feel supported.`,
  },
];

const SpottingCyberbullying = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFinal, setShowFinal] = useState(false);
  const scenario = scenariosData[step];
  const progress = ((step + (isCorrect ? 1 : 0)) / scenariosData.length) * 100;

  const handleSelect = (choice: "A" | "B") => {
    setSelected(choice);
    setIsCorrect(choice === scenario.correct);
  };

  const handleNext = () => {
    if (step < scenariosData.length - 1) {
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
            <Title1 className={styles.title}>Spotting Cyberbullying 🎯</Title1>
            {step === 0 && (
              <div className={styles.introText}>
                🎯📌 Let’s see how you'd handle a few real-life moments. You can try again if you pick the wrong option.🎯
              </div>
            )}
            <div className={styles.scenarioText}>{scenario.question.split("\n")[0]}</div>
            <div className={styles.question}>{scenario.question.split("\n").slice(1).join("\n")}</div>
            <div className={styles.optionButtons}>
              <Button className={styles.answerButton} appearance={selected === "A" ? "primary" : "outline"} onClick={() => handleSelect("A")} disabled={selected !== null}>A</Button>
              <Button className={styles.answerButton} appearance={selected === "B" ? "primary" : "outline"} onClick={() => handleSelect("B")} disabled={selected !== null}>B</Button>
            </div>
            {selected && isCorrect === true && (
              <motion.div className={styles.feedback} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                <CheckmarkCircle24Filled style={{ color: "#15803d" }} />
                <div className={styles.correctText}>{scenario.correctTitle}<br />{scenario.correctDesc}</div>
                <div className={styles.buttonRow}>
                  <Button className={styles.backButtonStyled} onClick={handleBack}>Back</Button>
                  <Button className={styles.nextButton} onClick={handleNext}>{step === scenariosData.length - 1 ? "Finish" : "Next"}</Button>
                </div>
              </motion.div>
            )}
            {selected && isCorrect === false && (
          <motion.div
            className={styles.feedback}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <DismissCircle24Filled style={{ color: "#b91c1c" }} />
            <div className={styles.wrongText}>{scenario.wrongTitle}<br />{scenario.wrongDesc}</div>
            <div className={styles.buttonRow}>
              <Button onClick={() => {
                setSelected(null);
                setIsCorrect(null);
              }}>
                Try Again
              </Button>
            </div>
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
            <Subtitle1 className={styles.subtitle}>🔍 Common Signs</Subtitle1>
            <ul className={styles.list}>
              <li>Repeated mean or sarcastic comments</li>
              <li>Being left out of group chats on purpose</li>
              <li>Fake accounts mocking you or your friends</li>
              <li>Screenshots of your messages or posts shared without consent</li>
            </ul>
          </div>
          <div className={styles.section}>
            <Subtitle1 className={styles.subtitle}>📍 Where it Happens</Subtitle1>
            <div className={styles.paragraph}>
              Instagram, TikTok, Snapchat, Discord, group chats, gaming voice channels — bullying can happen anywhere people interact online.
            </div>
          </div>
          <div className={styles.section}>
            <Subtitle1 className={styles.subtitle}>💡 What You Can Do</Subtitle1>
            <ul className={styles.list}>
              <li>Block the person</li>
              <li>Screenshot and save evidence</li>
              <li>Report the post or comment</li>
              <li>Talk to someone you trust</li>
              <li>If it’s happening to someone else — check in with them</li>
            </ul>
          </div>
          <div className={styles.section}>
            <Subtitle1 className={styles.subtitle}>📌 Reminder</Subtitle1>
            <div className={styles.paragraph}>
              You don’t have to fix everything — just being able to spot when something feels off is a powerful first step.
            </div>
          </div>
          <BSNavLink text="Go Back to Resources" route="/bs-resource" back={true}/>
        </motion.div>
      )}
    </div>
  );
};

export default SpottingCyberbullying;