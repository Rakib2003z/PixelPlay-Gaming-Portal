import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchGames, getPopularGames } from '../data/games';
import { CATEGORIES } from '../data/categories';
import GameCard from '../components/GameCard';
import AdBanner from '../components/AdBanner';
import { Search, Frown, Sparkles, Filter, ChevronRight } from 'lucide-react';
import './SearchPage.css';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedCat, setSelectedCat] = useState('all');
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
    document.title = query ? `Search: "${query}" — PixelPlay` : 'Search Games — PixelPlay';
  }, [query]);

  const results = searchGames(query, selectedCat);
  const popularFallbacks = getPopularGames(3);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputValue.trim() });
  };

  return (
    <div className="search-page-root">
      <div className="search-page-container">
        {/* Breadcrumb */}
        <nav className="search-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="crumb-link">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-current">Search</span>
        </nav>

        {/* Search Header Form */}
        <div className="search-hero-box">
          <h1 className="search-page-heading">Search PixelPlay Games</h1>
          <form onSubmit={handleFormSubmit} className="search-page-form">
            <Search size={22} className="search-page-icon" />
            <input
              type="text"
              placeholder="Search by game title, category, tags..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="search-page-input"
            />
            <button type="submit" className="btn-search-execute">
              Search
            </button>
          </form>

          {/* Quick Category Filter Pills */}
          <div className="search-cat-pills">
            <span className="filter-label"><Filter size={14} /> Filter by:</span>
            <button
              type="button"
              className={`search-filter-pill ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              All Categories
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                type="button"
                className={`search-filter-pill ${selectedCat === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Metadata */}
        <div className="search-results-meta">
          <h2 className="results-count-title">
            {query ? (
              <>Found <strong>{results.length}</strong> {results.length === 1 ? 'game' : 'games'} matching &ldquo;{query}&rdquo;</>
            ) : (
              <>Showing <strong>{results.length}</strong> games</>
            )}
          </h2>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="search-games-grid">
            {results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="search-empty-state">
            <Frown size={54} className="empty-icon" />
            <h3 className="empty-title">No games matched &ldquo;{query}&rdquo;</h3>
            <p className="empty-desc">
              Try checking your spelling, exploring a broader term, or trying one of our popular recommended titles below:
            </p>

            <div className="empty-suggestions-grid">
              {popularFallbacks.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        <AdBanner slot="horizontal" format="Leaderboard 728x90" />
      </div>
    </div>
  );
}
