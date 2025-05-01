import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Button,
  tokens,
  shorthands,
  ProgressBar,
  Divider,
} from "@fluentui/react-components";
import {
  Alert24Regular,
  Chat24Regular,
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
  PeopleTeam24Regular,
  ShieldCheckmark24Regular,
} from "@fluentui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BSNavLink from "../components/BSLinks/BSNavLink";
import QuizImage1 from "../assets/images/quiz/Quiz_1.jpg";
import QuizImage2 from "../assets/images/quiz/Quiz_2.jpg";
import QuizImage3 from "../assets/images/quiz/Quiz_3.jpg";
import QuizImage4 from "../assets/images/quiz/Quiz_4.jpg";
import QuizImage5 from "../assets/images/quiz/Quiz_5.jpg";

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
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "fit-content",
    alignSelf: "center",

    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  grid: {
    alignSelf: "center",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  card: {
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: tokens.shadow16,
      cursor: "pointer",
    },
  },
  icon: {
    marginBottom: "0.75rem",
    color: tokens.colorBrandForeground1,
    fontSize: "32px",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: "0.4rem",
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: tokens.colorNeutralForeground3,
  },
  divider: {
    maxHeight: "1px",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
});

const images = [QuizImage1, QuizImage2, QuizImage3, QuizImage4, QuizImage5];

const challengeDatalocal = [
  {
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
  {
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
  {
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
  {
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
  {
    question: `Your friend keeps getting weird DMs from someone at school. They tell you it’s fine — but you can tell it’s bothering them. What do you do?`,
    options: [
      "Let them deal with it on their own",
      "Offer to help them report it or talk to someone",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Just offering support shows you’ve got their back — even if they say they’re okay.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "It’s tempting to step back, but friends check in even when it's awkward.\nYou don’t have to fix it — just show up.",
    },
  },
  {
    question: `You see your friend getting roasted in a group chat. They try to joke back, but they seem upset. What do you do?`,
    options: [
      "Drop a laughing emoji to go with the flow",
      "DM them privately and ask if they’re okay",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Quiet support can mean everything — even a quick “You okay?” shows you care.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Going with the crowd might feel easier, but it can add to the harm.\nSupport privately if you’re not ready to speak up publicly.",
    },
  },
  {
    question: `Your friend tells you they’re thinking of deleting all their socials. They’ve been getting negative comments nonstop. What do you do?`,
    options: [
      "Say “Yeah maybe that’s best” and move on",
      "Ask them what’s been happening and if they want help reporting",
    ],
    correctIndex: 1,
    correctFeedback: {
      title: "You chose right!",
      message:
        "Listening comes first. Then you can support them in taking action — together.",
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Brushing it off might make them feel even more alone.\nTake a minute to listen. It matters more than you think.",
    },
  },
  {
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
        'Checking in privately shows support — even quiet kindness makes a big impact.\n\n🟣 "Hey, just wanted to check if you\'re okay. That didn’t seem cool."',
    },
    incorrectFeedback: {
      title: "Not quite.",
      message:
        "Laughing along can make the person feel even more alone.\nEven if you don’t mean harm, silence or reaction can be misread.\n\n🟣 Try checking in with them privately instead — it shows you care.",
    },
  },
  {
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
    question:
      "You overhear a conversation where someone says: “She deserves it, she always acts better than everyone.”\nLater, that same person leaves harsh comments on her TikTok.\nWhat do you do?",
    options: [
      "Call it out with: “That’s not cool — chill.”",
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

const resourceCards = [
  {
    icon: <Alert24Regular fontSize={32} />,
    title: "Spotting Cyberbullying",
    desc: "Know the signs before it gets worse.",
    route: "/spotting-cyberbullying",
  },
  {
    icon: <ShieldCheckmark24Regular fontSize={32} />,
    title: "What to do if you’re Targeted",
    desc: "Step-by-step actions to protect yourself.",
    route: "/what-to-do-if-targeted",
  },
  {
    icon: <PeopleTeam24Regular fontSize={32} />,
    title: "Helping a Friend",
    desc: "Be the reason someone feels safe again.",
    route: "/help-friends",
  },
  {
    icon: <Chat24Regular fontSize={32} />,
    title: "When it Happens in Group Chats",
    desc: "What to do when the whole vibe goes toxic.",
    route: "/group-chat-guidance",
  },
];

const imageSequence = Array.from({ length: images.length }, (_, i) => i).sort(
  () => Math.random() - 0.5
);

export default function BSDailyQuiz() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  type Challenge = {
    question: string;
    options: string[];
    correctIndex: number;
    correctFeedback: { title: string; message: string };
    incorrectFeedback: { title: string; message: string };
  };

  const [challengeData, setChallengeData] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`/api/random-challenges`);
        if (!response.ok) {
          throw new Error("Failed to fetch challenges");
        }
        const data = await response.json();
        setChallengeData(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchChallenges();
  }, []);

  const question = challengeData[step];
  const totalCount = challengeData.length;

  const handleOptionSelect = (index: number) => {
    setSelectedIndex(index);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedIndex === question.correctIndex) {
      setCorrectCount(correctCount + 1);
    }
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

  return (
    <div className={styles.outerContainer}>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <ProgressBar thickness="medium" value={undefined} />
          <p>Loading questions...</p>
        </div>
      ) : challengeData.length > 0 ? (
        !showFinal && (
          <>
            <div className={styles.leftPanel}>
              <h2 className={styles.scenarioTitle}>Question {step + 1}</h2>
              <img
                src={images[imageSequence[step]]}
                alt="Scenario"
                className={styles.scenarioImage}
              />
              <div className={styles.scenarioIndex}>
                Question {step + 1}/{totalCount}
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  marginBottom: "1rem",
                }}
              >
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
                    onClick={() => {}}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor:
                        i === step
                          ? tokens.colorBrandBackground
                          : tokens.colorNeutralStroke2,
                      border: `1px solid ${tokens.colorNeutralStroke2}`,
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
                    {selectedIndex === question.correctIndex ? (
                      <>
                        <CheckmarkCircle24Filled
                          style={{
                            color: tokens.colorStatusSuccessForeground1,
                          }}
                        />
                        <p
                          style={{
                            color: tokens.colorStatusSuccessForeground1,
                          }}
                        >
                          {question.correctFeedback.title +
                            "\n" +
                            question.correctFeedback.message}
                        </p>
                        <div className={styles.buttonRow}>
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
                          style={{ color: tokens.colorStatusDangerForeground1 }}
                        >
                          {question.incorrectFeedback.title +
                            "\n" +
                            question.incorrectFeedback.message}
                        </p>
                        <div className={styles.buttonRow}>
                          <Button appearance="primary" onClick={handleNext}>
                            {step === totalCount - 1 ? "Finish" : "Next"}
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
                    <h3 className={styles.questionText}>{question.question}</h3>
                    <div className={styles.optionList}>
                      {question.options.map((opt, idx) => (
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
        )
      ) : (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>No challenges available. Please try again later.</p>
        </div>
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
            {correctCount >= 3 && `Great Job 🎉`}
            {correctCount < 3 && `Keep Trying!`}
          </h2>
          <div
            style={{
              lineHeight: "1.6",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            You've completed the challenges! Your score is {correctCount} out of{" "}
            {totalCount}.
          </div>
          <Button
            className={styles.button}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Divider className={styles.divider} />
          <div
            style={{
              lineHeight: "1.6",
              textAlign: "center",
            }}
          >
            Wanna learn more about how to handle bullying? Check out the
            resources below:
          </div>
          <div className={styles.grid}>
            {resourceCards.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => navigate(item.route)}
              >
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={styles.cardDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.backLink}>
            <BSNavLink text="Go Back to Home" route="/" back />
          </div>
        </motion.div>
      )}
    </div>
  );
}
