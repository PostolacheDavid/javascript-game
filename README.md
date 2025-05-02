# JavaScript 2D Platformer Game

This is a fully developed 2D platformer game built from scratch using **vanilla JavaScript**, **HTML5 Canvas**, and **CSS**. The game features smooth character movement, collision detection, camera panning, mobile controls, and sprite animations.

## 🕹️ Features

- Smooth platformer mechanics with gravity and jump physics.
- Accurate hitbox-based collision detection with solid and platform-only tiles.
- Camera follows the player with smart edge-panning.
- Sprite animations for walking, jumping, falling, and idle states.
- Mobile support with on-screen touch controls.
- Level structure loaded via external collision data arrays.

## 📱 Mobile Controls

On-screen buttons allow players to:

- Move left (`⬅️`)
- Jump (`⬆️`)
- Move right (`➡️`)

These are automatically enabled on mobile devices.

## 🧱 Technologies Used

- **JavaScript (ES6+)**
- **HTML5 Canvas**
- **CSS**
- **Tiled Map Editor** (for map design and collision mapping)
- **GIMP** (for pixel art and sprite sheet editing)

## 🧠 How It Works

- **Collision Maps**: Imported from `.js` files that store level data as arrays of numbers.
- **Camera Panning**: Camera shifts left/right when player reaches the edge of a virtual camera box.
- **Mobile Detection**: `isMobile` check adds touch event listeners for mobile gameplay.

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge).
3. Start playing!

To test mobile functionality, open the dev tools and toggle device toolbar (📱 icon).
