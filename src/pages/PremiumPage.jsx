import React, { useEffect } from 'react';
import PremiumSection from '../components/PremiumSection';
import { Link } from 'react-router-dom';
import { ChevronRight, Crown, Sparkles, Shield, Zap, Flame, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PremiumPage() {
  const { isVipMode, toggleVipMode } = useApp();

  useEffect(() => {
    document.title = 'PixelPlay+ VIP Membership (Demo) — PixelPlay';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '24px 0 60px 0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <ChevronRight size={14} color="#475569" />
          <span style={{ color: '#cbd5e1', fontWeight: 700 }}>PixelPlay+ VIP</span>
        </nav>

        <PremiumSection />
      </div>
    </div>
  );
}
