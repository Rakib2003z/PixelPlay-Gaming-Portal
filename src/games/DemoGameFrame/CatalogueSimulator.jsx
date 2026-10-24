import React, { useRef, useEffect, useState, useCallback } from 'react';
import sound from '../../utils/sound';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Shield, Flame, Compass, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import './CatalogueSimulator.css';

export default function CatalogueSimulator({ game }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(!sound.isMuted());

  // Game state stored in ref for the 60fps loop
  const stateRef = useRef({
    player: { x: 250, y: 320, vx: 0, vy: 0, speed: 5, size: 22 },
    items: [],
    hazards: [],
    particles: [],
    keys: { left: false, right: false, up: false, down: false, space: false },
    score: 0,
    lives: 3,
    lastSpawn: 0,
    bgOffset: 0
  });

  const mode = game?.simulatorMode || 'dodge';

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isPaused || isGameOver) return;
      const k = stateRef.current.keys;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { k.left = true; e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { k.right = true; e.preventDefault(); }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { k.up = true; e.preventDefault(); }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') { k.down = true; e.preventDefault(); }
      if (e.key === ' ' || e.key === 'Spacebar') { k.space = true; e.preventDefault(); }
    };

    const handleKeyUp = (e) => {
      const k = stateRef.current.keys;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') k.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') k.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') k.up = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') k.down = false;
      if (e.key === ' ' || e.key === 'Spacebar') k.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, isPaused, isGameOver]);

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isPlaying || isPaused || isGameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    const loop = (timestamp) => {
      const state = stateRef.current;
      const { player, keys } = state;

      // Update Player Movement
      if (keys.left && player.x > player.size) player.x -= player.speed;
      if (keys.right && player.x < width - player.size) player.x += player.speed;
      if (keys.up && player.y > player.size) player.y -= player.speed;
      if (keys.down && player.y < height - player.size) player.y += player.speed;

      // Spawn Hazards & Items
      if (timestamp - state.lastSpawn > 800) {
        state.lastSpawn = timestamp;
        
        // Spawn Hazard
        state.hazards.push({
          x: Math.random() * (width - 40) + 20,
          y: -20,
          vy: Math.random() * 2 + 3,
          size: 16,
          color: '#ef4444'
        });

        // Spawn Collectible Item
        if (Math.random() < 0.7) {
          state.items.push({
            x: Math.random() * (width - 40) + 20,
            y: -20,
            vy: Math.random() * 1.5 + 2,
            size: 12,
            color: game?.accentColor || '#00f0ff'
          });
        }
      }

      // Update background parallax offset
      state.bgOffset = (state.bgOffset + 2) % 40;

      // Clear Screen
      ctx.fillStyle = '#0b0e17';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid / Road
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = state.bgOffset; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Collectibles
      for (let i = state.items.length - 1; i >= 0; i--) {
        const item = state.items[i];
        item.y += item.vy;

        // Collision Check with Player
        const dist = Math.hypot(player.x - item.x, player.y - item.y);
        if (dist < player.size + item.size) {
          state.score += 50;
          setScore(state.score);
          if (soundEnabled) sound.playMatch();

          // Spawn burst particles
          for (let p = 0; p < 8; p++) {
            state.particles.push({
              x: item.x,
              y: item.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 1,
              color: item.color
            });
          }

          state.items.splice(i, 1);
          continue;
        }

        // Draw item
        ctx.fillStyle = item.color;
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (item.y > height + 20) state.items.splice(i, 1);
      }

      // Update & Draw Hazards
      for (let i = state.hazards.length - 1; i >= 0; i--) {
        const haz = state.hazards[i];
        haz.y += haz.vy;

        // Collision Check with Player
        const dist = Math.hypot(player.x - haz.x, player.y - haz.y);
        if (dist < player.size + haz.size) {
          state.lives -= 1;
          setLives(state.lives);
          if (soundEnabled) sound.playDraw();

          // Shockwave particles
          for (let p = 0; p < 12; p++) {
            state.particles.push({
              x: haz.x,
              y: haz.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              life: 1,
              color: '#ef4444'
            });
          }

          state.hazards.splice(i, 1);

          if (state.lives <= 0) {
            setIsGameOver(true);
            setIsPlaying(false);
            return;
          }
          continue;
        }

        // Draw hazard
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(haz.x, haz.y, haz.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (haz.y > height + 20) state.hazards.splice(i, 1);
      }

      // Update & Draw Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.globalAlpha = 1.0;
      }

      // Draw Player Ship / Avatar
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.shadowColor = game?.accentColor || '#00f0ff';
      ctx.shadowBlur = 18;

      // Draw custom player ship
      ctx.fillStyle = game?.accentColor || '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(0, -player.size);
      ctx.lineTo(player.size, player.size);
      ctx.lineTo(0, player.size * 0.5);
      ctx.lineTo(-player.size, player.size);
      ctx.closePath();
      ctx.fill();

      // Cockpit glow
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPlaying, isPaused, isGameOver, soundEnabled, game]);

  // Start game session
  const startGame = () => {
    stateRef.current = {
      player: { x: 250, y: 320, vx: 0, vy: 0, speed: 6, size: 22 },
      items: [],
      hazards: [],
      particles: [],
      keys: { left: false, right: false, up: false, down: false, space: false },
      score: 0,
      lives: 3,
      lastSpawn: 0,
      bgOffset: 0
    };
    setScore(0);
    setLives(3);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    if (soundEnabled) sound.playClick();
  };

  const togglePause = () => {
    setIsPaused(p => !p);
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(!newState);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Touch on-screen D-pad controls for mobile
  const handleTouchDown = (dir) => {
    if (stateRef.current.keys) stateRef.current.keys[dir] = true;
  };
  const handleTouchUp = (dir) => {
    if (stateRef.current.keys) stateRef.current.keys[dir] = false;
  };

  return (
    <div className="sim-wrapper" ref={containerRef}>
      {/* Top Simulator Control Bar */}
      <div className="sim-topbar">
        <div className="sim-title-group">
          <span className="sim-live-badge">LAB SANDBOX ENGINE</span>
          <span className="sim-mode-badge">{game?.title} Simulator</span>
        </div>

        <div className="sim-top-actions">
          <button
            type="button"
            className="sim-icon-btn"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute' : 'Unmute'}
            aria-label={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            type="button"
            className="sim-icon-btn"
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="sim-canvas-viewport">
        <canvas
          ref={canvasRef}
          width={500}
          height={380}
          className="sim-canvas"
        />

        {/* Live In-Game Overlay Stats */}
        {isPlaying && (
          <div className="sim-live-hud">
            <div className="hud-metric score-metric">
              Score: <strong>{score}</strong>
            </div>
            <div className="hud-metric lives-metric">
              Shield: {Array(lives).fill('🛡️').join(' ')}
            </div>
          </div>
        )}

        {/* Start Screen Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="sim-splash-overlay">
            <div className="sim-splash-icon" style={{ color: game?.accentColor || '#00f0ff' }}>
              {game?.icon || '🎮'}
            </div>
            <h3 className="sim-splash-title">{game?.title}</h3>
            <p className="sim-splash-tagline">{game?.tagline}</p>
            <div className="sim-notice-tag">
              ⚡ Lab Interactive Simulator Engine • Active Canvas Preview
            </div>
            <button
              type="button"
              className="btn-launch-sim"
              onClick={startGame}
              aria-label="Launch Game Simulator"
            >
              <Play size={20} /> Play Game Simulator Now
            </button>
          </div>
        )}

        {/* Game Over Screen Overlay */}
        {isGameOver && (
          <div className="sim-splash-overlay gameover-view">
            <h3 className="sim-splash-title text-danger">Shield Exhausted</h3>
            <p className="sim-splash-tagline">
              Your final simulator run tally: <strong>{score} points</strong>
            </p>
            <button
              type="button"
              className="btn-launch-sim"
              onClick={startGame}
              aria-label="Restart Simulator Run"
            >
              <RotateCcw size={18} /> Restart Simulator
            </button>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && (
          <div className="sim-splash-overlay paused-view">
            <h3 className="sim-splash-title">Simulation Paused</h3>
            <button
              type="button"
              className="btn-launch-sim"
              onClick={togglePause}
            >
              <Play size={18} /> Resume
            </button>
          </div>
        )}
      </div>

      {/* Simulator Bottom Controls */}
      <div className="sim-bottom-bar">
        <div className="sim-ctrl-group">
          {isPlaying ? (
            <>
              <button
                type="button"
                className="btn-sim-action"
                onClick={togglePause}
                aria-label={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />} {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                type="button"
                className="btn-sim-action secondary"
                onClick={startGame}
                aria-label="Restart Simulator"
              >
                <RotateCcw size={16} /> Restart
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-sim-action"
              onClick={startGame}
              aria-label="Start Game"
            >
              <Play size={16} /> Start Simulator
            </button>
          )}
        </div>

        <div className="sim-keys-hint">
          <span>Controls: <strong>WASD / Arrow Keys</strong> to pilot & collect</span>
        </div>
      </div>

      {/* On-screen touch D-Pad for Mobile & Tablet */}
      <div className="sim-touch-dpad" aria-label="On-Screen Touch Directional Pad">
        <div className="dpad-row">
          <button
            type="button"
            className="dpad-btn up"
            onPointerDown={() => handleTouchDown('up')}
            onPointerUp={() => handleTouchUp('up')}
            onPointerLeave={() => handleTouchUp('up')}
            aria-label="Move Up"
          >
            <ChevronUp size={20} />
          </button>
        </div>
        <div className="dpad-row middle">
          <button
            type="button"
            className="dpad-btn left"
            onPointerDown={() => handleTouchDown('left')}
            onPointerUp={() => handleTouchUp('left')}
            onPointerLeave={() => handleTouchUp('left')}
            aria-label="Move Left"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="dpad-center" />
          <button
            type="button"
            className="dpad-btn right"
            onPointerDown={() => handleTouchDown('right')}
            onPointerUp={() => handleTouchUp('right')}
            onPointerLeave={() => handleTouchUp('right')}
            aria-label="Move Right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="dpad-row">
          <button
            type="button"
            className="dpad-btn down"
            onPointerDown={() => handleTouchDown('down')}
            onPointerUp={() => handleTouchUp('down')}
            onPointerLeave={() => handleTouchUp('down')}
            aria-label="Move Down"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
