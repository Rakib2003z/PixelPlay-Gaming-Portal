import React from 'react';
import { 
  Grid, 
  Puzzle, 
  Flame, 
  Zap, 
  Gamepad2, 
  Compass, 
  Brain 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import './CategoryFilter.css';

// Icon map helper
const ICON_MAP = {
  Puzzle,
  Flame,
  Zap,
  Gamepad2,
  Compass,
  Brain
};

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="cat-filter-wrapper" role="region" aria-label="Game Categories Filter">
      <div className="cat-filter-scroll">
        {/* All Games Pill */}
        <button
          type="button"
          className={`cat-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
          aria-pressed={activeCategory === 'all'}
        >
          <Grid size={16} className="cat-icon" />
          <span>All Games</span>
        </button>

        {/* 6 Category Pills */}
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Gamepad2;
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isSelected}
            >
              <IconComponent size={16} className="cat-icon" style={{ color: isSelected ? '#0b0e17' : cat.color }} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
