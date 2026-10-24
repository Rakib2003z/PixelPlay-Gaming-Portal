import React, { useState, useEffect, useRef, useCallback } from 'react';
import sound from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Target, Zap, Award, Flame, Volume2, VolumeX } from 'lucide-react';
import './SpeedClicker.css';

export default function SpeedClickerGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [target, setTarget] = useState(null); // { x: %, y: %, id: number, type: 'normal'|'gold'|'fast' }
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(!sound.isMuted());

  const arenaRef = useRef(null);
  const targetTimerRef = useRef(null);
  const countdownRef = useRef(null);

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixelplay_reflex_high');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // Ignore
    }
  }, []);

  // Spawn new target
  const spawnTarget = useCallback(() => {
    // Generate random positions between 10% and 85% to stay well inside the arena
    const x = Math.floor(Math.random() * 75) + 10;
    const y = Math.floor(Math.random() * 75) + 10;
    
    // Rare golden bonus target
    const isGold = Math.random() < 0.18;
    
    setTarget({
      x,
      y,
      id: Date.now() + Math.random(),
      isGold,
      radius: isGold ? 28 : 34
    });
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      countdownRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            endGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdownRef.current);
    }
    return () => clearInterval(countdownRef.current);
  }, [isPlaying, timeLeft]);

  // Target expiry timer
  useEffect(() => {
    if (isPlaying && target) {
      // target stays on screen for 1.1s (or 0.85s for golden) before shifting
      const lifespan = target.isGold ? 850 : 1200;
      targetTimerRef.current = setTimeout(() => {
        // Missed target!
        setCombo(0);
        spawnTarget();
      }, lifespan);
    }
    return () => clearTimeout(targetTimerRef.current);
  }, [isPlaying, target, spawnTarget]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setTimeLeft(30);
    setScore(0);
    setHits(0);
    setMisses(0);
    setCombo(0);
    setMaxCombo(0);
    spawnTarget();
    if (soundEnabled) sound.playClick();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setTarget(null);
    clearTimeout(targetTimerRef.current);
    clearInterval(countdownRef.current);

    if (soundEnabled) sound.playWin();

    setScore(finalScore => {
      try {
        const saved = localStorage.getItem('pixelplay_reflex_high');
        const prevHigh = saved ? parseInt(saved, 10) : 0;
        if (finalScore > prevHigh) {
          setHighScore(finalScore);
          localStorage.setItem('pixelplay_reflex_high', finalScore.toString());
          confetti({
            particleCount: 90,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      } catch {
        // Ignore
      }
      return finalScore;
    });
  };

  const handleTargetClick = (e) => {
    e.stopPropagation();
    if (!isPlaying) return;

    if (soundEnabled) sound.playMatch();

    clearTimeout(targetTimerRef.current);
    const newHits = hits + 1;
    const newCombo = combo + 1;
    setHits(newHits);
    setCombo(newCombo);
    if (newCombo > maxCombo) setMaxCombo(newCombo);

    // Score formula based on gold status and combo multiplier
    const multiplier = newCombo >= 10 ? 3 : (newCombo >= 5 ? 2 : 1);
    const points = (target.isGold ? 250 : 100) * multiplier;
    setScore(s => s + points);

    spawnTarget();
  };

  const handleArenaClick = (e) => {
    if (!isPlaying) return;
    // User clicked background arena instead of target -> miss!
    setMisses(m => m + 1);
    setCombo(0);
    if (soundEnabled) sound.playDraw();
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(!newState);
  };

  const getRankTier = () => {
    if (score >= 4000) return { tier: 'S-TIER', color: '#00f0ff', desc: 'Cyber Legend Reflexes!' };
    if (score >= 2800) return { tier: 'A-TIER', color: '#10b981', desc: 'Pro Gamer Speed!' };
    if (score >= 1800) return { tier: 'B-TIER', color: '#f59e0b', desc: 'Sharp Neural Response!' };
    return { tier: 'C-TIER', color: '#94a3b8', desc: 'Warming Up! Try Again.' };
  };

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className="speed-container">
      {/* Top Bar */}
      <div className="speed-header">
        <div className="speed-stats-bar">
          <div className="speed-stat-badge timer">
            <Zap size={16} />
            <span>Time: <strong>{timeLeft}s</strong></span>
          </div>
          <div className="speed-stat-badge score">
            <Target size={16} />
            <span>Score: <strong>{score}</strong></span>
          </div>
          <div className="speed-stat-badge combo">
            <Flame size={16} />
            <span>Combo: <strong>{combo}x</strong></span>
          </div>
          <div className="speed-stat-badge high">
            <Award size={16} />
            <span>Best: <strong>{highScore}</strong></span>
          </div>
        </div>

        <button
          type="button"
          className="speed-sound-btn"
          onClick={toggleSound}
          title={soundEnabled ? 'Mute' : 'Unmute'}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Cyber Clicker Arena */}
      <div
        className="speed-arena"
        ref={arenaRef}
        onClick={handleArenaClick}
        role="region"
        aria-label="Reflex Rush Click Target Arena"
      >
        {!isPlaying && !gameOver && (
          <div className="arena-overlay start-screen">
            <Target size={54} className="pulse-icon cyan" />
            <h3 className="overlay-title">Ready for Neural Speed Test?</h3>
            <p className="overlay-desc">
              Tap the glowing cyber nodes before they vanish! Build consecutive combos for 2x & 3x points.
            </p>
            <button
              type="button"
              className="btn-start-rush"
              onClick={startGame}
              aria-label="Start Reflex Rush Challenge"
            >
              <Play size={18} /> Start 30s Rush
            </button>
          </div>
        )}

        {gameOver && (
          <div className="arena-overlay game-over-screen">
            <div className="tier-badge" style={{ color: getRankTier().color, borderColor: getRankTier().color }}>
              {getRankTier().tier}
            </div>
            <h3 className="overlay-title">{getRankTier().desc}</h3>
            <div className="gameover-metrics">
              <div className="metric-box">
                <span className="m-label">Final Score</span>
                <span className="m-val text-cyan">{score}</span>
              </div>
              <div className="metric-box">
                <span className="m-label">Accuracy</span>
                <span className="m-val text-gold">{accuracy}%</span>
              </div>
              <div className="metric-box">
                <span className="m-label">Max Combo</span>
                <span className="m-val text-purple">{maxCombo}x</span>
              </div>
            </div>
            <button
              type="button"
              className="btn-start-rush"
              onClick={startGame}
              aria-label="Play Another Rush Round"
            >
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        )}

        {isPlaying && target && (
          <button
            type="button"
            className={`cyber-target ${target.isGold ? 'target-gold' : 'target-normal'}`}
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              width: `${target.radius * 2}px`,
              height: `${target.radius * 2}px`
            }}
            onClick={handleTargetClick}
            aria-label="Click Cyber Node"
          >
            <div className="target-core">
              {target.isGold ? '⚡' : '◈'}
            </div>
            <div className="target-pulse-ring" />
          </button>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="speed-actions">
        {isPlaying ? (
          <button
            type="button"
            className="btn-rush-control reset"
            onClick={endGame}
            aria-label="End Session Early"
          >
            <RotateCcw size={16} /> Stop Session
          </button>
        ) : (
          <button
            type="button"
            className="btn-rush-control primary"
            onClick={startGame}
            aria-label="Start Reflex Session"
          >
            <Play size={16} /> {gameOver ? 'Restart Round' : 'Start Session'}
          </button>
        )}
        <div className="speed-legend">
          <span>◈ Normal Node (100 pts)</span>
          <span className="gold-text">⚡ Gold Node (250 pts)</span>
        </div>
      </div>
    </div>
  );
}
