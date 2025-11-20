"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LyricLine = {
  id: string;
  text: string;
  duration: number;
};

const LINES: LyricLine[] = [
  { id: "intro", text: "Peekaboo time! Let's sing together!", duration: 2000 },
  { id: "l1", text: "Johny, Johny", duration: 1800 },
  { id: "l2", text: "Yes, Papa", duration: 1800 },
  { id: "l3", text: "Eating sugar?", duration: 2000 },
  { id: "l4", text: "No, Papa", duration: 1800 },
  { id: "l5", text: "Telling lies?", duration: 1900 },
  { id: "l6", text: "No, Papa", duration: 1800 },
  { id: "l7", text: "Open your mouth", duration: 2000 },
  { id: "l8", text: "Ha, ha, ha!", duration: 2000 }
];

const totalDuration = LINES.reduce((sum, line) => sum + line.duration, 0);

const speechSupport =
  typeof window !== "undefined" && "speechSynthesis" in window;

function singLine(line: LyricLine) {
  if (!speechSupport) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(line.text);
  utterance.lang = "en-US";
  utterance.pitch = 1.45;
  utterance.rate = 0.92;
  utterance.volume = 0.95;
  const voices = window.speechSynthesis.getVoices();
  const animatedVoice =
    voices.find((voice) => /child|girl|boy/i.test(voice.name)) ?? voices[0];
  if (animatedVoice) {
    utterance.voice = animatedVoice;
  }
  window.speechSynthesis.speak(utterance);
}

function cancelSong() {
  if (!speechSupport) {
    return;
  }
  window.speechSynthesis.cancel();
}

const PeekabooCharacter = () => (
  <svg viewBox="0 0 400 480" role="img" aria-labelledby="peekabooTitle">
    <title id="peekabooTitle">
      Peekaboo cartoon buddy singing Johny Johny Yes Papa
    </title>
    <defs>
      <linearGradient
        id="bodyGradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#fed170" />
        <stop offset="100%" stopColor="#ff9fae" />
      </linearGradient>
      <linearGradient
        id="faceGradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#ffd9e7" />
        <stop offset="100%" stopColor="#ffb5bd" />
      </linearGradient>
    </defs>
    <g transform="translate(200 240)">
      <g>
        <ellipse
          cx="0"
          cy="200"
          rx="110"
          ry="110"
          fill="url(#bodyGradient)"
          opacity="0.9"
        />
        <path
          d="M -85 170 C -45 120, 45 120, 85 170 C 55 230, -55 230, -85 170"
          fill="#ffbfcd"
          opacity="0.85"
        />
      </g>
      <g transform="translate(0 -60)">
        <ellipse
          cx="0"
          cy="0"
          rx="120"
          ry="140"
          fill="url(#faceGradient)"
        />
        <ellipse cx="-40" cy="-20" rx="30" ry="22" fill="#ffffff" />
        <ellipse cx="40" cy="-20" rx="30" ry="22" fill="#ffffff" />
        <circle
          className="peekaboo-eyes"
          cx="-40"
          cy="-20"
          r="12"
          fill="#352c44"
        />
        <circle
          className="peekaboo-eyes"
          cx="40"
          cy="-20"
          r="12"
          fill="#352c44"
        />
        <ellipse
          cx="0"
          cy="25"
          rx="45"
          ry="35"
          fill="#ff94ae"
          opacity="0.8"
        />
        <path
          className="mouth"
          d="M -30 40 Q 0 75 30 40 Q 0 65 -30 40"
          fill="#352c44"
        />
        <path
          d="M -65 -60 Q 0 -110 65 -60"
          stroke="#352c44"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </g>
      <g className="peekaboo-hands">
        <path
          d="M -130 0 C -120 -60, -60 -80, -40 -20 C -80 0, -110 40, -130 0"
          fill="#ffd4e1"
        />
        <path
          d="M 130 0 C 120 -60, 60 -80, 40 -20 C 80 0, 110 40, 130 0"
          fill="#ffd4e1"
        />
      </g>
      <g transform="translate(0 140)">
        <rect
          x="-90"
          y="-40"
          width="180"
          height="120"
          rx="70"
          fill="#5ec2b7"
        />
        <path
          d="M -70 60 Q 0 100 70 60"
          stroke="rgba(53,44,68,0.2)"
          strokeWidth="8"
          fill="none"
        />
      </g>
      <g transform="translate(0 260)">
        <ellipse cx="-60" cy="0" rx="32" ry="45" fill="#fed170" />
        <ellipse cx="60" cy="0" rx="32" ry="45" fill="#fed170" />
      </g>
    </g>
  </svg>
);

const FloatingNotes = () => (
  <>
    <span className="floating-note" style={{ left: "16%", bottom: "16%" }}>
      ♪
    </span>
    <span
      className="floating-note note-two"
      style={{ right: "22%", bottom: "18%" }}
    >
      ♫
    </span>
    <span
      className="floating-note note-three"
      style={{ left: "48%", bottom: "12%" }}
    >
      ♩
    </span>
  </>
);

const Sparkles = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => ({
        id: `spark-${index}`,
        top: Math.random() * 65 + 10,
        left: Math.random() * 70 + 15,
        delay: Math.random() * 6
      })),
    []
  );

  return (
    <>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        />
      ))}
    </>
  );
};

const PeekabooStage = () => (
  <div className="stage">
    <div className="stage-bg">
      <div className="scene-cloud" />
      <div className="scene-cloud secondary" />
      <Sparkles />
      <FloatingNotes />
    </div>
    <div className="character">
      <PeekabooCharacter />
    </div>
    <div className="stage-floor" />
  </div>
);

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    return () => {
      stopPlayback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopPlayback = () => {
    isPlayingRef.current = false;
    timeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    timeoutsRef.current = [];
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentLine(null);
    cancelSong();
  };

  const handlePlay = () => {
    stopPlayback();
    isPlayingRef.current = true;
    setIsPlaying(true);
    setCurrentLine(LINES[0].id);
    startTimeRef.current = performance.now();
    animateProgress();
    scheduleLyrics();
  };

  const animateProgress = () => {
    const frame = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const ratio = Math.min(elapsed / totalDuration, 1);
      setProgress(ratio * 100);
      if (ratio < 1 && isPlayingRef.current) {
        rafRef.current = requestAnimationFrame(frame);
      } else if (ratio >= 1) {
        isPlayingRef.current = false;
        setIsPlaying(false);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  };

  const scheduleLyrics = () => {
    let accumulated = 0;
    LINES.forEach((line, index) => {
      const timeoutId = window.setTimeout(() => {
        setCurrentLine(line.id);
        singLine(line);
        if (index === LINES.length - 1) {
          const endTimeout = window.setTimeout(() => {
            stopPlayback();
          }, line.duration);
          timeoutsRef.current.push(endTimeout);
        }
      }, accumulated);
      timeoutsRef.current.push(timeoutId);
      accumulated += line.duration;
    });
  };

  const handlePause = () => {
    stopPlayback();
  };

  const highlightLine = (lineId: string) =>
    currentLine === lineId ? "lyrics-line active" : "lyrics-line";

  const formatProgress = Math.round(progress);

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="title-block">
          <h1>Peekaboo Sing-Along</h1>
          <p>
            Watch our playful peekaboo buddy perform the classic nursery rhyme
            &ldquo;Johny Johny Yes Papa&rdquo; and sing along as the lyrics light
            up in rhythm.
          </p>
          <div className="control-panel">
            <button
              className="button"
              type="button"
              onClick={handlePlay}
              disabled={isPlaying}
            >
              {isPlaying ? "Singing..." : "Play Performance"}
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={handlePause}
              disabled={!isPlaying}
            >
              Pause
            </button>
          </div>
          <div className="timeline" aria-hidden={!isPlaying}>
            <h3>Performance Progress · {formatProgress}%</h3>
            <div className="timeline-track">
              <div
                className="timeline-progress"
                style={{ "--progress": `${progress}%` } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
        <PeekabooStage />
      </section>
      <section className="lyrics-card" aria-live="polite">
        <h2>Johny Johny Yes Papa</h2>
        {LINES.filter((line) => line.id !== "intro").map((line) => (
          <p key={line.id} className={highlightLine(line.id)}>
            <span>{line.text}</span>
          </p>
        ))}
      </section>
    </main>
  );
}
