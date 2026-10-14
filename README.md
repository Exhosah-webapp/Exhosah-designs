# Exhosah — Portfolio Website

A fast, static portfolio site. No build step, no frameworks: open `index.html` and it works.

## What's in the folder

```
portfolio-site/
├── index.html            Page shell. Loads the files below.
├── css/
│   └── style.css         All styling and animation.
├── js/
│   ├── content.js        YOUR TEXT, IMAGES, COLOURS. The file you edit most.
│   ├── theme.js          Light and dark mode (runs first, so there is no flash).
│   ├── research.js       The research tabs and the flow and sitemap diagrams (optional).
│   ├── main.js           Builds the page from content.js.
│   ├── play.js           Interactions: cursor, tilt, stickers, marquees (optional).
│   └── game.js           XP, levels, stars, mini-game, rewards (optional, needs play.js).
├── images/               Project screenshots and your portrait (WebP).
├── tools/
│   └── optimize_images.py  Turns raw images into web-ready WebP.
└── README.md
```

## Preview it

Double-click `index.html`. Your browser needs internet once so the Google Font can load.

For a more realistic preview, run this inside the folder and open http://localhost:8000:

```
python3 -m http.server 8000
```

## Edit your content (js/content.js)

Everything lives in one object called `SITE`. Change what's inside the quotes.

| To change | Edit |
| --- | --- |
| Your name, email, links, portrait photo | `person` |
| Headline, intro text, hero stickers | `hero` |
| Projects (title, description, tags, images, link) | `work.projects` |
| Result cards that scroll across the page | `impact.items` |
| About text, counting stats, skills, education | `about` |
| Jobs and bullet points (add `link: "https://..."` to show a link) | `experience.items` |
| Research, user flows and sitemaps | `research.products` |
| Closing headline | `contact` |
| Colours (light and dark) and font | `theme` |

### Add a project

Copy a whole `{ ... },` block inside `work.projects`, paste it where you want it, and change the text.

```js
{
  name: "My New Project",
  kind: "What it is in a few words",
  year: "2026",              // "" hides the year
  tags: ["Mobile", "Fintech"],
  images: ["images/my-new-project.webp"],
  summary: "Two sentences about the project.",
  link: "", linkLabel: ""    // optional live link
},
```

To hide a project without deleting it, add `show: false`.

### Images

- Put image files in the `images` folder and list them in a project's `images: [...]`.
- The first image is the cover. With two or more, the card gets a slideshow with arrows.
- Covers are shown in a 16:10 frame, aligned to the top. Keep the important part of each screen near the top.
- Your portrait uses a 4:5 frame (`person.portrait`).
- An empty list `[]` shows a coloured placeholder that names the field to fill.

**Images in motion.** Project images move like a short video: each one slowly pans and zooms, and projects with several images advance on their own, with a story-style progress bar showing how long is left on the current image. Motion only runs while a card is on screen, and every card has a pause button. It is skipped entirely for visitors who set "reduce motion". Change the pace with `work.slideSeconds` (seconds per image), or turn it off with `effects.coverMotion: false`.

**Dates.** Each project has a `year` field that is shown next to its title. Write whatever you like there ("Mar 2025", "Oct 2024 – Dec 2024", "Aug 2026 – Present"), or `""` to hide it.

**Prepare new images with Python (optional):**

```
pip install pillow
python3 tools/optimize_images.py path/to/my/raw-images
```

This resizes everything to 1800 px wide, converts to WebP and drops the files into `images/` with tidy names.

### Colours and font

In `theme`: `font` accepts any Google Font name (for example `"Inter Tight"` or `"Instrument Sans"`), and the colour values are plain hex codes. `accent` is used for hover states, the progress bar and the game.

### Dark mode

The sun/moon button in the top bar switches between light and dark, with a circular colour wipe growing out of the button.

- **First visit:** the site follows the visitor's device setting. Once they press the toggle, their choice is remembered in their browser.
- **Dark colours:** edit `theme.dark` in `content.js` (`paper`, `surface`, `ink`, `muted`, `line`, `accent`). The light colours sit just above it.
- **Start mode:** `theme.defaultMode` can be `"system"` (default), `"light"` or `"dark"`. It only applies until the visitor makes their own choice.
- **Remove it:** set `theme.darkMode` to `false` and the toggle disappears.
- Switching to dark unlocks the "Night owl" achievement in the game.

## Research and user flows

The Research section has a tab for each product. Every tab shows a short summary, a few stats, what the research found (and how the design responded), and interactive diagrams of the user flows and sitemaps. Everything lives in `SITE.research.products` in `js/content.js`.

**Add or edit a product.** Copy a whole product block and change it:

```js
{
  name: "My Product",
  kind: "What it is in a few words",
  summary: "Two sentences about the research.",
  stats: [["5", "competitors reviewed"], ["2", "user flows"]],
  competitors: ["Competitor A", "Competitor B"],   // optional
  cols: ["Problem", "Design response"],            // optional column titles
  findings: [ { group: "Users", rows: [ ["The problem", "How the design answers it"] ] } ],
  diagrams: [ /* see below */ ]
}
```

**A sitemap** (`type: "tree"`) is nested lists. A plain string is a page, and `["Section", [ ...pages ]]` is a section with pages under it:

```js
{ title: "Sitemap", type: "tree",
  tree: ["Home", [ "About", ["Shop", ["Products", "Cart"]] ]] }
```

**A user flow** (`type: "flow"`) has nodes and edges. Mark a node `"s"` for start, `"e"` for end or `"d"` for a decision. Write each connection as `from>to`, optionally with a label (use `_` for spaces):

```js
{ title: "User flow", type: "flow",
  nodes: { s: ["Start", "s"], a: ["Sign up"], d: ["Verified?", "d"], e: ["End", "e"] },
  edges: "s>a a>d d>e:Yes" }
```

The layout is automatic, left to right. If a path ends far from the End node, it finishes with a small dot instead of a long line. Flows should not loop back on themselves.

**Open the full board.** Add `board: "https://www.figma.com/board/..."` to a product to show an "Open the full board" link. Only do this if the board is shared publicly, otherwise visitors will hit a login page.

To remove the whole section, delete the `<script src="js/research.js">` line in `index.html`, or delete `research` from `content.js`.

## Motion

Interactions are in `js/play.js`, and the game (next section) is in `js/game.js`. Everything is switched on or off in `SITE.effects`:

- **progressBar**: thin bar at the top that fills as you scroll.
- **cursor**: trailing ring that grows over links (mouse only).
- **magnetic**: buttons lean toward the cursor.
- **tilt**: project covers tilt with a light glare.
- **stickers**: draggable stickers beside the hero headline (desktop only).
- **scrollSpeed**: the scrolling pill rows speed up while you scroll.
- **countUp**: stats count up when they come into view.
- **game**: XP, levels, achievements and rewards (bottom-left).
- **stars**: 8 hidden stars to find.
- **hunt**: the Pixel Hunt mini-game.
- **coverMotion**: project images pan, zoom and auto-advance (set in `effects`).

Set any of them to `false` to turn it off. Interactions also switch off by themselves on touch screens and for visitors who set "reduce motion" in their system.

## The game

Visitors earn **XP** for exploring, and the ring in the bottom-left shows their level. Pressing it opens the panel.

| Action | XP |
| --- | --- |
| Explore a section (intro, work, results, research, about, experience, contact) | 10 |
| Unlock an achievement | 25 |
| Find a hidden star | 15 |
| Beat their best Pixel Hunt score | 3 per extra point |

- **Levels:** Newcomer, Explorer, Insider, Regular, Collaborator, Legend. Each level-up shows a banner with confetti.
- **Rewards:** levels unlock accent colours (Mint, Coral, Violet, Amber). Visitors can recolour the whole site from the panel. Each colour has a light and a dark version.
- **Hidden stars:** eight small glinting stars are tucked around the page (one beside the logo, one on a project card, and so on). Clicking one sends it flying to the ring. They are for mouse and touch only, so keyboard and screen-reader users aren't slowed down by extra tab stops.
- **Pixel Hunt:** a 20-second mini-game in the panel. Click shapes before they shrink, chain hits for a combo, and beat your best score for XP.
- **Quests:** the panel always shows the next open achievement. Two achievements are secret: one for scrolling fast, and one for the Konami code (↑ ↑ ↓ ↓ ← → ← → B A).
- **Sound:** short chimes for stars, unlocks and level-ups. It is off by default and visitors switch it on in the panel.
- **Memory:** progress is saved in the visitor's browser and carries over when they return. "Reset progress" starts again.
- **Final level:** once someone has explored every section, the panel invites them to email you.

### Customise the game

Everything is in `SITE.game` in `js/content.js`: level names and the XP needed, XP per action, the Pixel Hunt target score, the accent colours and the level that unlocks each one, and the title, description and quest hint for every achievement.

To remove only the game, delete the `<script src="js/game.js">` line in `index.html`. To remove all the extras, delete both the `play.js` and `game.js` lines.

## Put it online

Drag the whole `portfolio-site` folder (keep the `images` folder inside it) onto one of:

- **Netlify Drop**: app.netlify.com/drop
- **Vercel**, or **GitHub Pages** (upload the folder as a repository)

## Troubleshooting

- **Images don't show.** Check that the file name in `content.js` matches the file in `images/` exactly, including capitals, and that the `images` folder sits next to `index.html`.
- **Dark mode shows the wrong mode.** The choice is saved per browser. To test as a new visitor, clear the site's data or use a private window.
- **The font looks different.** The Google Font loads over the internet. Offline, the page falls back to your system font.
- **Page is blank.** There's probably a missing comma or quote in `js/content.js`. Open the browser console (F12) to see which line.
- **Want to start the game over.** Open the progress panel and press "Reset progress". Clearing the site data in your browser works too.

## Notes on the content

- The descriptions for projects without a year (VitaLink, Mycaban, SurePlugs, Flex Living, Bclics, BeckyShops, Prepora, AI Document Verification) were written from the screenshots. Add your role, year and results.
- Five projects from the CV are hidden with `show: false` because they have no images yet (Medical consultation platform, Artivio, AI Interview Preparation Platform, PalsConnect, Orello Tracker). All of them still appear under Experience.
