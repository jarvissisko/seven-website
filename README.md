# Seven Website

Product website for the [Seven](https://github.com/id8-engineering/seven-hardware) IoT prototyping board by ID8 Engineering.

**Live:** [seven.id8-engineering.io](https://seven.id8-engineering.io) *(Cloudflare Pages)*

## What this is

Single-page static site — one `index.html`, no build step, no dependencies. Covers hardware specs, software stack, getting started guide, and open-source licensing.

## Structure

```
index.html            — page structure (HTML only)
css/style.css        — all styles, organized by section
js/main.js           — theme toggle, scroll animations, boot sequence
assets/              — all images, logos, favicon
screenshots/         — reference screenshots
```

## Development

Open `index.html` in a browser. That's it.

For live reload during development:
```bash
npx serve .
# or
python3 -m http.server 8000
```

## Design decisions

- **No build system.** A static product page doesn't need one. One HTML file means anyone can read, edit, and deploy it.
- **Dark/light theme.** Toggle in top-right. Uses CSS custom properties. Board photo swaps between themes.
- **Inline SVGs** for icons (theme toggle, info) — no emoji, consistent rendering across browsers and platforms.
- **Getting Started** instructions verified against the [seven-firmware-samples](https://github.com/id8-engineering/seven-firmware-samples) repository README.
- **Mobile-first.** Responsive layout, tested on 375px–1440px viewports.

## Content sources

The technical content on this site is sourced from and should stay in sync with:

- **Hardware specs:** [seven-hardware](https://github.com/id8-engineering/seven-hardware) README
- **Getting started:** [seven-firmware-samples](https://github.com/id8-engineering/seven-firmware-samples) README
- **Licenses:** CERN-OHL-P v2 (hardware), Apache 2.0 (firmware)

If the upstream repos change (SDK version bump, new board revision, etc.), update the website to match.

## Deployment

Hosted on Cloudflare Pages. Push to `master` and it deploys automatically.

```bash
git push origin master
```

## License

Website content © 2026 ID8 Engineering AB. The Seven hardware and firmware it describes are open source — see the respective repositories for their licenses.
