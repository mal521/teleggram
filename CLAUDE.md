# teleggram

A cozy web app where hallabong (a mandarin orange character) picks a love letter (affirmation) for you based on your mood, delivered via gyelan (eggs).

## Tech
- Plain HTML/CSS/JS, no frameworks
- Single page app: index.html, style.css, app.js
- Google Fonts: Quicksand

## Key Concepts
- **hallabong**: mandarin orange character that moves along a slider
- **gyelan**: eggs in a carton (6 total, 2 rows x 3)
- **mood slider**: left = playful, right = warm
- Eggs 0-2 are playful affirmations, eggs 3-5 are warm affirmations
- Share link uses `?egg=N` URL param to auto-play a specific egg

## Asset Paths
- `assets/characters/hallabong.png` — default state
- `assets/characters/hallabong-laugh.png` — laughing (playful end)
- `assets/characters/hallabong-blush.png` — blushing (warm end)
- `assets/characters/gyelan.png` — egg in carton
- `assets/animations/egg-0.gif` through `egg-5.gif` — affirmation animations

## Architecture
- Slider maps 0-100 to egg index 0-5
- Hallabong slides toward selected egg via CSS transform
- Selected egg pops up with animation + affirmation text
- Share copies URL with ?egg=N, loads auto-trigger that egg
- Counter is placeholder only (no backend)
