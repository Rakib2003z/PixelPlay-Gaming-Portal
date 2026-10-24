import React, { useEffect } from 'react';
import LeaderboardSection from '../components/LeaderboardSection';
import AdBanner from '../components/AdBanner';
import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Sparkles, Award } from 'lucide-react';

export default function LeaderboardPage() {
  useEffect(() => {
    document.title = 'Global Hall of Fame Leaderboard — PixelPlay';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '24px 0 60px 0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <ChevronRight size={14} color="#475569" />
          <span style={{ color: '#cbd5e1', fontWeight: 700 }}>Leaderboards</span>
        </nav>

        <LeaderboardSection />

        <AdBanner slot="horizontal" format="Leaderboard 728x90" />
      </div>
    </div>
  );
}
