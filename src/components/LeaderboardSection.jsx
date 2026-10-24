import React, { useState } from 'react';
import { Trophy, Medal, Crown, Flame, AlertCircle, PlusCircle, Check } from 'lucide-react';
import { DEMO_LEADERBOARD } from '../data/leaderboard';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './LeaderboardSection.css';

export default function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState('allTime'); // 'allTime' | 'weekly' | 'daily'
  const [leaderboardData, setLeaderboardData] = useState(DEMO_LEADERBOARD);
  const [showSimModal, setShowSimModal] = useState(false);
  const [simName, setSimName] = useState('');
  const [simScore, setSimScore] = useState(85000);
  const [simGame, setSimGame] = useState('Neon Tic-Tac-Toe');
  const { isVipMode } = useApp();

  const currentList = leaderboardData[activeTab] || [];

  const handleSimulateSubmit = (e) => {
    e.preventDefault();
    if (!simName.trim()) return;

    const newEntry = {
      rank: 1, // Will be sorted
      username: simName.trim(),
      game: simGame,
      score: Number(simScore) || 50000,
      badge: isVipMode ? 'PixelPlay+ VIP' : 'Lab Challenger',
      country: '🎓',
      avatarBg: isVipMode ? '#f59e0b' : '#00f0ff'
    };

    setLeaderboardData(prev => {
      const updated = [...prev[activeTab], newEntry]
        .sort((a, b) => b.score - a.score)
        .map((item, idx) => ({ ...item, rank: idx + 1 }));
      return {
        ...prev,
        [activeTab]: updated.slice(0, 10)
      };
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    setShowSimModal(false);
    setSimName('');
  };

  return (
    <section className="leaderboard-section" aria-label="PixelPlay Demo Leaderboard">
      <div className="leaderboard-container">
        {/* Section Header */}
        <div className="lb-header">
          <div className="lb-title-group">
            <div className="lb-pill">
              <Trophy size={14} className="text-gold" />
              <span>GLOBAL HALL OF FAME</span>
            </div>
            <h2 className="lb-heading">PixelPlay Leaderboard</h2>
            <p className="lb-sub">
              Sample high scores recorded across all browser titles.
            </p>
          </div>

          <div className="lb-top-actions">
            <button
              type="button"
              className="btn-sim-score"
              onClick={() => setShowSimModal(true)}
              aria-label="Simulate adding your demo score"
            >
              <PlusCircle size={16} />
              <span>Test Submit My Score</span>
            </button>
          </div>
        </div>

        {/* Clear Demo Label */}
        <div className="lb-demo-disclaimer" role="note">
          <AlertCircle size={15} className="disc-icon" />
          <span>
            <strong>Academic Demo Notice:</strong> Leaderboard scores are simulated for lab evaluation. No backend database connection is needed for this frontend project.
          </span>
        </div>

        {/* Tabs */}
        <div className="lb-tabs-bar" role="tablist">
          <button
            type="button"
            className={`lb-tab ${activeTab === 'allTime' ? 'active' : ''}`}
            onClick={() => setActiveTab('allTime')}
            role="tab"
            aria-selected={activeTab === 'allTime'}
          >
            <Crown size={15} /> All-Time Legends
          </button>
          <button
            type="button"
            className={`lb-tab ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
            role="tab"
            aria-selected={activeTab === 'weekly'}
          >
            <Flame size={15} /> Weekly Champs
          </button>
          <button
            type="button"
            className={`lb-tab ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
            role="tab"
            aria-selected={activeTab === 'daily'}
          >
            <Medal size={15} /> Daily Rush
          </button>
        </div>

        {/* Table View */}
        <div className="lb-table-wrapper">
          <table className="lb-table" aria-label="Leaderboard Scores Table">
            <thead>
              <tr>
                <th scope="col" className="th-rank">Rank</th>
                <th scope="col" className="th-player">Player</th>
                <th scope="col" className="th-game">Featured Game</th>
                <th scope="col" className="th-badge">Honor Badge</th>
                <th scope="col" className="th-score text-right">Score (Pts)</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((entry) => {
                const isTop1 = entry.rank === 1;
                const isTop2 = entry.rank === 2;
                const isTop3 = entry.rank === 3;

                return (
                  <tr
                    key={`${entry.username}-${entry.rank}-${entry.score}`}
                    className={`lb-row ${isTop1 ? 'row-first' : ''} ${isTop2 ? 'row-second' : ''} ${isTop3 ? 'row-third' : ''}`}
                  >
                    <td className="td-rank">
                      {isTop1 && <span className="rank-podium gold"><Crown size={18} /> #1</span>}
                      {isTop2 && <span className="rank-podium silver"><Medal size={16} /> #2</span>}
                      {isTop3 && <span className="rank-podium bronze"><Medal size={16} /> #3</span>}
                      {!isTop1 && !isTop2 && !isTop3 && <span className="rank-num">#{entry.rank}</span>}
                    </td>

                    <td className="td-player">
                      <div className="player-meta">
                        <div
                          className="player-avatar"
                          style={{ background: entry.avatarBg }}
                        >
                          {entry.country}
                        </div>
                        <div className="player-name-wrap">
                          <span className="player-handle">{entry.username}</span>
                          {entry.badge.includes('VIP') && (
                            <span className="vip-tag-inline">VIP</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="td-game">
                      <span className="game-label">{entry.game}</span>
                    </td>

                    <td className="td-badge">
                      <span className="honor-badge">{entry.badge}</span>
                    </td>

                    <td className="td-score text-right">
                      <span className="score-value">{entry.score.toLocaleString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Simulation Modal */}
        {showSimModal && (
          <div className="sim-modal-backdrop" onClick={() => setShowSimModal(false)}>
            <div className="sim-modal-box" onClick={(e) => e.stopPropagation()}>
              <h3 className="sim-modal-title">Simulate Demo Leaderboard Entry</h3>
              <p className="sim-modal-desc">
                Submit a mock player score to see it dynamically rank in the table.
              </p>

              <form onSubmit={handleSimulateSubmit} className="sim-form">
                <div className="form-group">
                  <label htmlFor="sim-player-name">Player Name / Handle:</label>
                  <input
                    id="sim-player-name"
                    type="text"
                    required
                    placeholder="e.g. StudentGamer42"
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sim-score-input">Simulated Score:</label>
                  <input
                    id="sim-score-input"
                    type="number"
                    min="1000"
                    max="150000"
                    step="500"
                    value={simScore}
                    onChange={(e) => setSimScore(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sim-game-select">Game Title:</label>
                  <select
                    id="sim-game-select"
                    value={simGame}
                    onChange={(e) => setSimGame(e.target.value)}
                    className="form-select"
                  >
                    <option value="Neon Tic-Tac-Toe">Neon Tic-Tac-Toe</option>
                    <option value="Cosmic Memory Match">Cosmic Memory Match</option>
                    <option value="Reflex Rush">Reflex Rush</option>
                    <option value="Cyber Drift 2099">Cyber Drift 2099</option>
                    <option value="Pixel Quest Dungeon">Pixel Quest Dungeon</option>
                  </select>
                </div>

                <div className="sim-modal-buttons">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowSimModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-confirm">
                    Add to Demo Table
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
