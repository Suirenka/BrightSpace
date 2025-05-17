import React, { useState } from 'react';
import styles from '../components/BSBoundary.module.css';
import BSNavLink from "../components/BSLinks/BSNavLink";
import BackToTopButton from "../components/BackToTopButton";
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const categories: Record<string, string[]> = {
  Messaging: ['I turn off read receipts', 'I take my time to reply', 'I mute group chats'],
  Friends: ["I don't follow people who make me feel small", 'I block drama accounts', "I don't compare my life to theirs"],
  Posting: ["I pause before posting when I'm upset", "I don't post to impress", "I double-check how it might come across"],
  Reactions: ["I don't clap back when I'm angry", "I pause before replying in arguments", "I don't respond to bait"],
  Privacy: ["I don't share my location", "I limit my story to close friends", "I don't share private screenshots"],
  TimeOnline: ["I unplug at least once a day", "I don't scroll before bed", "I take breaks from socials"],
  Emotional: ["I don't post when overwhelmed", "I log off when I feel drained", "I journal instead of ranting online"],
  MentalSpace: ["I say no to things that drain me", "I give myself permission to not reply", "I protect my peace, always"]
};

const categoryIcons: Record<string, string> = {
  Messaging: '🗨',
  Friends: '👥',
  Posting: '📸',
  Reactions: '💬',
  Privacy: '🔒',
  TimeOnline: '⏰',
  Emotional: '💖',
  MentalSpace: '🧘',
};

const categoryKeys = Object.keys(categories);
const walls = Array.from({ length: 8 }, (_, i) => `wall-${i + 1}`);

export default function BSBoundary(): JSX.Element {
  const [wallAssignments, setWallAssignments] = useState<Record<string, string>>({});

  const handleSelect = (wallId: string, selectedValue: string) => {
    setWallAssignments(prev => ({ ...prev, [wallId]: selectedValue }));
  };

  const handleClear = (wallId: string) => {
    setWallAssignments(prev => {
      const updated = { ...prev };
      delete updated[wallId];
      return updated;
    });
  };

  const assignedValues = Object.values(wallAssignments);
  const isComplete = Object.keys(wallAssignments).length === walls.length;

  const handleDownload = () => {
    const element = document.getElementById('exportArea');
    if (element) {
      html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-digital-boundaries.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.introSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: 0.2
          }}
        >
          Build My Boundaries
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: 0.6
          }}
        >
          Your online life, your values.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            delay: 0.8
          }}
        >
          In a world full of noise, boundaries bring peace. Imagine this is your digital space — you&apos;re at the center.
          The walls around you represent areas of your online life. You choose what protects you. Each wall gets
          stronger with a principle you believe in.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: 1.2
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('instruction')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          Start Building
        </motion.button>
      </motion.div>

      <div id="canvas" className={styles.canvasSection}>
        <p id="instruction" className={styles.instructions}>
          Choose a principle from the dropdown for each wall.
        </p>

        <div className={styles.wallGrid}>
          {walls.map((wallId, index) => {
            const category = categoryKeys[index];
            const options = categories[category].filter(item => !assignedValues.includes(item));
            return (
              <div key={wallId} className={`${styles.wall} ${wallAssignments[wallId] ? styles.filled : styles.empty}`}>
                <div className={styles.wallCategory}>
                  {categoryIcons[category]} {category}
                </div>
                {wallAssignments[wallId] ? (
                  <div className={styles.filledContent}>
                    <span className={styles.wallValue}>{wallAssignments[wallId]}</span>
                    <button className={styles.clearButton} onClick={() => handleClear(wallId)}>×</button>
                  </div>
                ) : (
                  <select
                    className={styles.dropdownSelect}
                    onChange={(e) => handleSelect(wallId, e.target.value)}
                    value={wallAssignments[wallId] || ''}
                  >
                    <option value="" disabled>Tell me what you think?</option>
                    {options.map(item => (
                      <option key={item} value={item}>
                        {`${categoryIcons[category]} ${item}`}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
        </div>

        {isComplete && (
          <div className={styles.finalStep}>
            <h2>Your Boundaries Are Set</h2>
            <p>You&apos;ve created a space that reflects you. Download your board as a reminder of what keeps you grounded and confident online.</p>

            <div id="exportArea" className={styles.exportArea}>
              <h3>My Digital Boundaries</h3>
              {categoryKeys.map(cat => {
                const selectedItems = categories[cat].filter(val => assignedValues.includes(val));
                if (selectedItems.length === 0) return null;
                return (
                  <div key={cat} style={{ width: "100%", marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "1.25rem", color: "#1d4ed8", marginBottom: "0.5rem" }}>
                      {categoryIcons[cat]} {cat}
                    </h4>
                    <ul style={{ paddingLeft: "1.5rem", margin: 0, listStyleType: "none" }}>
                      {selectedItems.map(item => (
                        <li key={item} style={{ fontSize: "1rem", color: "#555", marginBottom: "0.25rem" }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <button onClick={handleDownload}>Download My Board</button>
            <button onClick={() => setWallAssignments({})}>Start Over</button>
          </div>
        )}
      </div>

      <div className={styles.navWrapper}>
        <BSNavLink text={"Go Back to Home"} route={"/"} back={true} />
      </div>
      <BackToTopButton />
    </div>
  );
}
