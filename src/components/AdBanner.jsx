import React from 'react';
import { Crown, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './AdBanner.css';

export default function AdBanner({ slot = 'horizontal', format = 'Leaderboard 728x90' }) {
  const { isVipMode } = useApp();

  // If user activated VIP Demo Mode, show ad-free perk notification
  if (isVipMode) {
    return (
      <aside className="ad-container ad-vip-hidden" aria-label="Ad-Free VIP Notice">
        <div className="vip-hidden-content">
          <Crown size={18} className="text-gold" />
          <span>Advertisement hidden by <strong>PixelPlay Plus VIP Demo Mode</strong></span>
          <span className="ad-perk-badge">Ad-Free Experience</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`ad-container ad-${slot}`} aria-label="Demo Advertisement Placeholder">
      <div className="ad-header-label">
        <span className="ad-demo-tag">
          <AlertCircle size={12} /> ADVERTISEMENT PLACEHOLDER (DEMO ONLY)
        </span>
        <Link to="/premium" className="ad-remove-link">
          <Crown size={12} /> Remove ads with PixelPlay+
        </Link>
      </div>

      <div className="ad-content-box">
        <div className="ad-sponsor-badge">SPONSORED BY CLOUD QUEST LABS</div>
        <div className="ad-main-promo">
          <div className="ad-icon">🚀</div>
          <div className="ad-copy">
            <h4 className="ad-headline">Ultra-Low Latency Cloud Gaming Rigs</h4>
            <p className="ad-subtext">Stream top PC titles directly in your browser with zero latency. (Simulated Demo Ad)</p>
          </div>
          <button
            type="button"
            className="ad-demo-cta"
            onClick={() => alert('Demo Ad Notice: This is a simulated advertisement placement for university lab coursework.')}
          >
            Learn More
          </button>
        </div>
        <div className="ad-format-tag">{format}</div>
      </div>
    </aside>
  );
}
