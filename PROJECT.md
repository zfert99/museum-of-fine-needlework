# Museum of Fine Needlework

A nonogram game dressed as a completely earnest museum of embroidery. Every exhibit is a 10×10 cross-stitch of something mundane or absurd, and you restore it stitch by stitch. The museum never admits anything is strange.

Live prototype: the "Museum of Fine Needlework" artifact on claude.ai. `index.html` in this folder is the same page as a standalone file. Open it in any browser; it needs no build step or server.

## Origin

- Started from a taste questionnaire and a review of ~420 saved Reddit posts (the taste profile is kept outside this repo).
- The trigger was a nonogram already being a cross-stitch pattern. The existing puzzle-generator site works but feels generic and portfolio-shaped; this was a test of whether a handmade, deadpan skin makes it feel personal.
- Chosen bit: **Museum of fine needlework**. Other options considered: earnest mail-order craft kit company; grandma's sewing box.
- Built first as a standalone prototype, separate from the Next.js puzzle site.

## The rule of the bit

The site never winks. Tone stays museum-placard calm regardless of subject, in the spirit of *Airplane!* and *UHF*: total commitment to the bit at any cost. No snarky commentary and no parodies of other websites' logos.

## How it plays

- Click or drag to stitch; right-click or **Mark bare** to note an empty square. **Unpick all** resets a work.
- Clues fade when a row or column is satisfied. A work counts as solved when every clue matches, so puzzles with more than one solution still finish.
- On solving, stitches change from working blue to the object's real colours, and the placard reveals the title, medium and curator's note. Before that the placard reads "Untitled. Attribution withheld until restoration is complete."
- Progress, finished works and opened galleries are saved in the browser (`localStorage` key `mfn`).
- Keyboard: arrow keys move, Space/Enter stitches, X marks bare.

### Stitch look (settled through iteration)

1. Slanted X's with a slight random tilt per stitch.
2. Connected stitches: legs run corner to corner through shared aida holes, so neighbours join into continuous thread. Bottom leg is sewn first, then the top leg, and all top legs lean the same way, as in real cross-stitch. Thread has a faint twist highlight and shadow.
3. Thicker version of (2), then thinned ~12%. **Current:** connected, thread width 0.29 of a cell (shadow 0.35, twist 0.08).

Slanted and connected can't coexist: the tilt moves the corners off the shared holes.

## The descent

Each gallery opens when every playable work in the previous one is finished. Once open, it stays open.

| Gallery | Name | Works | Accession dates | Visitors are… |
|---|---|---|---|---|
| 4 | Objects of the Kitchen Drawer | Portion, Sealed (Babybel) · Do Not Eat (silica gel) · Tuber, Found Beneath a Cabinet · Closure (bread tag) | 1987–2011 | invited |
| 5 | Objects of the Living Room | Remote, Between the Cushions · Sock (Pair Unknown) · *Thrill-Seeking Plumber* (withdrawn) | 2014–2019 | encouraged |
| 6 | Objects of the Garage | Coffee Can of Assorted Screws · Lawn Chair, Folding | 2022–2025 | expected |
| 7 | Objects of the Basement | Box Labeled MISC · Gallery 4 (depicts the first gallery) · *Hedgehog, Blue, Moving Quickly* (withdrawn) | 2031–2063 | obliged |
| — | (no name) | Sigil to Summon Garthol, Demon of the Deep · Visitor | 2116, then today's date | required |

- The wall darkens a little per gallery. The last gallery has its own near-black, oxblood look in every theme.
- A gallery opening shows one calm line: "Gallery 5 is now open to visitors."
- **Withdrawn works** are an empty hoop with the placard "Withdrawn at the request of the rights holder." This stands in for parody pieces (a recognizable plumber, etc.), which can't be stitched for copyright reasons. The museum's sincere regret is the joke.
- **Visitor** is the final piece: a figure looking at a frame. "Restored by the visitor." Its accession number is the day you finish it, and the note thanks you for your contribution to the permanent collection.

### Secrets

- Tap the round **MN** seal five times quickly to open the vault: *Votive Biscuit*, accession V.0001. The footer hints: "The vault is not open to the public."

## Decisions

- **Ending: the museum never acknowledges anything is wrong.** (Chosen.)
- Grid size stays 10×10 for now.
- Puzzle uniqueness: every puzzle has exactly one solution except the potato, which has two. Its placard owns this: "the museum accepts either reading."

## Parked ideas

- **One crack:** after the final sigil, a single line slips out of tone, then the page returns to normal as if nothing happened.
- **The loop:** finishing the last gallery returns you to a subtly wrong Kitchen Drawer, with the same works and slightly off placards.
- **15×15 grids** in later galleries so difficulty rises as things get stranger.
- More works per gallery. Candidates already floated: coaster, the throw pillow nobody may use, extension cord, a door that wasn't on the floor plan, a ritual circle, an eye.
- A recurring withdrawn work in more galleries, each with a slightly different regretful note.
- Porting the treatment back into the Next.js puzzle site.

## Files

- `index.html`: the whole game (HTML, CSS and JS in one file; fonts from Google Fonts).
- `tools/check-unique.js`: reads every puzzle from `index.html` and reports how many solutions each has. Run with `node tools/check-unique.js`. Use it after adding or editing a puzzle; anything other than `1` means the picture can be solved a different way.

### Adding a work

Add an entry to `WORKS` in `index.html`:

```js
{w:1, id:'coaster', acc:'2015.07', title:'Coaster, Unused',
 note:'Placed beneath nothing since acquisition.',
 g:["..........", /* 10 rows of 10 chars */ ]}
```

- `w` is the gallery index (0–4).
- In `g`, `.` is bare cloth and any other letter is a stitch. The letter picks the finished colour from `INK`; add new colours there.
- Add `gone:true` (and no `g`) for a withdrawn work, `vault:true` for a secret one.
