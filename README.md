# PixelPlay — Modern Browser Gaming Portal

![PixelPlay Banner](https://img.shields.io/badge/PixelPlay-Gaming%20Portal-00f0ff?style=for-the-badge&logo=gamepad)
![React](https://img.shields.io/badge/React-18-8b5cf6?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-a855f7?style=for-the-badge&logo=vite)
![Pure CSS](https://img.shields.io/badge/CSS3-Responsive-38bdf8?style=for-the-badge&logo=css3)
![License](https://img.shields.io/badge/Coursework-Academic%20Project-10b981?style=for-the-badge)

A complete, modern, and professional browser gaming portal developed as an academic university laboratory MVP project. Inspired by contemporary web gaming platforms (such as Poki, Miniclip, and Kongregate), **PixelPlay** delivers a polished, responsive gaming hub with instant zero-download gameplay, cyber dark navy aesthetics, vibrant purple/cyan neon accents, rich game catalogs, and genuinely playable mini-games.

---

## 🌟 Key Features

### 🎮 Genuinely Playable Web Mini-Games
1. **Neon Tic-Tac-Toe** (`/game/neon-tic-tac-toe`):
   - **Solo Mode vs AI**: Powered by an unbeatable Minimax algorithm on Hard, with Easy and Normal levels.
   - **2-Player Local Duel**: Pass-and-play local multiplayer mode.
   - **Visuals & Audio**: Electric Cyan (X) and Cyber Purple (O) neon glow, animated victory line highlight, Web Audio synthesized sounds, and victory confetti.
   - **Match State**: Tracks X wins, O wins, and draws across rounds with restart and reset controls.

2. **Cosmic Memory Match** (`/game/cosmic-memory-match`):
   - **Rune Matching**: 16 cosmic cards (8 matching pairs) with celestial relics.
   - **3D Card Flips**: Pure CSS 3D perspective card flip animations (`preserve-3d`).
   - **Metrics & Records**: Live timer (MM:SS), moves counter, matched pairs tracker, and best-record persistence via `localStorage`.
   - **Celebration**: Procedural deck shuffling on restart and victory confetti burst.

3. **Reflex Rush: Cyber Clicker** (`/game/reflex-rush`):
   - **Neural Speed Challenge**: 30-second rapid-fire reaction session.
   - **Target Spawning**: Glowing cyan energy nodes and rare gold bonus nodes with combo multipliers (2x, 3x).
   - **Grade Evaluation**: Calculates accuracy percentage and assigns performance tiers (S-Tier, A-Tier, B-Tier, C-Tier).

4. **Arcade Canvas Sandbox Simulator** (For other catalogue games):
   - Every single game entry in the catalogue has a **working, responsive 60FPS HTML5 Canvas engine** (`CatalogueSimulator`).
   - Dynamic modes: Highway Drift, Dungeon Delver, Target Blaster, Hazard Dodger, and Quantum Collector.
   - Full controls: Keyboard (WASD / Arrow Keys) and **on-screen touch D-Pad** for mobile and tablet users.
   - **Never shows broken iframes or dead play buttons!**

---

### 🎨 Homepage & Navigation Experience
- **Responsive Navbar**: Brand logo with animated glow, global search input with live autocomplete dropdown, sound mute toggle, VIP demo toggle, and mobile navigation drawer.
- **Featured Game Hero Banner**: Large banner with instant "PLAY NOW" button, feature highlights, and responsive screen mockup.
- **Category Filter**: Six required categories:
  - 🧩 **Puzzle**
  - 🔥 **Action**
  - ⚡ **Racing**
  - 🕹️ **Arcade**
  - 🧭 **Adventure**
  - 🧠 **Brain Training**
- **Catalog Grids**: "Popular Games" and "New & Trending Games" sections with hover lift effects and play overlays.
- **Clearly Marked Ad Placeholders**: Transparent demo slots (`Leaderboard 728x90` and `Banner 970x90`) with an academic disclaimer.
- **PixelPlay+ VIP Membership Showcase**: Concept comparison of Free vs. VIP tier with an interactive **"Test VIP Demo Mode"** button that hides all ads and unlocks the golden crown badge across the portal.
- **Sample Leaderboard**: Filterable tabs (All-Time Legends, Weekly Champs, Daily Rush) with demo disclaimer and interactive **"Test Submit My Score"** simulation modal.
- **Semantic Footer**: About, Contact, Privacy Policy, and Terms of Service dialog triggers.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Library**: React 18
- **Build Tool & Dev Server**: Vite 6
- **Routing**: React Router DOM 6
- **Styling**: Pure CSS (CSS Variables, Flexbox, CSS Grid, 3D Transforms, Glassmorphism)
- **Audio**: Web Audio API (100% offline synthesizer, zero external audio asset dependencies)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Single Source of Truth Data File**: `src/data/games.js` (Easily edit, add, or remove games by modifying this one file)

---

## 📁 Project Structure

```
gaming-portal-lab1/
├── index.html                   # HTML entry with Google Fonts & meta tags
├── package.json                 # Project dependencies & npm scripts
├── vite.config.js               # Vite configuration (port 3000)
├── .gitignore                   # Standard Vite Git ignore rules
├── README.md                    # Project documentation & setup instructions
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Main application shell & router
│   ├── index.css                # Master CSS variables & global design tokens
│   ├── context/
│   │   └── AppContext.jsx       # Global VIP demo, sound mute, and modal state
│   ├── data/
│   │   ├── games.js             # MASTER SINGLE-FILE GAMES DATABASE
│   │   ├── categories.js        # 6 core category definitions
│   │   └── leaderboard.js       # Demo leaderboard rankings data
│   ├── utils/
│   │   └── sound.js             # Web Audio API retro sound synthesizer
│   ├── components/
│   │   ├── Navbar.jsx           # Responsive navbar with search autocomplete & mobile menu
│   │   ├── Navbar.css
│   │   ├── HeroBanner.jsx       # Large featured game banner with active Play CTA
│   │   ├── HeroBanner.css
│   │   ├── GameCard.jsx         # Rounded game card with gradient thumb & hover lift
│   │   ├── GameCard.css
│   │   ├── CategoryFilter.jsx   # Category filter pills
│   │   ├── CategoryFilter.css
│   │   ├── AdBanner.jsx         # Clearly labelled demo advertisement placeholder
│   │   ├── AdBanner.css
│   │   ├── PremiumSection.jsx   # PixelPlay Plus VIP tier preview
│   │   ├── PremiumSection.css
│   │   ├── LeaderboardSection.jsx # Demo rankings table with simulation modal
│   │   ├── LeaderboardSection.css
│   │   ├── Footer.jsx           # Semantic footer with info dialog links
│   │   ├── Footer.css
│   │   ├── InfoModal.jsx        # Modal dialog for About, Contact, Privacy, Terms
│   │   ├── InfoModal.css
│   │   ├── QuickToast.jsx       # Pop-up toast feedback notification
│   │   └── QuickToast.css
│   ├── pages/
│   │   ├── HomePage.jsx         # Full homepage lobby
│   │   ├── HomePage.css
│   │   ├── GamePage.jsx         # Dedicated individual game screen (/game/:id)
│   │   ├── GamePage.css
│   │   ├── CategoriesPage.jsx   # Category explorer & sortable catalogue (/categories)
│   │   ├── CategoriesPage.css
│   │   ├── SearchPage.jsx       # Live search results page (/search?q=...)
│   │   ├── SearchPage.css
│   │   ├── LeaderboardPage.jsx  # Dedicated leaderboard page (/leaderboard)
│   │   ├── PremiumPage.jsx      # Dedicated VIP demo perks page (/premium)
│   │   └── NotFoundPage.jsx     # 404 error page
│   └── games/
│       ├── TicTacToe/           # Genuinely playable Tic-Tac-Toe mini-game
│       │   ├── TicTacToeGame.jsx
│       │   └── TicTacToe.css
│       ├── MemoryMatch/         # Genuinely playable Cosmic Memory Match mini-game
│       │   ├── MemoryMatchGame.jsx
│       │   └── MemoryMatch.css
│       ├── SpeedClicker/        # Bonus Reflex Rush cyber clicker mini-game
│       │   ├── SpeedClickerGame.jsx
│       │   └── SpeedClicker.css
│       └── DemoGameFrame/       # Interactive HTML5 Canvas Arcade Sandbox
│           ├── CatalogueSimulator.jsx
│           └── CatalogueSimulator.css
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (version 18+ or later)
- npm or yarn

### 1. Install Dependencies
Run the command below in the project directory:
```bash
npm install
```
*(On Windows PowerShell with script restrictions, use `npm.cmd install`)*

### 2. Start the Development Server
```bash
npm run dev
```
*(On Windows PowerShell, use `npm.cmd run dev`)*

The dev server will launch at:
```
http://localhost:3000/
```

### 3. Build for Production
To generate an optimized production build in the `/dist` directory:
```bash
npm run build
```
*(On Windows PowerShell, use `npm.cmd run build`)*

### 4. Preview the Production Build
```bash
npm run preview
```
*(On Windows PowerShell, use `npm.cmd run preview`)*

---

## 📝 How to Add or Edit Games

All games are centralized in **one single documented file**:
📁 `src/data/games.js`

To add a new game, simply append a new object to the `GAMES` array:
```javascript
{
  id: 'my-custom-game',
  title: 'My Custom Game',
  tagline: 'Exciting one-line description',
  category: 'puzzle', // 'puzzle' | 'action' | 'racing' | 'arcade' | 'adventure' | 'brain-training'
  engine: 'arcade-simulator', // 'tictactoe' | 'memorymatch' | 'speedclicker' | 'arcade-simulator'
  simulatorMode: 'dodge', // 'collect' | 'dodge' | 'drift' | 'target' | 'maze'
  rating: 4.9,
  ratingCount: '15.2K',
  plays: '220K',
  isFeatured: false,
  isPopular: true,
  isNew: true,
  badge: 'Hot',
  icon: '🚀',
  accentColor: '#00f0ff',
  gradient: 'linear-gradient(135deg, #0d1224, #1a2245)',
  description: 'Full writeup of the game narrative and objectives...',
  instructions: {
    goal: 'Main victory objective...',
    howToPlay: ['Step 1...', 'Step 2...'],
    controls: [{ key: 'WASD', action: 'Move craft' }],
    tips: ['Strategic tips for success...']
  },
  features: ['Feature 1', 'Feature 2']
}
```
The game will automatically appear across the homepage, category filters, search bar autocomplete, and receive its own dedicated URL route at `/game/my-custom-game`!

---

## ⚠️ Current Project Limitations & Scope

As specified for this frontend laboratory project:
1. **No Backend or Database**: Scores and VIP demo preferences are saved in browser memory (`localStorage` / `sessionStorage`) rather than a remote database.
2. **Frontend Mockups**: Advertising slots and PixelPlay+ membership plans are strictly non-commercial visual demonstrations for academic review. No real credit card processing or advertising networks are integrated.
3. **Audio Autoplay**: Modern browsers require an initial user click or tap before Web Audio API synthesizers can produce audio. A mute/unmute control is provided in the header.

---

## 🎓 Academic Integrity Notice
Created for university coursework evaluation. All code, design elements, CSS styles, and sound synthesis routines are free of copyrighted assets and paid services.
