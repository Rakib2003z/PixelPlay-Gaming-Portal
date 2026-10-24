/**
 * ============================================================================
 * PIXELPLAY MASTER GAMES DATABASE (Single Source of Truth)
 * ============================================================================
 * 
 * To add a new game:
 * Simply append a new object to the GAMES array with the required schema:
 * {
 *   id: 'unique-slug',
 *   title: 'Game Name',
 *   tagline: 'Short hook',
 *   category: 'puzzle' | 'action' | 'racing' | 'arcade' | 'adventure' | 'brain-training',
 *   engine: 'tictactoe' | 'memorymatch' | 'speedclicker' | 'arcade-simulator',
 *   simulatorMode: 'collect' | 'dodge' | 'drift' | 'target' | 'maze' (used if engine is 'arcade-simulator'),
 *   rating: 4.8,
 *   ratingCount: '12.4K',
 *   plays: '185K',
 *   isFeatured: true/false,
 *   isPopular: true/false,
 *   isNew: true/false,
 *   badge: 'Hot' | 'Trending' | 'Featured' | 'New',
 *   icon: '⚡' or emoji/lucide name,
 *   accentColor: '#00f0ff',
 *   gradient: 'linear-gradient(135deg, #0d1224, #1a2245)',
 *   instructions: { howToPlay: [...], controls: [...], tips: [...] },
 *   description: 'Full writeup...',
 *   features: [...]
 * }
 */

export const GAMES = [
  {
    id: 'neon-tic-tac-toe',
    title: 'Neon Tic-Tac-Toe',
    tagline: 'Glow grid strategy with Solo AI & 2-Player duel modes',
    category: 'puzzle',
    engine: 'tictactoe',
    rating: 4.9,
    ratingCount: '24.2K',
    plays: '420K',
    isFeatured: true,
    isPopular: true,
    isNew: false,
    badge: 'Staff Pick',
    icon: '⚔️',
    accentColor: '#00f0ff',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #06b6d4 100%)',
    thumbnailClass: 'thumb-tictactoe',
    releaseDate: '2026-02',
    developer: 'PixelPlay Lab Team',
    playableNow: true,
    description: 'Experience the immortal game of Tic-Tac-Toe infused with high-voltage neon visuals, reactive sound effects, and intelligent adaptive AI. Challenge the unbeatable Smart Bot or face off with a friend locally on the same screen.',
    instructions: {
      goal: 'Align three matching symbols (horizontal, vertical, or diagonal) before your opponent does.',
      howToPlay: [
        'Select your game mode: Single Player (vs AI Bot) or 2-Player Local Duel.',
        'Choose AI difficulty if playing solo: Casual or Smart Master.',
        'Click or tap any open cell on the 3x3 neon grid to place your mark.',
        'Player X glows in Electric Cyan; Player O radiates Cyber Purple.',
        'The game automatically tracks your victory streaks across rounds.'
      ],
      controls: [
        { key: 'Mouse Click / Tap', action: 'Place X or O on the active grid cell' },
        { key: 'Restart Button', action: 'Reset the current board while keeping the match score' },
        { key: 'Reset Scores', action: 'Clear match win streak counter back to 0-0' }
      ],
      tips: [
        'Taking the center square gives you the highest mathematical chance of claiming multiple win vectors.',
        'Watch for your opponent setting up a two-way trap (fork) and block their threat early.'
      ]
    },
    features: [
      'Genuinely playable React mini-game with instant zero-lag response',
      'Minimax Smart AI engine that punishes missteps',
      'Local 2-player pass-and-play duel mode',
      'Web Audio synthesized retro sound effects',
      'Live win streak counter and animated victory line highlight'
    ]
  },
  {
    id: 'cosmic-memory-match',
    title: 'Cosmic Memory Match',
    tagline: 'Match celestial relics, test cognitive recall and build combos',
    category: 'brain-training',
    engine: 'memorymatch',
    rating: 4.9,
    ratingCount: '19.8K',
    plays: '380K',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    badge: 'Popular',
    icon: '🔮',
    accentColor: '#a855f7',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #7e22ce 50%, #ec4899 100%)',
    thumbnailClass: 'thumb-memory',
    releaseDate: '2026-03',
    developer: 'PixelPlay Lab Team',
    playableNow: true,
    description: 'A brain-training memory challenge set in deep space. Flip cosmic runes, track their hidden positions, and pair all twin relics in the fewest moves and fastest time possible.',
    instructions: {
      goal: 'Uncover and pair all 8 matching cosmic relic pairs on the board with maximum efficiency.',
      howToPlay: [
        'Click on any facedown rune card to flip it over and inspect its celestial symbol.',
        'Click a second card to find its cosmic twin.',
        'If they match, both cards stay revealed with glowing neon aura and sound chime.',
        'If they differ, they flip back face down after a brief viewing window.',
        'Complete all pairs to trigger victory confetti and log your score!'
      ],
      controls: [
        { key: 'Mouse Click / Tap', action: 'Flip card to reveal underlying cosmic symbol' },
        { key: 'Restart Game', action: 'Shuffle card positions and reset timer & move count' },
        { key: 'Mute Toggle', action: 'Turn card flip and match chime sound effects on/off' }
      ],
      tips: [
        'Anchor your memory by associating cards with their grid row or column positions.',
        'Avoid random guessing once cards have been revealed; patience minimizes move count penalties.'
      ]
    },
    features: [
      'Genuinely playable React & CSS 3D-perspective card flip engine',
      'Live moves counter, active timer, and best-record tracking',
      'Procedural card deck shuffling on every restart',
      'Confetti celebration engine upon clearing all 16 cards',
      'Pure CSS card hover tilt and glowing particle effects'
    ]
  },
  {
    id: 'reflex-rush',
    title: 'Reflex Rush: Cyber Clicker',
    tagline: 'High-speed reaction workout with moving neon energy nodes',
    category: 'brain-training',
    engine: 'speedclicker',
    rating: 4.8,
    ratingCount: '15.1K',
    plays: '290K',
    isFeatured: false,
    isPopular: true,
    isNew: true,
    badge: 'Trending',
    icon: '⚡',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)',
    thumbnailClass: 'thumb-reflex',
    releaseDate: '2026-04',
    developer: 'PixelPlay Lab Team',
    playableNow: true,
    description: 'Sharpen your neural response time in Reflex Rush! Tap rapidly spawning cyber nodes before they vanish. Rack up combos, maximize accuracy, and see if your reflexes match competitive esports standards.',
    instructions: {
      goal: 'Hit as many glowing cyber nodes as you can within the 30-second countdown window without clicking blank space.',
      howToPlay: [
        'Press the "Start Rush" button to activate the 30-second reflex round.',
        'Glowing neon energy nodes will materialize randomly across the cyber zone.',
        'Click or tap targets before they fade away to score points.',
        'Chain consecutive hits without missing to activate the x2 and x3 combo multipliers.',
        'Watch your live accuracy metric update and aim for an S-Tier ranking!'
      ],
      controls: [
        { key: 'Left Click / Tap', action: 'Strike active neon energy node' },
        { key: 'Spacebar / Button', action: 'Start or restart the reflex session' }
      ],
      tips: [
        'Keep your mouse cursor or finger near the center of the zone to minimize transit distance.',
        'Accurate clicks beat frantic clicking—missing the target penalizes your accuracy rating.'
      ]
    },
    features: [
      'Genuinely playable reflex arcade test built in React & CSS',
      'Active 30-second countdown with combo multiplier meter',
      'Accuracy calculation and tier rating (S, A, B, C)',
      'High score memory persistence in session',
      'Dynamic node animation with pulsing neon rings'
    ]
  },
  {
    id: 'cyber-drift-2099',
    title: 'Cyber Drift 2099',
    tagline: 'Neon night-racing through towering holographic megacities',
    category: 'racing',
    engine: 'arcade-simulator',
    simulatorMode: 'drift',
    rating: 4.9,
    ratingCount: '31.4K',
    plays: '510K',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    badge: 'Top Rated',
    icon: '🏎️',
    accentColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #451a03 0%, #b45309 50%, #f59e0b 100%)',
    thumbnailClass: 'thumb-drift',
    releaseDate: '2026-01',
    developer: 'HyperDrive Interactive',
    playableNow: true,
    description: 'Pilot customizable anti-gravity hover-vehicles along neon expressways in Neo-Tokyo. Slide through sharp hairpin turns, draft off rival slipstreams, and collect turbo energy cells to outpace the competition.',
    instructions: {
      goal: 'Pilot your cyber speeder down the highway, collect plasma fuel, and dodge oncoming traffic or energy barriers.',
      howToPlay: [
        'Launch the simulator and take the wheel.',
        'Steer left and right using the arrow keys or on-screen directional touch controls.',
        'Grab golden turbo tokens to amplify your speed and boost your score.',
        'Evade hazard barriers and traffic drones to preserve your shield gauge.'
      ],
      controls: [
        { key: 'A / Left Arrow', action: 'Steer hovercraft left' },
        { key: 'D / Right Arrow', action: 'Steer hovercraft right' },
        { key: 'W / Up Arrow', action: 'Engage nitro thrust booster' },
        { key: 'Spacebar', action: 'Emergency kinetic airbrake' }
      ],
      tips: [
        'Feather the nitro booster right after leaving a turn to slingshot into the straightaway.',
        'Gold plasma cores provide invulnerability for 3 seconds.'
      ]
    },
    features: [
      'Interactive canvas-driven speedway simulator engine',
      'Real-time collision detection and turbo score multipliers',
      'Dynamic neon asphalt visualizer with parallax grid lines',
      'Full touch and keyboard control responsiveness'
    ]
  },
  {
    id: 'pixel-quest-dungeon',
    title: 'Pixel Quest: Dungeon Crawler',
    tagline: 'Loot treasures, dodge dungeon traps and slay retro beasts',
    category: 'adventure',
    engine: 'arcade-simulator',
    simulatorMode: 'maze',
    rating: 4.7,
    ratingCount: '14.6K',
    plays: '210K',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    badge: 'New',
    icon: '🗡️',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)',
    thumbnailClass: 'thumb-dungeon',
    releaseDate: '2026-04',
    developer: 'Aetherforge Games',
    playableNow: true,
    description: 'Delve into subterranean crypts filled with ancient loot, cunning spike traps, and wandering slime minions. Navigate labyrinths and collect the legendary Sunstone fragments.',
    instructions: {
      goal: 'Navigate the labyrinthine chamber, collect sacred gems, and locate the portal gate to the next floor.',
      howToPlay: [
        'Step through the dungeon entrance using your directional controls.',
        'Collect ruby and sapphire crystals scattered across the floor.',
        'Carefully avoid moving spike tiles and wandering phantom sentinels.',
        'Reach the glowing warp portal with all crystals to complete the delve.'
      ],
      controls: [
        { key: 'Arrow Keys / WASD', action: 'Move hero through the dungeon' },
        { key: 'Spacebar', action: 'Swing spectral blade to break urns' },
        { key: 'E / Tap', action: 'Interact with treasure chests and levers' }
      ],
      tips: [
        'Spike traps pulse on a strict 2-second cycle; learn the rhythm before crossing.',
        'Green healing herbs restore one heart of health.'
      ]
    },
    features: [
      'Interactive tile-based dungeon navigation simulator',
      'Dynamic collision boundaries and relic collection logic',
      'Procedural gem placement and hazard obstacle routines',
      'Atmospheric retro synth lighting and sound response'
    ]
  },
  {
    id: 'retro-invaders-strike',
    title: 'Retro Invaders Strike',
    tagline: 'Defend orbital space stations from waves of pixel invaders',
    category: 'arcade',
    engine: 'arcade-simulator',
    simulatorMode: 'target',
    rating: 4.8,
    ratingCount: '22.3K',
    plays: '340K',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    badge: 'Classic',
    icon: '👾',
    accentColor: '#38bdf8',
    gradient: 'linear-gradient(135deg, #082f49 0%, #0369a1 50%, #38bdf8 100%)',
    thumbnailClass: 'thumb-invaders',
    releaseDate: '2026-01',
    developer: 'Voxel Galaxy Labs',
    playableNow: true,
    description: 'An homage to golden-age arcade space defense. Take the helm of the star fighter Vanguard, blast alien swarms descending in attack formation, and intercept mothership supply drops.',
    instructions: {
      goal: 'Destroy descending alien invaders and protect your defensive energy barriers.',
      howToPlay: [
        'Move your defender craft horizontally along the bottom defense line.',
        'Tap space or fire button to unleash photon laser cannons.',
        'Take cover beneath energy shields when alien bomb salvos fall.',
        'Wipe out entire squadrons to earn bonus hyper-charge artillery.'
      ],
      controls: [
        { key: 'Left / Right Keys', action: 'Slide starship laterally' },
        { key: 'Spacebar / Fire', action: 'Discharge dual photon laser cannon' },
        { key: 'Shift / Double-tap', action: 'Deploy emergency EMP blast wave' }
      ],
      tips: [
        'Clear the outer edges of the alien formation first to slow down their march tempo.',
        'Shoot the mysterious UFO saucer when it glides across the top for massive bonus points.'
      ]
    },
    features: [
      'Interactive arcade target blaster simulator',
      'Particle explosion rendering and projectile trajectory math',
      'Multi-wave escalation and high-score tally system',
      'Arcade sound synth laser pulses and shatter bursts'
    ]
  },
  {
    id: 'quantum-grid-puzzle',
    title: 'Quantum Grid: Laser Logic',
    tagline: 'Redirect laser beams using optical prisms and mirrors',
    category: 'puzzle',
    engine: 'arcade-simulator',
    simulatorMode: 'collect',
    rating: 4.8,
    ratingCount: '11.9K',
    plays: '160K',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    badge: 'New',
    icon: '🔷',
    accentColor: '#a855f7',
    gradient: 'linear-gradient(135deg, #3b0764 0%, #6b21a8 50%, #c084fc 100%)',
    thumbnailClass: 'thumb-quantum',
    releaseDate: '2026-04',
    developer: 'Photonix Studios',
    playableNow: true,
    description: 'A mind-bending puzzle journey where you manipulate wavelength emitters, mirrors, beam splitters, and filters to illuminate photonic core receptors in intricate quantum chambers.',
    instructions: {
      goal: 'Guide laser beams from the emitter to hit all receptor cores by strategically positioning and angling mirrors.',
      howToPlay: [
        'Examine the initial beam path originating from the laser source.',
        'Drag or rotate reflector nodes to redirect the photon beam by 90 degrees.',
        'Combine primary color lasers to create secondary colors matching targeted nodes.',
        'Power all receptacles simultaneously to unlock the quantum portal.'
      ],
      controls: [
        { key: 'Mouse Click / Drag', action: 'Move optical prism to grid cell' },
        { key: 'Right Click / Tap Rotate', action: 'Rotate reflector 45 or 90 degrees' },
        { key: 'R Key', action: 'Reset mirrors to default layout' }
      ],
      tips: [
        'Work backwards from the target receptor to trace what angle the incoming beam must have.',
        'Prisms split white light into red and blue beams for multi-target chambers.'
      ]
    },
    features: [
      'Interactive optics puzzle simulator sandbox',
      'Dynamic ray reflection physics and angle calculations',
      'Step-by-step logic challenges with instant feedback',
      'Clean minimalist cyber-laboratory visual theme'
    ]
  },
  {
    id: 'neon-ninja-blade',
    title: 'Neon Ninja: Shadow Slice',
    tagline: 'Slice incoming cyber shurikens and deflect laser strikes',
    category: 'action',
    engine: 'arcade-simulator',
    simulatorMode: 'dodge',
    rating: 4.9,
    ratingCount: '27.5K',
    plays: '460K',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    badge: 'Hot',
    icon: '⚡',
    accentColor: '#ef4444',
    gradient: 'linear-gradient(135deg, #450a0a 0%, #991b1b 50%, #f87171 100%)',
    thumbnailClass: 'thumb-ninja',
    releaseDate: '2026-02',
    developer: 'Shinobi Works',
    playableNow: true,
    description: 'Step into the cybernetic sandals of a rogue shinobi. Deflect falling plasma spikes, strike enemy robotic drones, and execute lighting-fast katana combos across towering rooftops.',
    instructions: {
      goal: 'Dodge hazardous hazards and slice energy orbs out of the sky to keep your combo meter full.',
      howToPlay: [
        'Move across the rooftop platform to dodge falling red energy bolts.',
        'Swipe or click into incoming green bonus runes to slice them.',
        'Survive as long as possible while the tempo quickens.',
        'Maintain a clean dodge record to trigger Shadow Frenzy mode.'
      ],
      controls: [
        { key: 'A / D or Left / Right', action: 'Dash left and right' },
        { key: 'W / Up / Space', action: 'Execute vertical katana slash' },
        { key: 'S / Down', action: 'Shadow slide underneath overhead blades' }
      ],
      tips: [
        'Dashing right before an impact triggers a momentary bullet-time slow motion window.',
        'Do not get cornered against the edges of the rooftop.'
      ]
    },
    features: [
      'High-reflex dodging and slicing simulator',
      'Dynamic speed progression and danger alerts',
      'Smooth blade slash particle animations',
      'Combo multiplier scoreboard'
    ]
  },
  {
    id: 'galactic-orbit-racer',
    title: 'Galactic Orbit: Graviton GP',
    tagline: 'Defy gravity on twisting planetary orbital roller-tracks',
    category: 'racing',
    engine: 'arcade-simulator',
    simulatorMode: 'drift',
    rating: 4.7,
    ratingCount: '13.1K',
    plays: '190K',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    badge: 'New',
    icon: '🚀',
    accentColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, #083344 0%, #0e7490 50%, #22d3ee 100%)',
    thumbnailClass: 'thumb-orbit',
    releaseDate: '2026-04',
    developer: 'Zero-G Systems',
    playableNow: true,
    description: 'Race across floating magnetic loops orbiting distant gas giants. Maintain terminal velocity, slingshot around planetary gravity wells, and drift past rivals in zero atmospheric friction.',
    instructions: {
      goal: 'Keep your orbital pod within magnetic track rails while collecting acceleration ions.',
      howToPlay: [
        'Align your pod with the glowing magnetic track line.',
        'Collect blue graviton spheres to supercharge your thrusters.',
        'Counteract centrifugal drift on steep orbital curves.',
        'Complete 3 solar circuits before the orbital storm arrives.'
      ],
      controls: [
        { key: 'Left / Right Arrow', action: 'Adjust orbital magnetic heading' },
        { key: 'Up Arrow / Boost', action: 'Ignite ion hyper-thrusters' },
        { key: 'B Key', action: 'Deploy magnetic stabilizer' }
      ],
      tips: [
        'Ride the interior curve of orbital loops to cut down lap time by valuable seconds.',
        'Graviton fields reload automatically every 10 seconds.'
      ]
    },
    features: [
      'Interactive futuristic racing simulator',
      'Orbital physics and magnetic track adherence mechanics',
      'Stunning planetary backdrop with starfield parallax',
      'Lap timer with precision millisecond readout'
    ]
  },
  {
    id: 'shadow-maze-escape',
    title: 'Shadow Maze: The Dark Run',
    tagline: 'Flee through shifting shadows before the labyrinth collapses',
    category: 'adventure',
    engine: 'arcade-simulator',
    simulatorMode: 'maze',
    rating: 4.8,
    ratingCount: '16.7K',
    plays: '240K',
    isFeatured: false,
    isPopular: true,
    isNew: false,
    badge: 'Popular',
    icon: '🕯️',
    accentColor: '#eab308',
    gradient: 'linear-gradient(135deg, #422006 0%, #854d0e 50%, #facc15 100%)',
    thumbnailClass: 'thumb-shadow',
    releaseDate: '2026-02',
    developer: 'Ebon Gate Interactive',
    playableNow: true,
    description: 'Trapped inside a shifting mystical maze where shadows come alive. Carry your dying torch, locate glowing light beacons to restore your visibility, and find the ancient seal to escape.',
    instructions: {
      goal: 'Escape the shifting labyrinth before your torch runs out of luminescence.',
      howToPlay: [
        'Navigate the dark corridors with limited line-of-sight.',
        'Collect fireflies and oil flasks to refill your torch brightness meter.',
        'Avoid shadowy stalkers lurking in unlit alcoves.',
        'Locate the 3 stone keystones to unlock the grand escape portal.'
      ],
      controls: [
        { key: 'Arrow Keys / WASD', action: 'Move through foggy maze halls' },
        { key: 'F Key / Flashlight', action: 'Flare torch to briefly reveal entire map' },
        { key: 'Spacebar', action: 'Sprint burst across open chambers' }
      ],
      tips: [
        'Save your torch flare for crossroads when you are unsure of the correct corridor.',
        'Shadow stalkers will flee if you step into a beacon light pillar.'
      ]
    },
    features: [
      'Fog-of-war dynamic lighting simulation',
      'Procedural corridor layout generator',
      'Heartbeat audio tension cues and atmospheric synth',
      'Keystone relic inventory tracking'
    ]
  },
  {
    id: 'synth-wave-runner',
    title: 'SynthWave 80s Runner',
    tagline: 'Outrun the sunset on a retro neon wireframe grid',
    category: 'arcade',
    engine: 'arcade-simulator',
    simulatorMode: 'dodge',
    rating: 4.8,
    ratingCount: '20.1K',
    plays: '310K',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    badge: 'Retro',
    icon: '🌴',
    accentColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #500724 0%, #9d174d 50%, #f43f5e 100%)',
    thumbnailClass: 'thumb-synth',
    releaseDate: '2026-03',
    developer: 'Outrun Digital',
    playableNow: true,
    description: 'Hop into a classic crimson convertible and drive endlessly towards a giant chrome sun. Dodge retro police roadblocks, jump over digital canyons, and vibe to an electrifying synthwave beat.',
    instructions: {
      goal: 'Drive along the neon perspective highway, dodge traffic barriers, and hit high speeds.',
      howToPlay: [
        'Steer between 3 highway lanes to avoid wireframe obstacles.',
        'Collect cassette tapes along the asphalt to increase your score multiplier.',
        'Grab golden sunglasses for temporary hyper-invincibility.',
        'Survive as the grid wireframe speed accelerates.'
      ],
      controls: [
        { key: 'A / D or Left / Right', action: 'Switch highway lane' },
        { key: 'W / Up Arrow', action: 'Accelerate engine' },
        { key: 'Spacebar', action: 'Jump vehicle over road spikes' }
      ],
      tips: [
        'Lane switches happen fastest when you tap rather than hold the steer keys.',
        'Keep an eye on the horizon for early warning flashing arrows.'
      ]
    },
    features: [
      'Outrun style pseudo-3D perspective wireframe canvas',
      'Retro cassette collection & combo score tally',
      'Vibrant synthwave color palette with neon magenta and cyan',
      'Smooth 60FPS browser canvas rendering'
    ]
  },
  {
    id: 'number-matrix-iq',
    title: 'Number Matrix: Math Blitz',
    tagline: 'Fast mental arithmetic equations and rapid number sequencing',
    category: 'brain-training',
    engine: 'arcade-simulator',
    simulatorMode: 'target',
    rating: 4.7,
    ratingCount: '10.5K',
    plays: '150K',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    badge: 'IQ Test',
    icon: '🧮',
    accentColor: '#6366f1',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #6366f1 100%)',
    thumbnailClass: 'thumb-math',
    releaseDate: '2026-04',
    developer: 'NeuroLab Academic',
    playableNow: true,
    description: 'Put your quick-math reflexes to the test. Rapid-fire arithmetic equations flash on the terminal. Solve them before time expires to train your mental calculation speed and working memory.',
    instructions: {
      goal: 'Identify the missing number or solve mathematical logic equations before the timer empties.',
      howToPlay: [
        'Observe the target equation displayed in the central holographic visor.',
        'Tap the correct numeric node from the available multiple-choice options.',
        'Chain consecutive right answers to earn cognitive bonus gems.',
        'Advance through increasingly difficult tiers: Addition, Multiplication, Algebra.'
      ],
      controls: [
        { key: '1, 2, 3, 4 Keys', action: 'Select corresponding answer choice' },
        { key: 'Mouse Click / Tap', action: 'Click desired solution node' },
        { key: 'Spacebar', action: 'Pass/skip to next problem (1 penalty)' }
      ],
      tips: [
        'Round numbers to nearest tens first to quickly eliminate impossible answers.',
        'The faster you confirm a correct solution, the higher the speed bonus.'
      ]
    },
    features: [
      'Interactive mental math simulator with instant calculation checks',
      'Live brain score IQ estimation meter (Demo metric)',
      'Adaptive difficulty curve based on correct answer streaks',
      'Comprehensive performance breakdown upon test completion'
    ]
  }
];

// Helper lookup functions
export const getGameById = (id) => {
  if (!id) return null;
  return GAMES.find(g => g.id.toLowerCase() === id.toLowerCase());
};

export const getFeaturedGame = () => {
  return GAMES.find(g => g.isFeatured) || GAMES[0];
};

export const getPopularGames = (limit = 6) => {
  return GAMES.filter(g => g.isPopular).slice(0, limit);
};

export const getNewGames = (limit = 6) => {
  return GAMES.filter(g => g.isNew).slice(0, limit);
};

export const getGamesByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return GAMES;
  return GAMES.filter(g => g.category.toLowerCase() === categoryId.toLowerCase());
};

export const searchGames = (query, category = 'all') => {
  let list = GAMES;
  if (category && category !== 'all') {
    list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }
  if (!query || query.trim() === '') {
    return list;
  }
  const q = query.toLowerCase().trim();
  return list.filter(g => 
    g.title.toLowerCase().includes(q) ||
    g.tagline.toLowerCase().includes(q) ||
    g.category.toLowerCase().includes(q) ||
    (g.badge && g.badge.toLowerCase().includes(q))
  );
};
