export interface Challenge {
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  correctFeedback: { title: string; message: string };
  incorrectFeedback: { title: string; message: string };
}

export const challengeData: Challenge[] = [
  {
    title: "Question 1: When Targeted",
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
