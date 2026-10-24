import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Flame, Zap } from 'lucide-react';
import './GameCard.css';

export default function GameCard({ game }) {
  if (!game) return null;

  return (
    <article className="game-card" aria-label={`Game card: ${game.title}`}>
      <Link to={`/game/${game.id}`} className="game-card-link">
        {/* Thumbnail Preview Area */}
        <div
          className="game-thumbnail"
          style={{ background: game.gradient }}
        >
          {/* Top Badges */}
          <div className="card-top-badges">
            {game.badge && (
              <span className={`card-badge ${game.badge.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                {game.badge}
              </span>
            )}
            <span className="card-rating-badge">
              <Star size={11} fill="#facc15" stroke="none" />
              <span>{game.rating}</span>
            </span>
          </div>

          {/* Central Artwork Icon */}
          <div className="card-artwork-symbol" style={{ textShadow: `0 0 20px ${game.accentColor}` }}>
            {game.icon}
          </div>

          {/* Hover Play Button Overlay */}
          <div className="card-hover-overlay">
            <div className="card-play-bubble">
              <Play size={22} fill="#0b0e17" />
            </div>
            <span className="card-play-text">PLAY NOW</span>
          </div>

          {/* Bottom strip inside thumbnail */}
          <div className="card-thumb-bottom">
            <span className="card-cat-tag">{game.category.toUpperCase()}</span>
            <span className="card-plays-tag">
              <Flame size={12} /> {game.plays}
            </span>
          </div>
        </div>

        {/* Card Content Info */}
        <div className="game-card-body">
          <h3 className="game-card-title">{game.title}</h3>
          <p className="game-card-tagline">{game.tagline}</p>
          
          <div className="game-card-footer">
            <span className="game-card-engine">
              {game.engine === 'arcade-simulator' ? 'Arcade Simulator' : 'Playable Mini-Game'}
            </span>
            <span className="game-card-arrow">Play →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
