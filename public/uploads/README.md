# Dropping in real photography & video

Every image and the hero video on this site currently renders an elegant
on-brand placeholder (a soft gradient tile with the DO monogram) because no
real product photography or video was available at build time. Swapping in
the real assets requires **no code changes** — just add correctly-named files
to the folders below, then restart `npm run dev` (or re-run `npm run build`).

## How it works

Every image/video slot in the app is keyed by a "seed" string. If a file with
that exact name exists in `public/uploads/images/` or `public/uploads/video/`,
it's used automatically. Otherwise the placeholder renders. Supported
extensions: images — `webp`, `jpg`, `jpeg`, `png`; video — `mp4`, `webm`.

Run `npm run assets` any time to check what's currently detected.

## Homepage hero video (highest priority)

| Seed | Folder | Notes |
|---|---|---|
| `hero` | `video/` | Desktop hero, e.g. `hero.mp4` |
| `hero-mobile` | `video/` | Optional vertical crop, falls back to `hero` |
| `hero-poster` | `images/` | Fallback poster frame, e.g. `hero-poster.jpg` |

## Category tiles (homepage + listing headers)

`group-flowers`, `group-chocolates`, `group-combo`, `group-gifts`

## Occasion tiles

`occ-birthday`, `occ-anniversary`, `occ-love`, `occ-congratulations`,
`occ-thank-you`, `occ-new-baby`, `occ-wedding`, `occ-engagement`,
`occ-graduation`, `occ-get-well`, `occ-new-home`, `occ-corporate`,
`occ-just-because`

## Collection headers

`col-new`, `col-best-sellers`, `col-signature`, `col-seasonal`

## Editorial sections (homepage)

`editorial-flowers`, `editorial-chocolate`, `editorial-combo`, `about-hero`

## Instagram strip

`instagram-1` through `instagram-6`

## Product photography

Each product's image seeds are listed in its `images` array in
`src/lib/data/products.ts`, e.g. `flowers-rose-1`, `flowers-rose-2`,
`choc-truffle-1`. The first seed in the array is used everywhere the product
appears as a thumbnail (grids, cart, search); all seeds are used in the
product page gallery.
