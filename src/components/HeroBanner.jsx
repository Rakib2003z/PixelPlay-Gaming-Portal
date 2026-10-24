import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Sparkles, Zap, ShieldCheck, Flame } from 'lucide-react';
import { getFeaturedGame } from '../data/games';
import './HeroBanner.css';

export default function HeroBanner() {
  const featuredGame = getFeaturedGame();

  if (!featuredGame) return null;

  return (
    <section className="hero-banner-section" aria-label="Featured Game Banner">
      <div className="hero-glow-bg" />
      
      <div className="hero-container">
        {/* Left Column: Game Info & CTA */}
        <div className="hero-info-col">
          <div className="hero-badge-group">
            <span className="hero-badge-pill highlight">
              <Sparkles size={14} /> FEATURED GAME OF THE DAY
            </span>
            <span className="hero-badge-pill rating">
              <Star size={13} fill="#facc15" stroke="none" /> {featuredGame.rating} ({featuredGame.ratingCount})
            </span>
            <span className="hero-badge-pill hot">
              <Flame size={13} /> {featuredGame.plays}
            </span>
          </div>

          <h1 className="hero-title">
            {featuredGame.title}
          </h1>

          <p className="hero-tagline">
            {featuredGame.tagline}
          </p>

          <p className="hero-description">
            {featuredGame.description}
          </p>

          {/* Feature Bullets */}
          <div className="hero-features-list">
            <div className="hero-feat-item">
              <Zap size={15} className="feat-icon cyan" />
              <span>Instant Browser Play</span>
            </div>
            <div className="hero-feat-item">
              <ShieldCheck size={15} className="feat-icon purple" />
              <span>Smart AI & 2-Player Duel</span>
            </div>
            <div className="hero-feat-item">
              <Sparkles size={15} className="feat-icon gold" />
              <span>Web Audio Synth SFX</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="hero-cta-group">
            <Link
              to={`/game/${featuredGame.id}`}
              className="btn-hero-play"
              aria-label={`Play ${featuredGame.title} now`}
            >
              <div className="btn-play-icon">
                <Play size={20} fill="#0b0e17" />
              </div>
              <span>PLAY NOW FOR FREE</span>
            </Link>

            <Link
              to={`/category/${featuredGame.category}`}
              className="btn-hero-more"
            >
              More {featuredGame.category.toUpperCase()} Games
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Preview Card */}
        <div className="hero-visual-col">
          <div className="hero-visual-card">
            <div className="card-ambient-aura" />
            <div className="hero-screen-mockup">
              {/* Grid visual art */}
              <div className="mockup-header">
                <span className="mockup-dot red" />
                <span className="mockup-dot yellow" />
                <span className="mockup-dot green" />
                <span className="mockup-url">pixelplay://games/{featuredGame.id}</span>
              </div>

              <div className="mockup-body">
                <div className="mockup-symbol-big x-symbol">✕</div>
                <div className="mockup-vs">VS</div>
                <div className="mockup-symbol-big o-symbol">○</div>
              </div>

              <div className="mockup-footer">
                <div className="mockup-badge">
                  <span className="live-dot" /> LIVE REACT MINI-GAME
                </div>
                <span className="mockup-tag">60 FPS Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
