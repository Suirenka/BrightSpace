export interface Challenge {
  question: string;
  options: string[];
  correctIndex: number;
  correctFeedback: { title: string; message: string };
  incorrectFeedback: { title: string; message: string };
}

export const challengeData = [
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
