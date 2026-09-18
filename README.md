# Neou Sopanha — Portfolio (Angular)

A dark, terminal-inspired portfolio built with Angular 18 standalone components: **Home, About,
Skills, Projects, Experience, Contact**, a footer, and two floating widgets — "Ask Sopanha AI"
(bottom-left) and "Quick Contact" (bottom-right).

## Run it locally

```bash
npm install
npm start
```

Visit `http://localhost:4200`.

## Build for production

```bash
npm run build
```

Output goes to `dist/neou-sopanha-portfolio/browser` — this folder is what you deploy.

## Telegram integration (required for the chat widget & contact form to actually send)

Both the "Ask Sopanha AI" chat widget and the Contact form's "Dispatch Message" button forward
whatever the visitor types straight to your Telegram, via a small serverless function at
`api/telegram.js`. Your bot token is never shipped to the browser — it stays server-side.

**1. Create a bot** — message [@BotFather](https://t.me/BotFather) on Telegram, run `/newbot`,
and follow the prompts. It gives you a token like `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`.

**2. Get your chat ID** — message [@userinfobot](https://t.me/userinfobot) on Telegram; it
replies with your numeric chat ID. (Then send your new bot a `/start` message once, so it's
allowed to message you back.)

**3. Set environment variables** — this only works when deployed on Vercel (or any host that
runs the `api/telegram.js` function). In your Vercel project: **Settings → Environment
Variables**, add:

```
TELEGRAM_BOT_TOKEN = <token from BotFather>
TELEGRAM_CHAT_ID   = <your numeric chat id>
```

Redeploy after adding them. Locally with plain `ng serve` there's no serverless runtime, so the
`/api/telegram` call will just fail silently — that's expected; test the real flow on your
Vercel deployment, or run `vercel dev` locally if you have the Vercel CLI installed.

**4. Test it** — open the deployed site, send a message through either the chat widget or the
contact form, and it should land in your Telegram DMs within a second or two.

## Project structure

```
src/app/
  components/
    navbar/           sticky header, scroll-spy nav, search & AI-chat triggers, mobile menu
    footer/           brand, section links, back-to-top, copyright
    chat-widget/      floating "Ask Sopanha AI" panel (bottom-left) — FAQ engine + Telegram relay
    quick-contact/    floating "Quick Contact" panel (bottom-right) — Telegram + phone
    search-palette/   ⌘K command palette (sections, skills, projects, experience, contact)
  services/
    chat.service.ts       shared open/closed state for the AI chat widget
    search.service.ts     shared open/closed state for the search palette
    telegram.service.ts   POSTs messages to /api/telegram
  pages/
    home/             hero + terminal code widget + tech stack strip
    about/             profile card, philosophy quote, career goals, live local-time clock
    skills/            filterable skill grid (All / Frontend / Backend / Database / Tools)
    projects/          project cards grid
    experience/        vertical timeline (education + work + freelance)
    contact/           reactive form + contact info cards
  app.routes.ts        route table (one route per section)
  app.config.ts        router + zone config
src/styles.scss        global design tokens (colors, type, radius) + shared utility classes
```

## Customize your content

- **Profile photo:** replace `public/assets/profile.svg` with a real photo (`.jpg`/`.png`),
  then update the `src` in `src/app/pages/about/about.component.html`.
- **Project screenshots:** by default each project card shows a plain color gradient (see
  `gradient` in `projects.component.ts`) because no real screenshots were provided. To use a
  real one, drop the image in `public/assets/projects/` and set that project's `image` field:
  ```ts
  {
    title: 'CamPay Gateway',
    // ...
    image: 'assets/projects/campay.png', // add this line
    gradient: 'linear-gradient(135deg, #2dd4f4, #4f9dff)', // stays as a fallback if image is removed
  }
  ```
  The image is used for both the card cover and the case-study modal automatically — no other
  changes needed. Leave `image` unset on any project to keep the gradient placeholder.
- **Resume file:** drop your PDF at `public/assets/neou-sopanha-resume.pdf` — the navbar and hero
  "Download Resume" buttons already point there.
- **Text content:** each page's `.ts` file holds its data (skills list, projects, timeline) —
  edit the arrays directly, no need to touch the templates.
- **Colors:** all colors are CSS variables at the top of `src/styles.scss` (`--cyan`, `--blue`,
  `--violet`, etc.) — change them once and the whole site updates.
- **Contact form:** `contact.component.ts`'s `onSubmit()` currently just logs the payload.
  Wire it to your backend, a form service (Formspree, EmailJS, Getform), or your own API route.

## Deploying for your client

This is a static Angular build with one small serverless function (`api/telegram.js` — needed
for the chat widget and contact form to actually deliver messages). **Vercel is the option that
supports both out of the box**; Netlify or a plain static host will serve the site fine, but
the Telegram relay won't work there without adapting `api/telegram.js` to that platform's
function format.

### Option A — Vercel (recommended — includes the Telegram relay)
1. Push this project to a GitHub repo.
2. Go to vercel.com → **New Project** → import the repo.
3. `vercel.json` in this project already sets the build command and output directory, so the
   default settings Vercel detects should just work. It also auto-deploys `api/telegram.js` as
   a serverless function — no extra config needed.
4. Add the `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables (see the Telegram
   section above) before your first deploy, or redeploy after adding them.
5. Deploy — Vercel gives you a live URL immediately, and redeploys on every push.

### Option B — Netlify (static only, no Telegram relay)
1. Push to GitHub (or drag-and-drop the built `dist/neou-sopanha-portfolio/browser` folder into
   Netlify's dashboard for an instant deploy).
2. If connecting a repo: build command `npm run build`, publish directory
   `dist/neou-sopanha-portfolio/browser`.
3. Because this uses client-side routing, add a `public/_redirects` file containing:
   `/*  /index.html  200`
4. To get the chat/contact-form Telegram relay working here too, you'd port the logic in
   `api/telegram.js` into a [Netlify Function](https://docs.netlify.com/functions/overview/)
   and update `TelegramService`'s endpoint accordingly.

### Option C — Your own server / client's hosting (static only, no Telegram relay)
1. Run `npm run build`.
2. Upload the contents of `dist/neou-sopanha-portfolio/browser` to the web root.
3. Configure the server to fall back to `index.html` for unknown routes (Angular's router
   handles the rest client-side). For Nginx: `try_files $uri $uri/ /index.html;`
4. You'd need your own backend endpoint for the Telegram relay — `api/telegram.js` is
   plain Node and easy to adapt into an Express route or similar.

### Custom domain
All three options above support pointing a custom domain (e.g. `neousopanha.dev`) at the deploy —
you'd add the domain in the host's dashboard and update your DNS records (usually a CNAME or
A record) as they instruct.

I can't push code to GitHub or deploy to a live host directly from here, but the project builds
cleanly (already verified) and is ready to hand off — just push it to a repo and connect it to
whichever host you and your client prefer.
