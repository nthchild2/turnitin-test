# Run Ledger

Append-only audit trail. Each pipeline run adds a new entry below.
Use the format in `templates/run-ledger-entry.md`.

---

## Run: Dog Viewer Assignment

- ID: 2026-03-19-dog-viewer
- Date: 2026-03-19
- Type: feature
- Status: pass

### Spec Summary
Build a Dog Viewer experience that presents a primary random dog image with its breed label, a gallery of additional random dog thumbnails with breed labels, and a favorites area that lets users save, revisit, and remove favorite dogs. The application must support clear interaction between the main image, thumbnail gallery, and favorites panel, and the repository must be straightforward for reviewers to run locally.

### Acceptance Criteria
- [x] On initial load, the interface displays one main random dog image at the top, and that main image is visibly labeled with its breed.
- [x] The interface displays 10 random dog thumbnails below the main image, and each thumbnail is visibly labeled with its breed.
- [x] Clicking any thumbnail updates the main display so that the clicked dog becomes the main image, with the corresponding breed label shown.
- [x] Hovering over a thumbnail causes it to smoothly enlarge.
- [x] A favorites panel is visible on the right side of the interface.
- [x] A visible control allows the user to add the currently displayed main dog to the favorites panel.
- [x] Clicking any dog in the favorites panel updates the main display so that the selected favorite becomes the main image, with the corresponding breed label shown.
- [x] Each favorite shown in the favorites panel includes a remove control that removes that favorite from the favorites panel when used.
- [x] The repository includes sufficient project-provided run instructions or commands so a reviewer can start the Dog Viewer locally without undocumented setup steps.

### Research Findings
- The repository started as framework/documentation scaffolding with no existing React app or `package.json`.
- `README.md` described the intended React + Dog API assignment, but the runtime app needed to be created from scratch.
- Framework artifacts in `templates/` and `docs/run-ledger.md` had to be preserved and extended rather than replaced.

### Plan Summary
1. Scaffold the React app runtime.
2. Add the frontend bootstrap and base app shell.
3. Implement Dog API data shaping utilities.
4. Build the main image and thumbnail gallery UI.
5. Wire initial loading and thumbnail-to-main interactions.
6. Add the favorites panel and favorites actions.
7. Document reviewer run instructions.

### Execution Notes
Implemented a Vite + React Dog Viewer app with Dog API fetching, breed-label normalization, a main image area, a 10-item thumbnail gallery, and a right-side favorites panel. Added reviewer-facing run/build commands to `README.md`, created the required spec/research/plan artifacts, and updated `.gitignore` so generated install/build/browser artifacts stay out of source control.

### Verification Result
- Checks run: `npm install`; `npm run build`; `npm run dev`; browser verification of initial render, thumbnail count, thumbnail click behavior, hover transform, favorites panel placement, add/select/remove favorite flows; README command review against executed commands
- Result: pass
- Failure classification (if applicable): 
- Notes: All acceptance criteria were verified. `npm install` reported 2 moderate vulnerabilities in the Vite 5 dependency line, but installation, local startup, and production build all succeeded in the verified environment.

### Files Changed
- `package.json` — added project manifest and scripts for the Vite React app.
- `package-lock.json` — added dependency lockfile after installation.
- `vite.config.js` — added Vite configuration.
- `index.html` — added app entry HTML.
- `src/main.jsx` — added React bootstrap entry point.
- `src/App.jsx` — added main Dog Viewer application logic and layout.
- `src/index.css` — added application styling.
- `src/lib/dogApi.js` — added dog API data-fetching utilities.
- `src/lib/normalizeDog.js` — added dog data normalization logic.
- `src/components/MainDogDisplay.jsx` — added main dog display component.
- `src/components/ThumbnailGallery.jsx` — added thumbnail gallery component.
- `src/components/FavoritesPanel.jsx` — added favorites panel component.
- `README.md` — added install and run instructions.
- `.gitignore` — added ignores for `node_modules`, `dist`, and `.playwright-mcp` artifacts.
- `docs/2026-03-19-dog-viewer-spec.md` — added feature spec artifact.
- `docs/2026-03-19-dog-viewer-research-brief.md` — added research brief artifact.
- `docs/2026-03-19-dog-viewer-plan.md` — added execution plan artifact.

