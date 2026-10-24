import React from 'react';
import { X, ShieldCheck, Mail, FileText, Info, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './InfoModal.css';

export default function InfoModal() {
  const { activeModal, closeModal, showToast } = useApp();

  if (!activeModal) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    closeModal();
    showToast('✉️ Thank you! Your feedback message has been received (Lab Demo).');
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeModal}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal: About */}
        {activeModal === 'about' && (
          <div className="modal-body">
            <div className="modal-icon-badge info">
              <Info size={28} />
            </div>
            <h2 className="modal-title">About PixelPlay</h2>
            <div className="modal-rich-text">
              <p>
                <strong>PixelPlay</strong> is an academic web gaming portal developed as a university laboratory MVP project. The portal demonstrates modern frontend architecture, client-side routing with React Router, modular component design, Web Audio API synthesis, and fluid responsive styling.
              </p>
              <h4>Key Architectural Highlights</h4>
              <ul>
                <li><strong>Zero External Paid Dependencies:</strong> Built completely with free, open resources.</li>
                <li><strong>Genuinely Playable Mini-Games:</strong> Tic-Tac-Toe (with minimax AI) and Cosmic Memory Match built right into React and CSS.</li>
                <li><strong>Arcade Canvas Simulator:</strong> Custom HTML5 canvas engine ensuring every catalog game has an active, working, responsive playable screen.</li>
                <li><strong>Single Source of Truth:</strong> Clean, well-documented <code>games.js</code> local data structure.</li>
                <li><strong>Simulated Features:</strong> Transparent, clearly labelled frontend mockups for advertising and leaderboard features.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Modal: Contact */}
        {activeModal === 'contact' && (
          <div className="modal-body">
            <div className="modal-icon-badge contact">
              <Mail size={28} />
            </div>
            <h2 className="modal-title">Contact & Lab Feedback</h2>
            <p className="modal-subtext">
              Have feedback on this university lab project? Send a demo message below.
            </p>
            <form onSubmit={handleContactSubmit} className="contact-modal-form">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Student or Evaluator Name"
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@university.edu"
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message / Feedback</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Share your thoughts about the mini-games, layout, or responsiveness..."
                  className="modal-textarea"
                />
              </div>
              <button type="submit" className="btn-modal-submit">
                <Send size={16} /> Send Lab Feedback
              </button>
            </form>
          </div>
        )}

        {/* Modal: Privacy Policy */}
        {activeModal === 'privacy' && (
          <div className="modal-body">
            <div className="modal-icon-badge privacy">
              <ShieldCheck size={28} />
            </div>
            <h2 className="modal-title">Privacy Policy</h2>
            <div className="modal-rich-text">
              <p>
                <strong>Educational MVP Notice:</strong> PixelPlay is a non-commercial university coursework project.
              </p>
              <h4>Data Collection & Storage</h4>
              <p>
                PixelPlay does not operate a backend database and does not transmit personal data to third parties. Any high scores or VIP demo toggles are stored strictly inside your browser&apos;s local memory (<code>localStorage</code> and <code>sessionStorage</code>) for presentation purposes.
              </p>
              <h4>No Third-Party Trackers</h4>
              <p>
                No third-party advertising networks, analytics beacons, or invasive tracking cookies are integrated into this portal. All advertisement banners are purely static frontend placeholders.
              </p>
            </div>
          </div>
        )}

        {/* Modal: Terms of Service */}
        {activeModal === 'terms' && (
          <div className="modal-body">
            <div className="modal-icon-badge terms">
              <FileText size={28} />
            </div>
            <h2 className="modal-title">Terms of Service</h2>
            <div className="modal-rich-text">
              <p>
                Welcome to PixelPlay. By accessing this laboratory project, you agree to the educational demonstration terms outlined below:
              </p>
              <h4>Permitted Use</h4>
              <p>
                This web application is provided solely for educational evaluation, university examination, and portfolio review. All game logic and CSS artwork are distributed for learning purposes.
              </p>
              <h4>No Financial Transactions</h4>
              <p>
                The &ldquo;PixelPlay Plus&rdquo; membership and ad-removal mechanics are simulated demonstrations. No financial transactions can be conducted on this site.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
