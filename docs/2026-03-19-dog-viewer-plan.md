## Plan: Dog Viewer Assignment

- Spec: `docs/2026-03-19-dog-viewer-spec.md`
- Date: 2026-03-19

### Steps

1. **Scaffold the React app runtime**
   - What: Create the initial React web application scaffold, including the package manifest, development scripts, Vite config, and HTML entry file so the repository has a runnable frontend foundation.
   - Where: `package.json`, `vite.config.js`, `index.html`
   - Expected outcome: The repository contains a standard React app entry scaffold with install/start/build commands defined for local development.

2. **Add the frontend bootstrap and base app shell**
   - What: Add the React entrypoint, root app component, and shared stylesheet so the app can render a basic shell and host later Dog Viewer features.
   - Where: `src/main.jsx`, `src/App.jsx`, `src/index.css`
   - Expected outcome: The app has a mounted React root, a top-level `App` component, and a shared styling file ready for layout and interaction work.
   - Depends on: step 1

3. **Implement Dog API data shaping utilities**
   - What: Add a small data layer for requesting random dog images from the Dog API and normalizing each result into a consistent UI shape that includes image URL and breed label derived from the API response format.
   - Where: `src/lib/dogApi.js`, `src/lib/normalizeDog.js`
   - Expected outcome: The app has reusable helpers for fetching random dogs and converting API responses into objects the UI can render consistently.
   - Depends on: step 2

4. **Build the main image and thumbnail gallery UI**
   - What: Create focused display components for the main dog view and the 10-item thumbnail gallery, including visible breed labels and thumbnail hover enlargement styling.
   - Where: `src/components/MainDogDisplay.jsx`, `src/components/ThumbnailGallery.jsx`, `src/index.css`
   - Expected outcome: Reusable UI components exist for showing a labeled main dog image and a labeled thumbnail gallery with smooth hover scale behavior.
   - Depends on: step 3

5. **Wire initial loading and thumbnail-to-main interactions**
   - What: Update the top-level app state and effects so initial load fetches one main dog plus 10 gallery dogs, renders them through the new components, and promotes a clicked thumbnail into the main display.
   - Where: `src/App.jsx`
   - Expected outcome: On first render the app shows a labeled main dog, 10 labeled thumbnails underneath, and clicking a thumbnail updates the main image and breed label.
   - Depends on: step 4

6. **Add the favorites panel and favorites actions**
   - What: Create the right-side favorites panel and connect app state so users can add the current main dog, click a saved favorite to restore it as the main display, and remove favorites individually.
   - Where: `src/components/FavoritesPanel.jsx`, `src/App.jsx`, `src/index.css`
   - Expected outcome: A visible right-side favorites panel is present with add, select, and remove interactions that satisfy the favorites-related acceptance criteria.
   - Depends on: step 5

7. **Document reviewer run instructions**
   - What: Update the repository documentation with the exact install and local startup commands for the new React app so reviewers can run the Dog Viewer without undocumented setup.
   - Where: `README.md`
   - Expected outcome: `README.md` clearly explains how to install dependencies and start the Dog Viewer locally using the project-provided commands.
   - Depends on: step 6

### Notes
- Assumption: the implementation should use a React web app and the Dog API because the human request and `README.md` explicitly name that stack, even though the spec itself remains implementation-agnostic.
- The steps are ordered to establish tooling first, then data access, then isolated UI pieces, then app-level interactions, and finally reviewer-facing documentation once the runnable workflow is known.

