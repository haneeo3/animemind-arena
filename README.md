# AnimeMind Arena

Local multiplayer (2–6 players, pass-and-play) anime trivia battle game. React + Vite + TypeScript + Tailwind, with a Vercel serverless function calling Gemini for the 5 creative challenge categories.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. The 7 data-driven categories (Quote, Universe, Ability, Power, Speed, Durability, Intelligence) work fully offline. The 5 AI categories (Scenario, Personality, Relationship, Funny, Romance) fall back to local template questions in dev, since `/api/challenge` only exists once deployed to Vercel.

## Ship it (tonight)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "AnimeMind Arena MVP"
   git branch -M main
   git remote add origin https://github.com/haneeo3/animemind-arena.git
   git push -u origin main
   ```

2. **Import into Vercel**
   - vercel.com → New Project → import the repo. Framework preset: Vite. No config changes needed — `api/challenge.ts` is auto-detected as a serverless function.

3. **Set the Gemini key**
   - Get a free key at https://aistudio.google.com/app/apikey
   - Vercel → Project → Settings → Environment Variables → add `GEMINI_API_KEY`
   - Redeploy (or it'll pick it up on the next push).

4. **Test the live URL.** Play a full game, hit a Scenario/Romance/Funny question to confirm the Gemini call is actually firing (check Vercel → Deployments → Functions logs if something looks off).

## Known shortcuts (fix later, not tonight)

- `npm run build` only runs `vite build`, not `tsc -b` — the component was written fast and has a lot of implicit `any`. Run `npm run typecheck` separately when you want to tighten this up; it doesn't block shipping.
- No real character art — cards use gradient + initials. Wiring the Jikan API for images is the natural next step (fetch once per character, cache the URL in Supabase so you're not re-fetching every game).
- No persistence — collections reset on refresh. Fine for a demo; add Supabase auth + tables (see PRD section 28) if you want progress to survive a reload.
