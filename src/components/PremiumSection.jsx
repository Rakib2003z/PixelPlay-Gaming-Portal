import React from 'react';
import { Crown, Check, Sparkles, Shield, Zap, Award, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './PremiumSection.css';

export default function PremiumSection() {
  const { isVipMode, toggleVipMode } = useApp();

  const handleVipClick = () => {
    toggleVipMode();
    if (!isVipMode) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#facc15', '#a855f7', '#00f0ff']
      });
    }
  };

  return (
    <section className="premium-section" aria-label="PixelPlay Plus Membership Preview">
      <div className="premium-glow-bg" />
      <div className="premium-container">
        {/* Header */}
        <div className="premium-header">
          <div className="premium-pill">
            <Crown size={14} className="text-gold" />
            <span>FUTURE MEMBERSHIP CONCEPT</span>
          </div>
          <h2 className="premium-heading">
            Upgrade to <span className="gold-gradient">PixelPlay+</span>
          </h2>
          <p className="premium-subtitle">
            An ad-free paradise with exclusive game themes, cloud state saves, and VIP tournament access.
          </p>
          <div className="demo-disclaimer-badge">
            ⚡ Frontend Demonstration Only: No real money, payment gateways or subscriptions connected.
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="premium-cards-grid">
          {/* Free Tier Card */}
          <div className="tier-card free-tier">
            <div className="tier-header">
              <span className="tier-name">Free Lobby</span>
              <div className="tier-price">$0 <span>/ forever</span></div>
              <p className="tier-desc">Standard access to all web mini-games.</p>
            </div>

            <ul className="tier-features-list">
              <li><Check size={16} className="chk-cyan" /> Access to all 12+ games</li>
              <li><Check size={16} className="chk-cyan" /> Responsive mobile & desktop play</li>
              <li><Check size={16} className="chk-cyan" /> Local 2-player & solo AI modes</li>
              <li className="dimmed"><Check size={16} className="chk-dim" /> Ad-supported placeholders</li>
              <li className="dimmed"><Check size={16} className="chk-dim" /> Standard player avatar badge</li>
            </ul>

            <div className="tier-action">
              <span className="tier-current-tag">Current Free Tier</span>
            </div>
          </div>

          {/* Premium Plus Tier Card */}
          <div className="tier-card plus-tier featured">
            <div className="plus-floating-ribbon">POPULAR CONCEPT</div>
            <div className="tier-header">
              <span className="tier-name gold-text">
                <Crown size={18} /> PixelPlay+ VIP
              </span>
              <div className="tier-price gold-text">
                $4.99 <span>/ month (Demo)</span>
              </div>
              <p className="tier-desc">Ultimate distraction-free browser arcade suite.</p>
            </div>

            <ul className="tier-features-list">
              <li><Check size={16} className="chk-gold" /> <strong>Zero Advertisements</strong> (Completely Clean)</li>
              <li><Check size={16} className="chk-gold" /> <strong>Exclusive Neon Colorway Themes</strong></li>
              <li><Check size={16} className="chk-gold" /> <strong>VIP Golden Crown Badge</strong> in Leaderboard</li>
              <li><Check size={16} className="chk-gold" /> <strong>Cloud Sync Game Progress</strong> & records</li>
              <li><Check size={16} className="chk-gold" /> <strong>Priority Access</strong> to unreleased beta games</li>
            </ul>

            <div className="tier-action">
              <button
                type="button"
                className={`btn-test-vip ${isVipMode ? 'active' : ''}`}
                onClick={handleVipClick}
                aria-label="Toggle VIP Demo Mode"
              >
                <Sparkles size={16} />
                <span>{isVipMode ? 'Deactivate VIP Demo' : 'Test VIP Demo Mode (Free)'}</span>
              </button>
              <span className="btn-hint">
                {isVipMode ? 'VIP features & ad hiding are active!' : 'Click to preview ad-free VIP mode live!'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
