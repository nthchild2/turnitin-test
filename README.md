# Dog Viewer

A React coding assignment for building a small dog-browsing experience powered by the Dog API.

## Assignment Summary

This repository is intended for a timeboxed Dog Viewer exercise. The app should let reviewers browse random dog images by breed, switch the main image from a thumbnail gallery, and save favorite dogs for quick recall. The assignment is designed to be small enough for an initial interview round while leaving room for follow-up enhancements later.

## Target Experience

### Part 1: General display

- Show one random dog image as the main image at the top of the app.
- Label the main image with its breed.
- Show 10 random dog thumbnails below the main image, each with its breed.
- When a user clicks a thumbnail, promote that dog to the main image area.
- When a user hovers over a thumbnail, it should scale up smoothly.

### Part 2: Favorites

- Add a favorites panel on the right side of the app.
- Provide a button for adding the current main dog to favorites.
- When a user clicks a favorite, show that dog as the main image.
- Include a remove button for each favorite entry.

## Stack and Data Source

- **UI framework:** React
- **API:** [Dog API](https://dog.ceo/dog-api/documentation)
- **Primary goal:** keep the app easy for reviewers to run and easy to extend in later interview rounds

## Run Locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

The development server will print a local URL such as `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

To run strict TypeScript checks:

```bash
npm run typecheck
```

To run the Jest + React Testing Library suite:

```bash
npm run test
```

## Framework Context

This project was forked from a template repository that includes the Agentic Software Development Framework. That framework is still present here as supporting project infrastructure and includes:

- repo-wide AI instructions in `.github/copilot-instructions.md` and `CLAUDE.md`
- role definitions in `.github/agents/`
- artifact templates in `templates/`
- an audit trail in `docs/run-ledger.md`

If you want the background on the framework itself, see `FRAMEWORK.md` and `COMPANION.md`. For this repository, though, the primary focus is the Dog Viewer application described above.

