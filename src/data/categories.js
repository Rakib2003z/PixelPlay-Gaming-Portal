// Category definitions for PixelPlay Gaming Portal
// Easily add or customize categories for university lab coursework.

export const CATEGORIES = [
  {
    id: 'puzzle',
    name: 'Puzzle',
    slug: 'puzzle',
    icon: 'Puzzle',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    description: 'Engaging brain-teasers, pattern matching, logic mazes, and spatial puzzles to test your wits.',
    tagline: 'Test your logic & strategy'
  },
  {
    id: 'action',
    name: 'Action',
    slug: 'action',
    icon: 'Flame',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    description: 'Fast-paced challenges, reflex battles, dodging hazards, and thrilling high-energy adventures.',
    tagline: 'High-speed thrills & reflexes'
  },
  {
    id: 'racing',
    name: 'Racing',
    slug: 'racing',
    icon: 'Zap',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    description: 'High-octane tracks, speed drifting, time trials, and precision vehicle navigation.',
    tagline: 'Burn rubber on neon circuits'
  },
  {
    id: 'arcade',
    name: 'Arcade',
    slug: 'arcade',
    icon: 'Gamepad2',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    description: 'Nostalgic coin-op mechanics, score chasing, retro aesthetics, and timeless arcade fun.',
    tagline: 'Classic coin-op nostalgia'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    slug: 'adventure',
    icon: 'Compass',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    description: 'Atmospheric quests, exploration paths, hidden artifacts, and dungeon escapades.',
    tagline: 'Explore uncharted digital realms'
  },
  {
    id: 'brain-training',
    name: 'Brain Training',
    slug: 'brain-training',
    icon: 'Brain',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    description: 'Cognitive workouts, memory enhancements, speed arithmetic, and reaction sharpness.',
    tagline: 'Sharpen memory and focus'
  }
];

export const getCategoryById = (id) => {
  if (!id) return null;
  return CATEGORIES.find(c => c.id.toLowerCase() === id.toLowerCase() || c.slug.toLowerCase() === id.toLowerCase());
};
