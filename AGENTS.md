# AGENTS.md — Contributing to the Seven Website

## What this repo is

Static product website for the Seven IoT board. One `index.html`, no framework, no build step.

## Rules

1. **Keep it static.** No bundlers, no transpilers, no `node_modules`. If you need JavaScript, inline it or add a `<script>` tag. The build step is `open index.html`.

2. **Content stays in sync with upstream.** Hardware specs come from [seven-hardware](https://github.com/id8-engineering/seven-hardware), getting-started instructions from [seven-firmware-samples](https://github.com/id8-engineering/seven-firmware-samples). Don't invent specs — verify against source.

3. **No emoji in UI elements.** Emoji render differently across platforms. Use inline SVGs for icons (see the theme toggle and info icons for the pattern).

4. **Dark/light themes must both work.** Every visual change needs to look correct in both themes. The board hero image swaps between `hero-board.png` (dark) and `hero-board-light.png` (light).

5. **Mobile-first.** Test at 375px width before pushing. The site is viewed on phones more than desktops.

6. **Commits reference what changed and why.** Not "update index.html" — say what you changed and which upstream source you verified against if applicable.

## Testing

```bash
# Local preview
python3 -m http.server 8000
# or
npx serve .
```

Open at `localhost:8000`. Check both themes, check mobile viewport (DevTools → responsive mode → 375px).

## Deployment

Push to `master`. GitHub Pages deploys automatically from root.
