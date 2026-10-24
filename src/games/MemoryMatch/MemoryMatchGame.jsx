import React, { useState, useEffect, useRef } from 'react';
import sound from '../../utils/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Timer, Hash, Volume2, VolumeX, Sparkles } from 'lucide-react';
import './MemoryMatch.css';

const CARD_ICONS = [
  { id: 'saturn', icon: '🪐', name: 'Ringed Planet' },
  { id: 'rocket', icon: '🚀', name: 'Space Shuttle' },
  { id: 'ufo', icon: '🛸', name: 'Alien Saucer' },
  { id: 'lightning', icon: '⚡', name: 'Plasma Bolt' },
  { id: 'crystal', icon: '🔮', name: 'Cosmic Orb' },
  { id: 'star', icon: '🌟', name: 'Nova Star' },
  { id: 'alien', icon: '👾', name: 'Invader' },
  { id: 'gem', icon: '💎', name: 'Aether Gem' }
];

// Shuffle array
const shuffleDeck = () => {
  const deck = [...CARD_ICONS, ...CARD_ICONS].map((item, index) => ({
    uid: `${item.id}-${index}-${Math.random()}`,
    pairId: item.id,
    icon: item.icon,
    name: item.name
  }));

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export default function MemoryMatchGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // Array of indexes
  const [matchedPairs, setMatchedPairs] = useState([]); // Array of pairIds
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bestMoves, setBestMoves] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(!sound.isMuted());
  const timerRef = useRef(null);

  // Initialize deck and load best score
  useEffect(() => {
    restartGame();
    try {
      const saved = localStorage.getItem('pixelplay_memory_best');
      if (saved) setBestMoves(parseInt(saved, 10));
    } catch {
      // LocalStorage access fallback
    }
    return () => clearInterval(timerRef.current);
  }, []);

  // Timer runner
  useEffect(() => {
    if (isGameActive && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isGameActive, isGameOver]);

  // Handle card click
  const handleCardClick = (index) => {
    if (!isGameActive && !isGameOver) {
      setIsGameActive(true);
    }

    // Ignore if already 2 cards flipped, or clicked same card, or already matched
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedPairs.includes(cards[index].pairId)
    ) {
      return;
    }

    if (soundEnabled) sound.playFlip();

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    // If this is the second card flipped in the turn
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          if (soundEnabled) sound.playMatch();
          setMatchedPairs(prev => {
            const next = [...prev, firstCard.pairId];
            if (next.length === CARD_ICONS.length) {
              // Game Won!
              handleVictory(moves + 1);
            }
            return next;
          });
          setFlippedCards([]);
        }, 350);
      } else {
        // NO MATCH -> Flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 850);
      }
    }
  };

  const handleVictory = (finalMoves) => {
    setIsGameOver(true);
    setIsGameActive(false);
    if (soundEnabled) sound.playWin();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#00f0ff', '#f59e0b', '#10b981']
    });

    try {
      const saved = localStorage.getItem('pixelplay_memory_best');
      const prevBest = saved ? parseInt(saved, 10) : Infinity;
      if (finalMoves < prevBest) {
        setBestMoves(finalMoves);
        localStorage.setItem('pixelplay_memory_best', finalMoves.toString());
      }
    } catch {
      // Ignore
    }
  };

  const restartGame = () => {
    setCards(shuffleDeck());
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setIsGameActive(false);
    setIsGameOver(false);
    clearInterval(timerRef.current);
    if (soundEnabled) sound.playClick();
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(!newState);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="memory-container">
      {/* Top Header */}
      <div className="memory-header">
        <div className="memory-stats-group">
          <div className="memory-stat-pill">
            <Timer size={16} className="stat-icon cyan" />
            <span className="stat-label">Time:</span>
            <span className="stat-value">{formatTime(timer)}</span>
          </div>
          <div className="memory-stat-pill">
            <Hash size={16} className="stat-icon purple" />
            <span className="stat-label">Moves:</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="memory-stat-pill">
            <Trophy size={16} className="stat-icon gold" />
            <span className="stat-label">Best:</span>
            <span className="stat-value">{bestMoves ? `${bestMoves} moves` : '--'}</span>
          </div>
        </div>

        <button
          type="button"
          className="memory-sound-btn"
          onClick={toggleSound}
          title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Victory Alert Banner */}
      {isGameOver && (
        <div className="memory-win-banner">
          <div className="win-content">
            <div className="win-title">
              <Sparkles size={24} /> Cosmic Alignment Achieved! 🎉
            </div>
            <p className="win-desc">
              You cleared all 8 celestial pairs in <strong>{moves} moves</strong> and <strong>{formatTime(timer)}</strong>!
            </p>
          </div>
          <button
            type="button"
            className="btn-play-again"
            onClick={restartGame}
            aria-label="Play Again"
          >
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      )}

      {/* 4x4 Grid of Cards */}
      <div className="memory-grid" role="grid" aria-label="Cosmic Memory Match Grid">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index) || matchedPairs.includes(card.pairId);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <div
              key={card.uid}
              className={`memory-card-wrapper ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(index);
                }
              }}
              aria-label={`Card ${index + 1}: ${isFlipped ? card.name : 'Hidden cosmic relic'}`}
            >
              <div className="memory-card-inner">
                {/* Back side (Face down) */}
                <div className="card-face card-back">
                  <div className="card-back-pattern">
                    <span className="rune-sigil">✦</span>
                  </div>
                </div>
                {/* Front side (Face up) */}
                <div className="card-face card-front">
                  <span className="card-emoji">{card.icon}</span>
                  <span className="card-name">{card.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restart & Reset Bar */}
      <div className="memory-actions">
        <button
          type="button"
          className="btn-memory-restart"
          onClick={restartGame}
          aria-label="Restart and Shuffle Memory Board"
        >
          <RotateCcw size={18} /> Restart & Shuffle
        </button>
        <div className="memory-pairs-counter">
          Matched: <strong>{matchedPairs.length}</strong> / {CARD_ICONS.length} Pairs
        </div>
      </div>
    </div>
  );
}
