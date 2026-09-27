# Ultimateflowworkflow
This is the ultimate solution of Google Flow content creation

## UGC Ad Prompt Builder

Open `index.html` in any browser. No install is needed.

1. Choose the market: **United States (original)** or **Bangladesh**. For Bangladesh, also pick the creator's language: Banglish (default), Bangla or English. Bangla words are always written in Bangla script (English words stay in English letters), so the video voice pronounces them the Bangla way.
2. Copy the master prompt and paste it into a new ChatGPT chat (Thinking mode on). This is your **main chat**.
3. Each time ChatGPT asks a question, pick your options on the page and copy the ready-made reply.
4. For the character, product and location, the main chat gives you a **side-chat brief**. Paste it into a new chat, add your photos and approve the sheet there. Then bring the sheet image and its short **Handoff Card** back to the main chat.
   Already have photos? Each of these steps has a **sheet builder** button. It opens the matching template (Character 6 views, Expression 6 faces, Product 8 panels, Location 6 panels), lets you put a photo in each panel, move and zoom it, and download the sheet as a 9:16 PNG (1440 × 2560) with only small panel numbers on it. The photos never leave your browser. Then paste the brief in a side chat with the ready-made message the builder gives you, attach the PNG, and get the Handoff Card.
5. The main chat writes the script and draws the storyboards, up to 6 shots each. Type **Next** for each further storyboard.
6. Follow the Google Flow and CapCut checklists to make and edit the video, using one short Flow prompt per storyboard. Each Flow prompt lists its shots with exact seconds, so Flow makes one clip per shot at the right length.

### Why 4 chats

One chat holding three reference sheets, their prompts and your uploads starts to forget details, so faces drift and products change. Each sheet is made in its own chat, and the main chat only receives the approved image and a short card. The brief templates live in the master prompt; ChatGPT copies them word for word and fills in only the details. The page shows the same briefs as a backup.

### No subtitles

The video has no subtitles, captions, on-screen text or music. Storyboard pictures are clean. The only text is a one-line strip under each panel, such as `3 · 4s · SAYS: "okay so…"` (shot number, exact seconds, words): SAYS means the person speaks on camera, VO means their voice without the mouth shown, and BG means background voices or sounds. Flow reads the strips but is told never to show them.

For the US, the master prompt (`master-prompt.txt`) is used word for word. The Bangladesh version changes only the audience, character appearance and outfit options, location, and language wording, The page lists every change under "See the changes". Your choices and progress are saved in your browser.

## Commercial Ad Prompt Builder (Ads mode)

Use the **UGC | Ads** switch at the top of the page, or open `ads.html` (the link `index.html#ads` opens it too). The site remembers which mode you used last.

Ads mode is for fast-cut commercials: many cuts, flashy transitions, sound effects and on-screen text. Everything is on one page:

1. **Market and language:** US or Bangladesh; Banglish, Bangla or English for anything said on camera; an optional voiceover; 9:16 (default) or 16:9.
2. **Product and brand:** product, audience, model, brand name, call to action and offer. Optional product and character sheet builders (the same ones UGC mode uses) help keep the product the same across many cuts.
3. **Length, pace and style:** 6, 15, 30, 45 or 60 seconds; Cinematic, Punchy or Hyper pace; 6, 12 (default), 18 or 24 frames. Quick-start chips suggest good format + style + pace combinations for each category.
4. **Shot list:** every frame has its length, shot, angle, camera move, in-scene sound, the transition to the next frame, the edit sound at the cut, a line said on camera, a voiceover line and on-screen text. A timeline bar shows how the frames are grouped into Flow clips.
5. **On-screen text** in three levels: 1) Flow draws short English text; 2) ChatGPT makes an image card with the text (best for end cards, offers and all Bangla text), Flow animates only what's around the letters, and CapCut adds the entrance; 3) the text is added in CapCut. Each text line has an animation (pop, slam, slide, typewriter, word by word, shine, number roll, stamp, neon, hold) with the matching instructions for its level.
6. **Prompts:** the ChatGPT storyboard prompt (6 frames per storyboard, "Next" for each further one), one Flow prompt per storyboard, the text-card prompts, and a timed voiceover script.
7. **Cut sheet:** a shot-by-shot edit plan for CapCut: which clip each piece comes from, which seconds to keep, the transition and sound effect at each cut, and the text and voiceover times.

**Why clips are longer than shots.** Flow can't make clips shorter than 4 seconds. The builder plans the clips for you: with Cinematic pace each frame is its own clip; with Punchy pace 2–3 short frames share one clip with timed hard cuts inside it; with Hyper pace each clip is one continuous action that CapCut chops into micro-shots. Every clip gets 25–50% spare length so you can trim the best moment.

Flow makes the sound effects, the words said on camera, and level 1 text. Music and voiceover are added in CapCut.

### Publish with GitHub Pages

After this is merged into `main`:

1. Open the repository on GitHub, then **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose branch `main` and folder `/ (root)`, and click **Save**.
3. After a minute or two the site is live at `https://sabikulhasan.github.io/Ultimateflowworkflow/`. Share that link with your team and clients. Every later change to `main` updates it automatically.
