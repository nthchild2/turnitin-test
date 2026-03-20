## Research Brief: Dog Viewer TypeScript Migration and Test Coverage

- Spec: `docs/2026-03-19-ts-migration-spec.md`
- Date: 2026-03-19

### Relevant Files and Modules
- `docs/2026-03-19-ts-migration-spec.md:1-28` — defines migration/test scope, acceptance criteria, and open questions for strictness, coverage, and mandatory components.
- `package.json:1-20` — current tooling/scripts (`dev`, `build`, `preview`) and dependencies; no TypeScript, Jest, or test script exists.
- `vite.config.js:1-6` — build tool config is minimal Vite + React and has no test-related setup.
- `index.html:1-10` — app entry still points to `/src/main.jsx`, which will need alignment with any TS/TSX entry rename.
- `src/main.jsx:1-10` — React root bootstrap file that would migrate to TSX and typed DOM root handling.
- `src/App.jsx:1-121` — central state/effects and user interactions (main dog selection, favorites add/remove, error/loading states); highest-impact file for typed app state and behavior tests.
- `src/lib/dogApi.js:1-31` — fetch layer and API response assumptions (`status`, `message`) where explicit response/domain types are needed.
- `src/lib/normalizeDog.js:1-31` — normalization and derived breed label logic that defines the app’s core dog object shape.
- `src/components/MainDogDisplay.jsx:1-23` — renders loading vs selected dog view; candidate for rendering-focused component tests.
- `src/components/ThumbnailGallery.jsx:1-28` — gallery click interaction (`onSelectDog`) and list rendering behavior for component tests.
- `src/components/FavoritesPanel.jsx:1-42` — empty state, select, and remove interactions for favorites; candidate for interaction tests.
- `README.md:32-47` — documents only install/dev/build workflows; no test workflow documented yet.

### Existing Patterns and Conventions
- Current source is React function components in `.jsx` files with hooks and local state; no class components (`src/App.jsx:1-121`, `src/components/*.jsx`).
- Data shape is informal and inferred from usage (`dog.id`, `dog.imageUrl`, `dog.breedLabel`) rather than declared types (`src/App.jsx:20-31`, `src/components/MainDogDisplay.jsx:13-18`, `src/lib/normalizeDog.js:25-30`).
- Error handling uses `error instanceof Error` guard and user-facing fallback strings (`src/App.jsx:53-59`, `src/lib/dogApi.js:8-16`).
- UI behavior is split by concern into small presentational components plus top-level orchestration in `App` (`src/components/*.jsx`, `src/App.jsx:73-118`).
- Accessibility/testing hooks currently rely on semantic roles/labels/text (for example `role="alert"`, button labels, `aria-label`) rather than `data-testid` attributes (`src/App.jsx:84`, `src/components/FavoritesPanel.jsx:29`).
- Project process follows artifact pipeline (`spec -> research -> plan -> execution -> verification`) and expects durable docs in `docs/` (`CLAUDE.md:7-29`, `.github/copilot-instructions.md:7-33`).

### Dependencies and Constraints
- The repo is ESM (`"type": "module"`) and currently has only React + Vite dependencies; Jest and TypeScript toolchain packages are absent (`package.json:5-18`).
- There is no existing TS/Jest config baseline: no `tsconfig*.json`, no Jest config files, no Babel config, and no declaration files (workspace search results).
- There are no existing test files (`**/*.{test,spec}.{js,jsx,ts,tsx}` search returned none), so component tests will be net-new structure/convention.
- The app depends on Dog API response contract (`status: success`, `message`) and throws on unexpected responses; migration must preserve this runtime behavior (`src/lib/dogApi.js:5-18`).
- `index.html` currently references a JSX entry path (`/src/main.jsx`), so any filename migration to TS/TSX must keep this entry resolution correct (`index.html:10`).
- Spec constraints disallow broad type-safety escape hatches and feature redesign during migration (`docs/2026-03-19-ts-migration-spec.md:19-21`).

### Open Questions
- The spec asks for “Jest-based” tests, but the current Vite project has no test runner baseline; should test execution be Jest-only, or is Jest + React Testing Library expected as the standard component-test stack?
- Strictness level is explicitly unresolved in spec (`full strict` vs subset); should `tsconfig` enforce `strict: true` from the first migration pass?
- Minimum required component-test coverage is not defined; which components are mandatory for the first acceptance pass (`App`, `MainDogDisplay`, `ThumbnailGallery`, `FavoritesPanel`)?
- The spec requires CI/local passing test command, but there is no CI config in the visible workspace snapshot; where should the new test command be wired for CI verification?
