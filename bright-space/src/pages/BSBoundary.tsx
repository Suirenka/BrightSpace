import React, { useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import styles from '../components/BSBoundary.module.css';
import BSNavLink from "../components/BSLinks/BSNavLink";
import BackToTopButton from "../components/BackToTopButton";

const categories: Record<string, string[]> = {
  Messaging: ['I turn off read receipts', 'I take my time to reply', 'I mute group chats'],
  Friends: ['I don’t follow people who make me feel small', 'I block drama accounts', 'I don’t compare my life to theirs'],
  Posting: ['I pause before posting when I’m upset', 'I don’t post to impress', 'I double-check how it might come across'],
  Reactions: ['I don’t clap back when I’m angry', 'I pause before replying in arguments', 'I don’t respond to bait'],
  Privacy: ['I don’t share my location', 'I limit my story to close friends', 'I don’t share private screenshots'],
  TimeOnline: ['I unplug at least once a day', 'I don’t scroll before bed', 'I take breaks from socials'],
  Emotional: ['I don’t post when overwhelmed', 'I log off when I feel drained', 'I journal instead of ranting online'],
  MentalSpace: ['I say no to things that drain me', 'I give myself permission to not reply', 'I protect my peace, always'],
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

const walls = Array.from({ length: 8 }, (_, i) => `wall-${i + 1}`);

function DraggableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    zIndex: 999,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={styles.draggableItem}>
      {children}
    </div>
  );
}

function DroppableWall({ id, value }: { id: string; value?: string }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`${styles.wall} ${value ? styles.filled : styles.empty}`}
    >
      {value || 'Drop here'}
    </div>
  );
}

export default function BSBoundary(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('Messaging');
  const [wallAssignments, setWallAssignments] = useState<Record<string, string>>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over) {
      setWallAssignments(prev => ({ ...prev, [over.id as string]: active.id as string }));
    }
  };

  const isComplete = Object.keys(wallAssignments).length === walls.length;

  const handleDownload = () => {
    const element = document.getElementById('exportArea');
    if (element) {
      html2canvas(element).then((canvas: HTMLCanvasElement) => {
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Build My Boundaries</h1>
        <h3>Your online life, your values.</h3>
        <p>
          In a world full of noise, boundaries bring peace. Imagine this is your digital space — you're at the center.
          The walls around you represent areas of your online life. You choose what protects you. Each wall gets
          stronger with a principle you believe in.
        </p>
        <button
          style={{ marginBottom: "5rem" }}
          onClick={() => document.getElementById('canvas')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Building
        </button>
      </motion.div>

      <div id="canvas" className={styles.canvasSection}>
        <p className={styles.instructions}>
          Drag a principle from the categories below into each wall slot. Choose what matters to you — messaging, friends, privacy, and more.
        </p>

        <div className={styles.canvasArea}>
          <DndContext onDragEnd={handleDragEnd}>
            <div className={styles.wallGrid}>
              {walls.map(wallId => (
                <DroppableWall key={wallId} id={wallId} value={wallAssignments[wallId]} />
              ))}
            </div>

            <div className={styles.categoryTabs}>
              {Object.keys(categories).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? styles.activeTab : ''}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.valuePool}>
              {categories[selectedCategory].map(val => (
                <DraggableItem key={val} id={val}>
                  {val}
                </DraggableItem>
              ))}
            </div>
          </DndContext>
        </div>

        {isComplete && (
          <div className={styles.finalStep}>
            <h2>Your Boundaries Are Set</h2>
            <p>
              You’ve created a space that reflects you. Download your board as a reminder of what keeps you grounded and confident online.
            </p>

            <div id="exportArea" className={styles.exportArea}>
              <h3>My Digital Boundaries</h3>
              {Object.keys(categories).map((cat) => {
                const selectedItems = categories[cat].filter((val) =>
                  Object.values(wallAssignments).includes(val)
                );
                if (selectedItems.length === 0) return null;
                return (
                  <div key={cat} style={{ width: "100%", marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "1.25rem", color: "#1d4ed8", marginBottom: "0.5rem" }}>
                      {categoryIcons[cat]} {cat}
                    </h4>
                    <ul style={{ paddingLeft: "1.5rem", margin: 0, listStyleType: "none", }}>
                      {selectedItems.map((item) => (
                        <li key={item} style={{ fontSize: "1rem", color: "#555", marginBottom: "0.25rem" }}>
                          {item}
                        </li>
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