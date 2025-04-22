import React, { useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import styles from '../components/BSBoundary.module.css';
import CoachAvatar from '../assets/images/home/Coach.png';

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
        <button onClick={() => document.getElementById('canvas')?.scrollIntoView({ behavior: 'smooth' })}>
          Start Building
        </button>
      </motion.div>

      <div id="canvas" className={styles.canvasSection}>
        <p className={styles.instructions}>
          Drag a principle from the categories below into each wall slot. Choose what matters to you — messaging, friends, privacy, and more.
        </p>

        <div className={styles.canvasArea}>
          <img src={CoachAvatar} className={styles.avatar} alt="Child Avatar" />

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
            <button>Download My Board</button>
            <button onClick={() => setWallAssignments({})}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
}
