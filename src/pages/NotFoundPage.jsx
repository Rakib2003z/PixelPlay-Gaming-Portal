import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found — PixelPlay';
  }, []);

  return (
    <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ background: '#11162a', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', padding: '48px 32px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>👾</div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '3rem', fontWeight: 900, color: '#00f0ff', margin: '0 0 10px 0' }}>404</h1>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', color: '#ffffff', margin: '0 0 12px 0' }}>Game Stage Not Found</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 28px 0' }}>
          Looks like this quadrant of cyberspace has vanished or been moved to a new coordinate!
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
            color: '#0b0e17',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 800,
            textDecoration: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 240, 255, 0.35)'
          }}
        >
          <Home size={18} /> Back to Game Lobby
        </Link>
      </div>
    </div>
  );
}
