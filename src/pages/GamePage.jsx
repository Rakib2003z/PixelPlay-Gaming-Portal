import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGameById, getGamesByCategory } from '../data/games';
import { useApp } from '../context/AppContext';
import TicTacToeGame from '../games/TicTacToe/TicTacToeGame';
import MemoryMatchGame from '../games/MemoryMatch/MemoryMatchGame';
import SpeedClickerGame from '../games/SpeedClicker/SpeedClickerGame';
import CatalogueSimulator from '../games/DemoGameFrame/CatalogueSimulator';
import GameCard from '../components/GameCard';
import AdBanner from '../components/AdBanner';
import { 
  ChevronRight, 
  Gamepad2, 
  Star, 
  Flame, 
  Share2, 
  Info, 
  Keyboard, 
  Lightbulb, 
  ShieldCheck, 
  Calendar, 
  User, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import './GamePage.css';

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const game = getGameById(id);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if (game) {
      document.title = `${game.title} — Play Free on PixelPlay`;
    }
  }, [id, game]);

  if (!game) {
    return (
      <div className="game-not-found-container">
        <div className="not-found-card">
          <Gamepad2 size={64} className="ghost-icon" />
          <h2>Game Not Found</h2>
          <p>The game identifier &ldquo;{id}&rdquo; does not exist in our catalog.</p>
          <Link to="/" className="btn-back-lobby">
            <ArrowLeft size={16} /> Return to Home Lobby
          </Link>
        </div>
      </div>
    );
  }

  // Related games in same category excluding current
  const relatedGames = getGamesByCategory(game.category)
    .filter(g => g.id !== game.id)
    .slice(0, 3);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 Game link copied to clipboard!');
    } else {
      showToast('🔗 Game link ready to share!');
    }
  };

  return (
    <div className="game-page-root">
      <div className="game-page-container">
        {/* Breadcrumb Navigation */}
        <nav className="game-breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/" className="crumb-link">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <Link to={`/category/${game.category}`} className="crumb-link">
            {game.category.toUpperCase()}
          </Link>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-current">{game.title}</span>
        </nav>

        {/* Game Title Bar */}
        <div className="game-title-bar">
          <div className="title-left">
            <div className="game-primary-icon">{game.icon}</div>
            <div>
              <h1 className="game-heading">{game.title}</h1>
              <p className="game-subtitle">{game.tagline}</p>
            </div>
          </div>

          <div className="title-actions">
            <button
              type="button"
              className="btn-game-share"
              onClick={handleShareClick}
              title="Share this game"
              aria-label="Share Game Link"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        {/* Main Game Stage / Viewport */}
        <div className="game-viewport-card" role="region" aria-label="Active Game Screen">
          {game.engine === 'tictactoe' && <TicTacToeGame />}
          {game.engine === 'memorymatch' && <MemoryMatchGame />}
          {game.engine === 'speedclicker' && <SpeedClickerGame />}
          {game.engine === 'arcade-simulator' && <CatalogueSimulator game={game} />}
        </div>

        {/* Lower Grid: Instructions & Details Sidebar */}
        <div className="game-info-grid">
          {/* Left Column: Instructions, Controls & Strategy */}
          <div className="game-guide-column">
            {/* How to Play Section */}
            <section className="guide-card" aria-labelledby="how-to-play-heading">
              <h2 id="how-to-play-heading" className="guide-card-title">
                <Info size={20} className="guide-icon cyan" />
                <span>How to Play & Objective</span>
              </h2>
              <p className="guide-goal-callout">
                <strong>Goal:</strong> {game.instructions.goal}
              </p>
              <ol className="guide-steps-list">
                {game.instructions.howToPlay.map((step, idx) => (
                  <li key={idx} className="guide-step-item">
                    <span className="step-num">{idx + 1}</span>
                    <span className="step-text">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Controls Mapping */}
            <section className="guide-card" aria-labelledby="controls-heading">
              <h2 id="controls-heading" className="guide-card-title">
                <Keyboard size={20} className="guide-icon purple" />
                <span>Key Controls & Input</span>
              </h2>
              <div className="controls-table">
                {game.instructions.controls.map((ctrl, idx) => (
                  <div key={idx} className="control-row">
                    <span className="key-badge">{ctrl.key}</span>
                    <span className="action-label">{ctrl.action}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tactical Tips */}
            <section className="guide-card" aria-labelledby="tips-heading">
              <h2 id="tips-heading" className="guide-card-title">
                <Lightbulb size={20} className="guide-icon gold" />
                <span>Tactical Tips & Secrets</span>
              </h2>
              <ul className="guide-tips-list">
                {game.instructions.tips.map((tip, idx) => (
                  <li key={idx} className="tip-item">
                    <Sparkles size={16} className="tip-star" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Game Specifications Sidebar */}
          <aside className="game-specs-sidebar" aria-label="Game Metadata">
            <div className="sidebar-card">
              <h3 className="specs-title">Game Specifications</h3>

              <div className="spec-row">
                <span className="spec-label">Rating:</span>
                <span className="spec-val text-gold">
                  <Star size={14} fill="#facc15" stroke="none" /> {game.rating} / 5 ({game.ratingCount})
                </span>
              </div>

              <div className="spec-row">
                <span className="spec-label">Category:</span>
                <Link to={`/category/${game.category}`} className="spec-val spec-link">
                  {game.category.toUpperCase()}
                </Link>
              </div>

              <div className="spec-row">
                <span className="spec-label">Total Plays:</span>
                <span className="spec-val">
                  <Flame size={14} className="text-red" /> {game.plays}
                </span>
              </div>

              <div className="spec-row">
                <span className="spec-label">Engine:</span>
                <span className="spec-val text-cyan">
                  {game.engine === 'arcade-simulator' ? 'Canvas 60FPS Simulator' : 'Native React Mini-Game'}
                </span>
              </div>

              <div className="spec-row">
                <span className="spec-label">Developer:</span>
                <span className="spec-val">{game.developer}</span>
              </div>

              <div className="spec-row">
                <span className="spec-label">Released:</span>
                <span className="spec-val">{game.releaseDate}</span>
              </div>

              <div className="spec-row">
                <span className="spec-label">Platform:</span>
                <span className="spec-val">Web (Desktop, Tablet, Mobile)</span>
              </div>

              <div className="spec-badge-box">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Verified Safe • No Downloads Needed</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Ad Placement */}
        <AdBanner slot="horizontal" format="Leaderboard 728x90" />

        {/* Related Games in this Category */}
        {relatedGames.length > 0 && (
          <section className="related-games-section">
            <h2 className="related-title">
              More {game.category.toUpperCase()} Games
            </h2>
            <div className="games-card-grid">
              {relatedGames.map((rel) => (
                <GameCard key={rel.id} game={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
