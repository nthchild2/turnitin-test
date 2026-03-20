# CLAUDE.md

This project uses the Agentic Software Development Framework.

## Pipeline

All work follows: `spec → research → plan → execution → verification`.

Each phase produces a durable artifact. The artifact is the handoff contract.

## How to Work in This Project

1. **Start with a spec.** Turn any request into a structured spec with acceptance criteria before writing code. Use the format in `templates/spec.md`.
2. **Research before planning.** Read the codebase. Use tools to search, list files, and understand existing patterns. Write findings into a research brief using `templates/research-brief.md`.
3. **Plan before executing.** Break the spec into ordered, concrete steps with file paths. Use `templates/plan.md`.
4. **Execute step by step.** Follow the plan in order. Do not skip, reorder, or improvise. If blocked, stop and report.
5. **Verify against the spec.** Check acceptance criteria. Run builds, tests, and linters. Write a run ledger entry using `templates/run-ledger-entry.md`.

## Principles

- Coordinate through artifacts (files), not chat continuity.
- Use tools to read and write. Do not guess at codebase structure.
- Model confidence is not evidence. Run checks.
- Each role has one job. Do not combine spec + plan + execution in one pass.
- Persist decisions and outcomes in files. Context windows are temporary.
- If verification fails, classify the failure: `model | orchestration | specification`.

## Run Ledger

Maintain `docs/run-ledger.md` as the audit trail for all pipeline runs.

## Templates

Artifact templates are in `templates/`. Use them for consistency.

