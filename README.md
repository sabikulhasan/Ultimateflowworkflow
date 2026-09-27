# Ultimateflowworkflow
This is the ultimate solution of Google Flow content creation

## UGC Ad Prompt Builder

Open `index.html` in any browser. No install is needed.

1. Choose the market: **United States (original)** or **Bangladesh**. For Bangladesh, also pick the creator's language: Banglish (default), Bangla or English.
2. Copy the master prompt and paste it into a new ChatGPT chat (Thinking mode on). This is your **main chat**.
3. Each time ChatGPT asks a question, pick your options on the page and copy the ready-made reply.
4. For the character, product and location, the main chat gives you a **side-chat brief**. Paste it into a new chat, add your photos and approve the sheet there. Then bring the sheet image and its short **Handoff Card** back to the main chat.
   Already have photos? Each of these steps has a **sheet builder** button. It opens the matching template (Character 6 views, Expression 6 faces, Product 8 panels, Location 6 panels), lets you put a photo in each panel, move and zoom it, and download the sheet as a 9:16 PNG (1440 × 2560) with only small panel numbers on it. The photos never leave your browser. Then paste the brief in a side chat with the ready-made message the builder gives you, attach the PNG, and get the Handoff Card.
5. The main chat writes the script and draws the storyboards, up to 6 shots each. Type **Next** for each further storyboard.
6. Follow the Google Flow and CapCut checklists to make and edit the video, using one short Flow prompt per storyboard.

### Why 4 chats

One chat holding three reference sheets, their prompts and your uploads starts to forget details, so faces drift and products change. Each sheet is made in its own chat, and the main chat only receives the approved image and a short card. The brief templates live in the master prompt; ChatGPT copies them word for word and fills in only the details. The page shows the same briefs as a backup.

### No subtitles

The video has no subtitles, captions, on-screen text or music. Storyboard pictures are clean. The only text is a one-line strip under each panel, such as `3 · SAYS: "okay so…"`: SAYS means the person speaks on camera, VO means their voice without the mouth shown, and BG means background voices or sounds. Flow reads the strips but is told never to show them.

For the US, the master prompt (`master-prompt.txt`) is used word for word. The Bangladesh version changes only the audience, character appearance and outfit options, location, and language wording, The page lists every change under "See the changes". Your choices and progress are saved in your browser.

### Publish with GitHub Pages

After this is merged into `main`:

1. Open the repository on GitHub, then **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose branch `main` and folder `/ (root)`, and click **Save**.
3. After a minute or two the site is live at `https://sabikulhasan.github.io/Ultimateflowworkflow/`. Share that link with your team and clients. Every later change to `main` updates it automatically.
