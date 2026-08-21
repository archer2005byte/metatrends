# Integrate ChatGPT Microsite and Deploy to GitHub Pages

## Goal
Take the application handoff package from your ChatGPT-built microsite, bring it into this Lovable project, and publish it as a live site via GitHub Pages.

## Important context
- This project is a TanStack Start app managed by Lovable. Lovable's own publish button is the simplest way to go live, but you have asked for GitHub Pages specifically.
- GitHub Pages works best for static HTML/CSS/JS sites. If the handoff package is a framework build (React/Vue/Svelte with a bundler), we will need a build step and a compatible output format.
- Cloudflare-ready usually means static files or a worker build. GitHub Pages cannot run Cloudflare Workers, so any worker/backend logic will need to be removed or replaced.

## Plan

1. Receive and inspect the handoff package
   - Review the file list, `package.json` (if any), build scripts, and entry HTML file.
   - Confirm whether the site is static HTML/CSS/JS or a framework build.

2. Integrate the microsite into this project
   - If static: copy the assets into the project and wire the root route to serve the microsite.
   - If framework-based: adapt the source into the existing TanStack Start structure or create a static export build.
   - Replace the placeholder `src/routes/index.tsx` content with the microsite.

3. Verify the site builds and previews correctly
   - Run the dev server and confirm the microsite renders at `/`.
   - Fix any broken paths, asset references, or framework incompatibilities.

4. Connect the project to GitHub
   - Use Lovable's GitHub integration to create/sync a repository under your GitHub account.

5. Configure GitHub Pages
   - In the synced GitHub repository, enable GitHub Pages.
   - Set the source branch (typically `gh-pages` after a deploy action, or the `main` folder if static).
   - If a build step is required, add a GitHub Actions workflow to build and deploy to `gh-pages`.

6. Validate the live deployment
   - Confirm the GitHub Pages URL loads the microsite correctly.
   - Check for missing assets or routing issues.

## Alternative to keep in mind
If GitHub Pages becomes complicated because the microsite needs server-side features or a non-static build, Lovable's native publish button can put the site live at a `.lovable.app` URL in one step. We can fall back to that if GitHub Pages is not suitable.
