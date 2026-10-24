import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Gamepad2, 
  Search, 
  Trophy, 
  Crown, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Grid, 
  Flame, 
  Sparkles,
  Info,
  Home
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { searchGames } from '../data/games';
import { CATEGORIES } from '../data/categories';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isVipMode, toggleVipMode, isSoundMuted, toggleSound, openModal, activeModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchBoxRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Handle live search autocomplete suggestions
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const results = searchGames(searchQuery).slice(0, 5);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Click outside listener for suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (gameId) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/game/${gameId}`);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo (clickable and linking to homepage) */}
        <Link to="/" className="navbar-logo" aria-label="PixelPlay Home">
          <div className="logo-icon-wrap">
            <Gamepad2 size={24} className="logo-gamepad" />
            <div className="logo-spark" />
          </div>
          <div className="logo-text-group">
            <span className="logo-title">Pixel<span className="logo-accent">Play</span></span>
            <span className="logo-sub">LAB PORTAL</span>
          </div>
        </Link>

        {/* Desktop Nav Links positioned after the logo with visible Home */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            <Home size={16} />
            <span>Home</span>
          </Link>

          <Link
            to="/categories"
            className={`nav-link ${location.pathname.startsWith('/categor') ? 'active' : ''}`}
            aria-current={location.pathname.startsWith('/categor') ? 'page' : undefined}
          >
            <Grid size={16} />
            <span>Categories</span>
          </Link>

          <Link
            to="/leaderboard"
            className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
            aria-current={location.pathname === '/leaderboard' ? 'page' : undefined}
          >
            <Trophy size={16} />
            <span>Leaderboard</span>
          </Link>

          <Link
            to="/premium"
            className={`nav-link premium-link ${location.pathname === '/premium' ? 'active' : ''}`}
            aria-current={location.pathname === '/premium' ? 'page' : undefined}
          >
            <Crown size={16} />
            <span>PixelPlay+</span>
            {isVipMode && <span className="vip-active-chip">ACTIVE</span>}
          </Link>

          <button
            type="button"
            className={`nav-link btn-link ${activeModal === 'about' ? 'active' : ''}`}
            onClick={() => openModal('about')}
            aria-label="About PixelPlay"
          >
            <Info size={16} />
            <span>About</span>
          </button>
        </nav>

        {/* Global Search Bar with Live Suggestions Dropdown */}
        <div className="navbar-search-wrapper" ref={searchBoxRef}>
          <form onSubmit={handleSearchSubmit} className="search-form" role="search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search games, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              className="search-input"
              aria-label="Search all games"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
                aria-label="Clear search text"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              <div className="suggestions-header">Quick Matches</div>
              {suggestions.map((game) => (
                <div
                  key={game.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(game.id)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="sugg-icon">{game.icon}</span>
                  <div className="sugg-details">
                    <span className="sugg-title">{game.title}</span>
                    <span className="sugg-category">{game.category.toUpperCase()}</span>
                  </div>
                  <span className="sugg-badge">{game.rating} ★</span>
                </div>
              ))}
              <button
                type="button"
                className="suggestion-view-all"
                onClick={handleSearchSubmit}
              >
                View all results for &ldquo;{searchQuery}&rdquo; →
              </button>
            </div>
          )}
        </div>

        {/* Right Action Icons (Sound & VIP Toggle & Mobile Menu) */}
        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-tool-btn"
            onClick={toggleSound}
            title={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isSoundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            type="button"
            className={`navbar-vip-pill ${isVipMode ? 'vip-on' : ''}`}
            onClick={toggleVipMode}
            title={isVipMode ? 'PixelPlay Plus Demo Active (Click to toggle)' : 'Test VIP Ad-Free Demo'}
            aria-label="Toggle VIP Demo Mode"
          >
            <Crown size={14} />
            <span>{isVipMode ? 'VIP Active' : 'VIP Demo'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-inner">
            <div className="mobile-search-area">
              <form onSubmit={handleSearchSubmit} className="mobile-search-form">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </form>
            </div>

            <nav className="mobile-nav-links">
              <Link 
                to="/" 
                className={`mobile-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                <Home size={18} /> Home
              </Link>
              <Link 
                to="/categories" 
                className={`mobile-link ${location.pathname.startsWith('/categor') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={location.pathname.startsWith('/categor') ? 'page' : undefined}
              >
                <Grid size={18} /> All Categories
              </Link>
              <div className="mobile-category-chips">
                {CATEGORIES.map(c => (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    className={`mobile-cat-pill ${location.pathname === `/category/${c.id}` ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link 
                to="/leaderboard" 
                className={`mobile-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={location.pathname === '/leaderboard' ? 'page' : undefined}
              >
                <Trophy size={18} /> Leaderboard
              </Link>
              <Link 
                to="/premium" 
                className={`mobile-link ${location.pathname === '/premium' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={location.pathname === '/premium' ? 'page' : undefined}
              >
                <Crown size={18} /> PixelPlay+ Premium (Demo)
              </Link>
              <button
                type="button"
                className={`mobile-link btn-link ${activeModal === 'about' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); openModal('about'); }}
              >
                <Info size={18} /> About PixelPlay
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <div className="mobile-vip-banner">
                <Crown size={16} className="text-gold" />
                <span>VIP Demo Mode: <strong>{isVipMode ? 'Active (Ads Hidden)' : 'Disabled'}</strong></span>
                <button
                  type="button"
                  className="btn-switch-vip"
                  onClick={toggleVipMode}
                >
                  {isVipMode ? 'Turn Off' : 'Activate VIP'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
