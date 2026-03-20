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


## Run: Dog Viewer TypeScript Migration and Test Coverage

- ID: 2026-03-19-ts-migration
- Date: 2026-03-19
- Type: refactor
- Status: pass

### Spec Summary
Migrate the existing Dog Viewer React application from JavaScript to TypeScript with explicit, meaningful types across app logic and UI components, avoiding broad `any` usage. Add a Jest-based test setup and introduce component-level tests so core user-facing behavior is validated through automated testing, while preserving existing functionality and user experience.

### Acceptance Criteria
- [x] The app codebase is converted from JavaScript source files to TypeScript/TSX where applicable, and the project builds successfully with TypeScript enabled.
- [x] Core domain data used by the app (for example, dog-related API and normalized data structures) is represented with explicit TypeScript types/interfaces.
- [x] No broad `any` is introduced in application source files except where explicitly justified and documented as an unavoidable boundary.
- [x] A Jest-based test command runs successfully in CI/local workflow and exits with passing status.
- [x] Component tests exist for key UI components and verify observable behavior (rendering, user interaction, and expected state/output changes).
- [x] Existing user-visible behavior of the Dog Viewer app remains functionally equivalent after migration (no intentional feature changes).

### Verification Checks
- `npm run typecheck` completes successfully (`tsc --noEmit`).
- `npm run test -- --runInBand` completes successfully (4 suites, 9 tests passed).
- `npm run build` completes successfully (`tsc --noEmit` + `vite build`).
- `src/**/*.js` and `src/**/*.jsx` search returns no results, confirming source migration.
- `grep` for `\bany\b` in `src/**/*.{ts,tsx}` returns no results.
- `git status --short` and `git diff --name-status` reviewed for scope and regressions; changes align with migration/tooling/tests/docs scope.

### Result
- Outcome: pass
- Failure classification (if applicable): N/A
- Notes: All acceptance criteria were verifiably met based on build/typecheck/test results and file-level inspection. Behavior equivalence is supported by passing integration/component tests for key flows and no intentional feature additions observed in changed files.

### Files Changed
- `README.md` — updated commands/docs for TypeScript and Jest workflows.
- `docs/2026-03-19-ts-migration-plan.md` — migration plan artifact updates.
- `docs/2026-03-19-ts-migration-research-brief.md` — research brief artifact updates.
- `docs/2026-03-19-ts-migration-spec.md` — migration spec artifact.
- `index.html` — entry script updated to `src/main.tsx`.
- `jest.config.cjs` — Jest configuration for TypeScript tests.
- `package-lock.json` — dependency lockfile updates for TypeScript/Jest tooling.
- `package.json` — scripts and dev dependencies for typecheck/test/build.
- `src/App.jsx` — removed legacy JavaScript source.
- `src/App.test.tsx` — added app behavior tests with API mocking.
- `src/App.tsx` — migrated app logic to TypeScript.
- `src/components/FavoritesPanel.jsx` — removed legacy JavaScript component.
- `src/components/FavoritesPanel.test.tsx` — added favorites panel behavior tests.
- `src/components/FavoritesPanel.tsx` — migrated favorites panel to TypeScript.
- `src/components/MainDogDisplay.jsx` — removed legacy JavaScript component.
- `src/components/MainDogDisplay.test.tsx` — added main display render tests.
- `src/components/MainDogDisplay.tsx` — migrated main display to TypeScript.
- `src/components/ThumbnailGallery.jsx` — removed legacy JavaScript component.
- `src/components/ThumbnailGallery.test.tsx` — added thumbnail gallery render/interaction tests.
- `src/components/ThumbnailGallery.tsx` — migrated thumbnail gallery to TypeScript.
- `src/lib/dogApi.js` — removed legacy JavaScript API utility.
- `src/lib/dogApi.ts` — migrated API utility to TypeScript with typed responses.
- `src/lib/normalizeDog.js` — removed legacy JavaScript normalization utility.
- `src/lib/normalizeDog.ts` — migrated normalization utility to TypeScript.
- `src/main.jsx` — removed legacy JavaScript entry point.
- `src/main.tsx` — migrated app bootstrap to TypeScript.
- `src/test/setupTests.ts` — added Jest Testing Library setup.
- `src/types/dog.ts` — added shared domain/API type definitions.
- `tsconfig.json` — TypeScript project configuration (strict mode).
- `tsconfig.node.json` — TypeScript Node/Vite config typing.
