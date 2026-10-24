import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Heart, Github, Shield, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import './Footer.css';

export default function Footer() {
  const { openModal } = useApp();

  return (
    <footer className="footer-root" role="contentinfo">
      <div className="footer-glow" />

      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand & Academic Lab statement */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-icon-wrap">
                <Gamepad2 size={22} />
              </div>
              <span className="footer-logo-text">Pixel<span className="text-cyan">Play</span></span>
            </Link>
            <p className="footer-desc">
              A modern, responsive browser gaming portal engineered as a university lab project. Demonstrates React component design, client-side routing, Web Audio synthesis, interactive HTML5 canvas simulations, and dark cyber aesthetics.
            </p>
            <div className="lab-project-tag">
              <BookOpen size={14} /> University Computer Science Lab MVP
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links-list">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="footer-link">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Portal Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">Home Lobby</Link>
              </li>
              <li>
                <Link to="/categories" className="footer-link">Browse All Games</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="footer-link">Global Leaderboard</Link>
              </li>
              <li>
                <Link to="/premium" className="footer-link">PixelPlay+ VIP (Demo)</Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => openModal('about')}
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Academic Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Legal & Lab Info</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => openModal('about')}
                >
                  About PixelPlay
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => openModal('contact')}
                >
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => openModal('privacy')}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => openModal('terms')}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 PixelPlay Gaming Portal. Free open educational software for university coursework.
          </p>
          <div className="footer-meta-pill">
            <span>Built with React + Vite • Zero External Paid APIs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
