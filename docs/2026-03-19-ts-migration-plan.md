## Plan: Dog Viewer TypeScript Migration and Test Coverage

- Spec: `docs/2026-03-19-ts-migration-spec.md`
- Date: 2026-03-19

### Steps

1. **Set up strict TypeScript and Jest + RTL tooling**
   - What: Add TypeScript compiler settings with strict mode enabled, add Jest + React Testing Library configuration for jsdom tests, and add test/build/type scripts to project tooling.
   - Where: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `jest.config.cjs`, `src/test/setupTests.ts`
   - Expected outcome: The project has a strict TypeScript baseline and a runnable Jest test command suitable for component testing.

2. **Define shared dog domain types**
   - What: Introduce explicit interfaces/types for API payloads and normalized dog objects used across app logic and UI props.
   - Where: `src/types/dog.ts`
   - Expected outcome: A single source of truth exists for dog-related data contracts without broad `any` usage.
   - Depends on: step 1

3. **Migrate normalization layer to TypeScript**
   - What: Convert dog normalization utilities to TypeScript and wire them to shared domain types while preserving current normalization behavior and fallbacks.
   - Where: `src/lib/normalizeDog.ts`
   - Expected outcome: Normalization code is typed end-to-end and returns the same runtime shape/behavior as before.
   - Depends on: step 2

4. **Migrate API layer to TypeScript with typed responses**
   - What: Convert Dog API fetching logic to TypeScript, type the success/error response handling, and preserve existing response validation and thrown error behavior.
   - Where: `src/lib/dogApi.ts`
   - Expected outcome: API interaction uses explicit response/domain types and keeps current runtime contract compatibility.
   - Depends on: step 3

5. **Migrate presentational components to TSX with typed props**
   - What: Convert UI components to TSX and add explicit prop types for rendering and callback interactions, keeping markup/UX behavior unchanged.
   - Where: `src/components/MainDogDisplay.tsx`, `src/components/ThumbnailGallery.tsx`, `src/components/FavoritesPanel.tsx`
   - Expected outcome: Core reusable components are strictly typed and functionally equivalent in rendered behavior and interactions.
   - Depends on: step 2

6. **Migrate app orchestration and entrypoint to TSX**
   - What: Convert app state/effects/orchestration and bootstrap entry files to TSX, apply typed state/action handlers, and align HTML entry path with renamed TSX entry.
   - Where: `src/App.tsx`, `src/main.tsx`, `index.html`
   - Expected outcome: The app compiles under strict TypeScript and preserves existing user-visible flow (loading, error, favorites, selection).
   - Depends on: step 4

7. **Add component tests for display and gallery behavior**
   - What: Create Jest + RTL tests validating rendering and interaction for the main dog display and thumbnail gallery components.
   - Where: `src/components/MainDogDisplay.test.tsx`, `src/components/ThumbnailGallery.test.tsx`
   - Expected outcome: Automated tests cover observable rendering states and click-driven selection behavior for these components.
   - Depends on: step 5

8. **Add component tests for favorites interactions**
   - What: Create Jest + RTL tests covering favorites panel empty state, selection action, and remove action behavior.
   - Where: `src/components/FavoritesPanel.test.tsx`
   - Expected outcome: Favorites interactions are verified by automated component tests using accessible UI queries.
   - Depends on: step 5

9. **Add top-level app behavior test with API mocking**
   - What: Create an App-level test that mocks the Dog API layer and validates key user-observable flows (initial load, main dog display, add/remove favorites, and error rendering).
   - Where: `src/App.test.tsx`
   - Expected outcome: Critical end-user behavior remains functionally equivalent after migration and is protected by regression tests.
   - Depends on: step 6

10. **Document and finalize local workflow commands**
   - What: Update project documentation for TypeScript and Jest workflows, including install, typecheck/build, and test commands expected for local/CI use.
   - Where: `README.md`
   - Expected outcome: Contributors can run strict type checks and Jest component tests consistently in local and CI workflows.
   - Depends on: step 9

### Notes
- Assumption: TypeScript strictness is resolved to full strict mode (`strict: true`) per your direction.
- Assumption: Mandatory initial component coverage includes `App`, `MainDogDisplay`, `ThumbnailGallery`, and `FavoritesPanel`.
- Assumption: Jest + React Testing Library is the required testing stack, with jsdom environment and no minimum numeric coverage threshold defined in this pass.
- Order rationale: shared type contracts and utility migration are sequenced before app/component migration to minimize type churn and prevent duplicate interface definitions.

