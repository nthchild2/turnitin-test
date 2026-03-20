## Research Brief: Dog Viewer Assignment

- Spec: `docs/2026-03-19-dog-viewer-spec.md`
- Date: 2026-03-19

### Relevant Files and Modules
- `docs/2026-03-19-dog-viewer-spec.md:1-28` — defines the feature scope, acceptance criteria, implementation-agnostic constraint, and current lack of open questions for the Dog Viewer work.
- `README.md:1-45` — describes the intended Dog Viewer assignment, explicitly names React and the Dog API as the intended stack, and states that the repository currently contains documentation/workflow scaffolding rather than an implemented app.
- `docs/run-ledger.md:1-8` — establishes the run ledger as an append-only audit trail and points to `templates/run-ledger-entry.md` for entry format.
- `templates/research-brief.md:1-22` — provides the required output shape for this research artifact.
- `templates/spec.md:1-25` — shows the expected spec structure that the current spec follows.
- `templates/plan.md:1-24` — shows that later planning work is expected to name concrete steps and file paths.
- `templates/run-ledger-entry.md:1-42` — defines the verification artifact format that later phases must append to the run ledger.
- `.github/copilot-instructions.md:3-39` — documents the repository workflow as `spec → research → plan → execution → verification`, with artifact-centered handoffs and role boundaries.
- `CLAUDE.md:3-34` — repeats the same framework expectations, including using `templates/` artifacts and maintaining `docs/run-ledger.md`.
- `.github/agents/` — contains the role files (`specifier.agent.md`, `researcher.agent.md`, `planner.agent.md`, `executor.agent.md`, `verifier.agent.md`) referenced by the framework instructions.

### Existing Patterns and Conventions
- The repository is currently documentation/framework-first: root contents and `docs/`/`templates/` contain process artifacts, while no existing application source tree is present.
- Both `.github/copilot-instructions.md:7-18` and `CLAUDE.md:7-26` enforce the same staged pipeline: `spec → research → plan → execution → verification`.
- Artifact templates are centralized in `templates/` (`spec.md`, `research-brief.md`, `plan.md`, `run-ledger-entry.md`) and are intended to be used as handoff contracts between phases.
- `docs/run-ledger.md:3-4` defines the run ledger as append-only and format-driven via `templates/run-ledger-entry.md`.
- The current spec in `docs/2026-03-19-dog-viewer-spec.md:20-23` is intentionally implementation-agnostic, even though `README.md:26-30` describes an intended React + Dog API assignment.

### Dependencies and Constraints
- There is currently no `package.json` anywhere in the repository, and a workspace search also found no `*.js`, `*.jsx`, `*.ts`, or `*.tsx` files, so no existing React app, build tooling, or dependency manifest is present yet.
- `README.md:28-29` identifies React and the Dog API as the intended stack/data source for the assignment, but this is descriptive documentation rather than existing installed project infrastructure.
- `docs/2026-03-19-dog-viewer-spec.md:21-23` constrains implementation work to avoid prescribing framework, libraries, APIs, or file structure in the spec itself and keeps persistence/search/filtering/responsive details out of scope.
- `README.md:34-45` and the root layout indicate the repository was forked from framework scaffolding and still includes framework materials such as `FRAMEWORK.md`, `COMPANION.md`, `.github/agents/`, and `templates/`.
- `docs/run-ledger.md:3-4` and `CLAUDE.md:28-34` constrain future verification work to append entries rather than rewrite ledger history.

### Open Questions
- `README.md:26-30` names React and the Dog API as the intended stack, while `docs/2026-03-19-dog-viewer-spec.md:21-22` keeps the spec implementation-agnostic; whether the planner/executor should treat React as required or merely preferred is not explicit in the spec artifact itself.
- The spec requires reviewer-friendly local run instructions (`docs/2026-03-19-dog-viewer-spec.md:18`), but the repository currently has no application scaffold or package manifest, so the eventual local startup commands are not yet inferable from existing code.

