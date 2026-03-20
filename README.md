# Agentic Software Development Framework

A drop-in framework for structured, verifiable AI-assisted software development.

## What This Is

A set of agent definitions, instruction files, and artifact templates that enforce a pipeline-based development workflow. Instead of unstructured "vibe coding," every unit of work flows through defined phases with concrete artifacts at each handoff.

## The Pipeline

```
spec → research → plan → execution → verification
```

| Phase | Input | Output | Agent |
|-------|-------|--------|-------|
| Spec | Human request | Spec artifact | `@specifier` |
| Research | Spec | Research brief | `@researcher` |
| Plan | Spec + research brief | Plan artifact | `@planner` |
| Execution | Plan + spec + research | Code changes | `@executor` |
| Verification | Spec + code changes | Run ledger entry | `@verifier` |

## Quick Start

1. Copy this folder's contents into your project root.
2. Start working with your AI tool (Copilot, Claude, etc.) — the instruction files are picked up automatically.
3. For structured work, invoke agents by role: `@specifier`, `@researcher`, `@planner`, `@executor`, `@verifier`.
4. For simpler tasks, the repo-wide instructions in `.github/copilot-instructions.md` and `CLAUDE.md` guide the AI to follow the pipeline.

## Folder Structure

```
.github/
  copilot-instructions.md        # Repo-wide Copilot instructions
  agents/
    specifier.md                  # Copilot custom agent: spec writer
    researcher.md                 # Copilot custom agent: codebase investigator
    planner.md                    # Copilot custom agent: plan generator
    executor.md                   # Copilot custom agent: step-by-step implementer
    verifier.md                   # Copilot custom agent: checker + ledger writer
  instructions/
    (add path-specific instructions here as needed)
.claude/
  rules/
    artifacts.md                  # Claude rules for artifact files
    execution.md                  # Claude rules for source code changes
CLAUDE.md                         # Claude Code project instructions
templates/
  spec.md                         # Spec artifact template
  research-brief.md               # Research brief template
  plan.md                         # Plan artifact template
  run-ledger-entry.md             # Run ledger entry template
docs/
  run-ledger.md                   # Append-only audit trail (create on first run)
FRAMEWORK.md                      # Full framework documentation
```

## Tool Compatibility

| Tool | Instruction File | Agent Files |
|------|-----------------|-------------|
| GitHub Copilot | `.github/copilot-instructions.md` | `.github/agents/*.md` |
| Claude Code | `CLAUDE.md` + `.claude/rules/*.md` | Use CLAUDE.md pipeline guidance |
| Other AI tools | Read `FRAMEWORK.md` for the methodology | Adapt agent prompts as needed |

## Templates

Use the templates in `templates/` for every pipeline artifact. They enforce consistent structure so artifacts are readable by both humans and AI agents.

## Run Ledger

Create `docs/run-ledger.md` on your first pipeline run. Each run appends a new entry using the `templates/run-ledger-entry.md` format. The ledger is your audit trail — it tracks what was built, whether it passed verification, and how failures were classified.

## Principles (from the Manifesto)

This framework is grounded in eight postulates developed through structured research:

1. **Tool-grounded execution** — prefer tool actions over narrative
2. **Artifact-centered orchestration** — coordinate through files, not chat
3. **Verification before trust** — model confidence ≠ correctness
4. **Explicit role boundaries** — each agent has one job
5. **Externalize memory** — persist state in files, not context windows
6. **Classify failures by layer** — model vs orchestration vs specification
7. **Optimize for trustworthy attention** — minimize noise, maximize signal
8. **Evidence-weighted promotion** — earn trust through auditable evidence

Full details: see `FRAMEWORK.md` and the source manifesto.

