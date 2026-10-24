import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoryFilter from '../components/CategoryFilter';
import GameCard from '../components/GameCard';
import AdBanner from '../components/AdBanner';
import PremiumSection from '../components/PremiumSection';
import LeaderboardSection from '../components/LeaderboardSection';
import { GAMES, getPopularGames, getNewGames, getGamesByCategory } from '../data/games';
import { Flame, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const popularGames = getPopularGames(6);
  const newGames = getNewGames(6);
  const filteredGames = getGamesByCategory(selectedCategory);

  return (
    <div className="homepage-root">
      {/* 1. Large Featured Game Banner */}
      <HeroBanner />

      <main className="home-main-content">
        <div className="home-content-container">
          {/* 2. Category Filter Pills */}
          <section className="home-categories-section">
            <div className="section-title-wrap">
              <h2 className="section-title">
                <Gamepad2 size={22} className="title-icon cyan" />
                <span>Explore Game Categories</span>
              </h2>
              <span className="section-count">{GAMES.length} Titles Available</span>
            </div>
            <CategoryFilter
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </section>

          {/* If a category is selected (not 'all'), show filtered games view */}
          {selectedCategory !== 'all' ? (
            <section className="games-grid-section">
              <div className="section-title-wrap">
                <h2 className="section-title">
                  <Sparkles size={22} className="title-icon purple" />
                  <span>{selectedCategory.toUpperCase()} GAMES ({filteredGames.length})</span>
                </h2>
                <button
                  type="button"
                  className="btn-clear-cat"
                  onClick={() => setSelectedCategory('all')}
                >
                  Show All Categories
                </button>
              </div>

              <div className="games-card-grid">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          ) : (
            <>
              {/* 3. Popular Games Section */}
              <section className="games-grid-section">
                <div className="section-title-wrap">
                  <div className="title-with-pill">
                    <span className="section-badge hot">COMMUNITY FAVORITES</span>
                    <h2 className="section-title">
                      <Flame size={22} className="title-icon orange" />
                      <span>Popular Games</span>
                    </h2>
                  </div>
                  <Link to="/categories" className="section-view-all-link">
                    View Entire Catalogue <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="games-card-grid">
                  {popularGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </section>

              {/* 4. Clearly Marked Ad Placeholder #1 */}
              <AdBanner slot="horizontal" format="Leaderboard 728x90" />

              {/* 5. New & Trending Games Section */}
              <section className="games-grid-section">
                <div className="section-title-wrap">
                  <div className="title-with-pill">
                    <span className="section-badge new">FRESH RELEASES</span>
                    <h2 className="section-title">
                      <Sparkles size={22} className="title-icon cyan" />
                      <span>New & Trending Games</span>
                    </h2>
                  </div>
                  <Link to="/categories" className="section-view-all-link">
                    Browse More <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="games-card-grid">
                  {newGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* 6. Premium Section (Ad-free Membership Concept) */}
          <PremiumSection />

          {/* 7. Clearly Marked Ad Placeholder #2 */}
          <AdBanner slot="horizontal" format="Banner 970x90 (Demo)" />

          {/* 8. Sample Leaderboard with Demo Scores */}
          <LeaderboardSection />
        </div>
      </main>
    </div>
  );
}
