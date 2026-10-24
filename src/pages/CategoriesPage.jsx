import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, getCategoryById } from '../data/categories';
import { GAMES, getGamesByCategory } from '../data/games';
import GameCard from '../components/GameCard';
import AdBanner from '../components/AdBanner';
import { Grid, ArrowUpDown, ChevronRight, Gamepad2, Sparkles, Flame, Zap, Compass, Brain, Puzzle } from 'lucide-react';
import './CategoriesPage.css';

const ICON_MAP = {
  Puzzle,
  Flame,
  Zap,
  Gamepad2,
  Compass,
  Brain
};

export default function CategoriesPage() {
  const { categoryId } = useParams();
  const [selectedCat, setSelectedCat] = useState(categoryId || 'all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'rating' | 'newest' | 'name'

  useEffect(() => {
    if (categoryId) {
      setSelectedCat(categoryId);
      const cat = getCategoryById(categoryId);
      if (cat) {
        document.title = `${cat.name} Games — PixelPlay Gaming Portal`;
      }
    } else {
      setSelectedCat('all');
      document.title = 'Browse All Categories — PixelPlay Gaming Portal';
    }
  }, [categoryId]);

  let gamesList = getGamesByCategory(selectedCat);

  // Sorting
  gamesList = [...gamesList].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    // default: popular
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  const activeCategoryMeta = getCategoryById(selectedCat);

  return (
    <div className="categories-page-root">
      <div className="categories-page-container">
        {/* Breadcrumb */}
        <nav className="cat-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="crumb-link">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <Link to="/categories" className="crumb-link">Categories</Link>
          {activeCategoryMeta && (
            <>
              <ChevronRight size={14} className="crumb-sep" />
              <span className="crumb-current">{activeCategoryMeta.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="cat-page-header">
          <h1 className="cat-page-title">
            {activeCategoryMeta ? `${activeCategoryMeta.name} Games` : 'Game Categories & Catalogue'}
          </h1>
          <p className="cat-page-sub">
            {activeCategoryMeta
              ? activeCategoryMeta.description
              : 'Choose your realm: explore puzzles, lightning-fast action, orbital racers, retro arcade, adventures and neural brain workouts.'}
          </p>
        </div>

        {/* Category Cards Carousel / Grid */}
        <div className="cat-overview-grid">
          <button
            type="button"
            className={`cat-overview-card ${selectedCat === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCat('all')}
          >
            <div className="cat-card-icon-wrap" style={{ background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff' }}>
              <Grid size={22} />
            </div>
            <div className="cat-card-details">
              <span className="cat-card-name">All Games</span>
              <span className="cat-card-count">{GAMES.length} Titles</span>
            </div>
          </button>

          {CATEGORIES.map(cat => {
            const IconComp = ICON_MAP[cat.icon] || Gamepad2;
            const isCurrent = selectedCat === cat.id;
            const count = GAMES.filter(g => g.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                className={`cat-overview-card ${isCurrent ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                <div
                  className="cat-card-icon-wrap"
                  style={{ background: `rgba(${cat.color === '#ef4444' ? '239, 68, 68' : '139, 92, 246'}, 0.15)`, color: cat.color }}
                >
                  <IconComp size={22} />
                </div>
                <div className="cat-card-details">
                  <span className="cat-card-name">{cat.name}</span>
                  <span className="cat-card-count">{count} Games</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter & Sorting Controls Toolbar */}
        <div className="cat-toolbar">
          <div className="toolbar-left">
            <span className="showing-label">
              Showing <strong>{gamesList.length}</strong> {activeCategoryMeta ? activeCategoryMeta.name : ''} Games
            </span>
          </div>

          <div className="toolbar-right">
            <div className="sort-group">
              <ArrowUpDown size={15} className="sort-icon" />
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated (★)</option>
                <option value="newest">New Releases</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="cat-games-grid">
          {gamesList.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Ad Placement */}
        <AdBanner slot="horizontal" format="Leaderboard 728x90" />
      </div>
    </div>
  );
}
