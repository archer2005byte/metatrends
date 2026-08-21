# Meta Trends — GitHub deployment plan

## Current state

The ChatGPT-built presentation source has been imported into this Lovable TanStack Start project. The 12-slide interactive deck now renders at `/`, preserving the original visual language, keyboard/click navigation, and reveal states.

## What we still need to build

The handoff architecture asks for an audience companion layer on top of the presentation:

1. **Final-screen QR code** on the last (black) slide, pointing to `/resources`.
2. **Public `/resources` route** with:
   - "Go deeper" heading and short explanation
   - Grouped reading list (Intelligence, Science and health, Energy and civilisation, Work and society)
   - Optional email capture
   - "Email me the reading list" button
   - "Download the reading pack" button
   - Copyable short URL
   - Mobile-friendly layout
3. **Secure email endpoint** via Lovable Cloud (Supabase) + Resend:
   - Server-side validation
   - Single transactional email only after explicit submit
   - Confirmation and error states
   - No newsletter subscription, no data sharing
4. **Reading-pack PDF** downloadable from `/resources` and linked in the email.
5. **GitHub repository + Pages deployment**:
   - Sync this project to a GitHub repo under your account
   - Add a GitHub Actions workflow that builds the static client output and deploys to `gh-pages`
   - Configure the custom domain `meta.rogerarcher.com` in repo settings
6. **Acceptance testing**:
   - Keyboard navigation, slide-number jump, click-reveal states
   - Mobile layout
   - QR scan reaching `/resources`
   - Email delivery test
   - PDF download without email

## Hosting recommendation

GitHub Pages is the right static host for the presentation and resources page, but it cannot run the email-sending backend. I recommend:

- **Frontend**: GitHub Pages (static build from this repo)
- **Backend**: Lovable Cloud / Supabase Edge Function for the email endpoint only
- **Email**: Resend, with the API key stored server-side
- **Domain**: `meta.rogerarcher.com` CNAME to GitHub Pages; sender-domain verification handled in Resend for `rogerarcher.com`

This keeps the source in GitHub as requested, while the email service stays secure and independent of the static frontend.

## Decision needed from you

Please confirm:

1. Do you want to proceed with **GitHub Pages + Lovable Cloud email endpoint** as described above?
2. Should I create a **new GitHub repository** via Lovable's GitHub integration, or connect to an **existing repo** you already own?
3. Do you have a **Resend account/API key** ready, or should I set up the endpoint structure and leave the key for you to add as a secret?

Once you confirm these three points, I will implement the remaining features and the deployment workflow.