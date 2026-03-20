# Copilot Instructions

This project uses the Agentic Software Development Framework.

## Pipeline

All work follows this pipeline: `spec → research → plan → execution → verification`.

Each phase produces an artifact. The artifact is the handoff to the next phase.
Do not skip phases unless the task is trivial (e.g., a one-line fix).

## Principles

1. **Artifact-centered**: coordinate through files, not chat history. Specs, plans, research briefs, and run ledger entries are durable artifacts.
2. **Tool-grounded**: prefer actions that use tools and produce verifiable output over narrative descriptions.
3. **Verification before trust**: do not treat model confidence as evidence. Run checks.
4. **Explicit boundaries**: each agent role has a single responsibility. Do not combine spec + plan + execution in one pass.
5. **Externalize state**: decisions, findings, and outcomes go into files — not just model context.

## Agent Roles

Use the custom agents in `.github/agents/` for structured work:
- `@specifier` — turns a request into a structured spec
- `@researcher` — investigates the codebase before planning
- `@planner` — breaks the spec into ordered steps
- `@executor` — implements steps one at a time
- `@verifier` — checks results and writes the run ledger

## Run Ledger

Every completed pipeline run gets a ledger entry in `docs/run-ledger.md`.
Failures are classified as: `model | orchestration | specification`.

## Quality Bar

- Specs must have testable acceptance criteria.
- Plans must have concrete, ordered steps with file paths.
- Execution must follow the plan without re-scoping.
- Verification must check against the spec, not opinions.

