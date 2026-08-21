# Meta Trends — GitHub + Resources + Email Plan

## Goal
Finish the Meta Trends microsite in this Lovable project, add the missing audience layer, and deploy it to a new GitHub repository with GitHub Pages static hosting. Use Lovable's built-in managed email for the optional reading-list send.

## Decisions already confirmed
- Email provider: **Lovable built-in email** (domain `rogerarcher.com`, sender `reading@rogerarcher.com`).
- Source control: **Create a new GitHub repository via Lovable's GitHub integration**.
- Target domain: `meta.rogerarcher.com` (configured after first publish).

## Current state
- The presentation source from the handoff package is already ported into `src/routes/index.tsx` and the four presentation stylesheets are wired into `src/styles.css`.
- The dev server renders the slide deck correctly.
- Missing pieces: final-slide QR code, `/resources` route, email capture + send, reading-pack PDF, GitHub repo + Pages workflow.

## Implementation steps

### 1. Enable Lovable Cloud + email domain
- Enable Lovable Cloud on the project.
- Set up the sender domain for `rogerarcher.com` so emails can be sent from `reading@rogerarcher.com`.
- Scaffold transactional email templates (`src/lib/email-templates/`).

### 2. Add the reading-pack PDF
- Generate a reading-pack PDF from the link groups defined in the architecture brief.
- Store it as a Lovable Asset or in `public/` so it is downloadable from `/resources` without email submission.

### 3. Build `/resources`
- Create `src/routes/resources.tsx` with its own `head()` metadata.
- Page contents:
  - Heading: "Go deeper"
  - Subhead: "The sources behind the conversation."
  - Optional email field + "Email me the reading list" button.
  - "Download the reading pack" button.
  - Copyable short URL: `https://meta.rogerarcher.com/resources`
  - Link groups: Intelligence, Science and health, Energy and civilisation, Work and society.
- Client-side email validation, privacy note, confirmation/error states.
- Submission calls a server function; the page remains usable if email fails.

### 4. Add the final-slide QR code
- On the last slide (black terminal screen), reveal a QR code that links to `/resources` on the final click/transition.
- Keep the existing black-screen visual ending.

### 5. Server-side email send
- Create a `createServerFn` endpoint that receives an email address, validates it server-side, and sends the "Meta Trends — further reading" email using the scaffolded `sendTemplateEmail` helper.
- Email body includes the `/resources` link and the reading-pack download link.
- Handle duplicate submissions gracefully.
- No newsletter subscription, no list storage beyond the single send.

### 6. GitHub repository + Pages deployment
- Create a new GitHub repository through Lovable's GitHub integration.
- Add a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
  - Builds the static client (`nitro: { preset: 'static' }` or equivalent).
  - Pushes the output to the `gh-pages` branch.
  - Configures GitHub Pages to serve from that branch.
- Ensure the workflow does not commit secrets or `.env` files.

### 7. SEO / metadata
- Give `/resources` its own title, description, og:title, og:description, og:type and twitter:card.
- Keep root metadata for the presentation.
- Do not add placeholder or relative `og:image` URLs.

### 8. Acceptance testing
- Keyboard navigation (Space, ArrowDown, ArrowUp, Shift+Space, PageDown, PageUp).
- Slide-number jump.
- All click-reveal states open and close.
- Mobile layout for `/resources`.
- QR code links to `/resources`.
- Email submission returns confirmation and the email arrives.
- PDF downloads without submitting an email.

## Technical details
- Framework: TanStack Start (already in use).
- Static hosting: GitHub Pages.
- Backend: Lovable Cloud / Supabase server functions for the email endpoint.
- Email: Lovable managed email, not Resend.
- Secrets: email API keys stay server-side; no client-side exposure.
- Custom domain `meta.rogerarcher.com` is connected after first publish.

## Out of scope
- Newsletter signup or marketing-email automation.
- User accounts / persistent email list storage.
- Resend integration (superseded by Lovable built-in email).
