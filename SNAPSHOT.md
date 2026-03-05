# Teleggram Snapshot

## Current State
Full visual redesign complete and deployed.

## What Was Done
- Redesigned to match reference screenshots
- Switched font to **Gaegu** (Korean handwriting font) for wiggly hand-drawn feel
- Kept warm paper texture + dot grid background
- CSS egg carton with lid that opens on load (3D perspective animation)
- Light blue CSS-drawn eggs with wobble animation
- Slider with hallabong-blush "(loved)" on left, hallabong-laugh "(laughs)" on right
- "how do you want them to feel?" + "(in between)" labels
- Egg selection triggers sparkle effect, then transitions to affirmation view
- Affirmation view: gyelan + text + "COPY URL" dashed button + "...or pick another!"
- Emoji favicon (💌)
- Deployed to Netlify

## Live URL
https://teleggram.netlify.app

## Key Files
- `index.html` — two views (main + affirmation)
- `style.css` — full styles with Gaegu font, carton/egg CSS, animations
- `app.js` — slider logic, egg selection, view transitions, URL params
- `assets/characters/` — hallabong.png, hallabong-laugh.png, hallabong-blush.png, gyelan.png

## Open Items
- Egg animation GIFs (assets/animations/egg-0.gif through egg-5.gif) not yet created
- Counter is still placeholder (no backend)
