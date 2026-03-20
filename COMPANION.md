# How This Framework Was Built

This document explains the thinking, research, and methodology behind the Agentic Software Development Framework included in this project. It's meant to be read alongside the framework itself.

## The Problem

AI-assisted coding today is mostly unstructured. You open a chat, describe what you want, and hope the output is good. Sometimes it is. Often it isn't. There's no spec, no plan, no verification, and no record of what happened. This is "vibe coding" — outcomes are random and unrepeatable.

The question we started with: **can we make AI-assisted development predictable and verifiable without making it slow or rigid?**

## The Approach

We didn't start by building tools. We started by building understanding.

The entire process was modeled as a **learning loop** — essentially knowledge refinement. Sources capture observations, questions capture uncertainty, postulates capture consolidated guidance, and validation updates confidence. Each cycle sharpens what we know.

### The Research Methodology

We built a cyclic input-output system:

```
sources → questions → postulates → manifesto → validation → feedback
         ↑                                                    |
         └────────────────────────────────────────────────────┘
```

**Artifacts flow in a strict order** to preserve traceability:

1. `research/sources.md` — intake new primary sources, extract evidence, assign `S##` source IDs and `E##` evidence rows linked to questions (`Q#`) and postulates (`P#`).
2. `research/questions.md` — update question statuses (`answered | partial | unresolved | new`), add new questions, record cycle deltas.
3. `MANIFESTO.md` — promote or revise postulates with explicit status labels (`candidate → provisional → accepted`, or `rejected`).
4. `research/cycles/cycle-XX.md` — record what happened: inputs, outputs, deltas, validation results, failure classifications, and the queue for the next cycle.

Each cycle has a **minimum completion bar**:
- At least 2 new or updated evidence entries.
- At least 1 question status change.
- At least 1 postulate status check (promote, hold, or demote with a stated reason).
- A completed cycle run record.

Two full cycles were completed before building the framework.

### Phase 1: Domain-Agnostic Research

We studied agentic AI orchestration as a general topic — not specific to software. The goal was to identify principles that hold regardless of the domain.

**Sources studied** (22 sources across 18 evidence rows):
- OpenAI, Anthropic, and Google model documentation and prompting guides
- AutoGen and CrewAI multi-agent framework documentation
- Academic survey papers on LLM-based agents
- NIST AI Risk Management Framework (AI 100-1)
- OECD AI Principles
- HELM benchmark methodology from Stanford CRFM
- ReAct, Reflexion, and CRITIC papers on reasoning and self-correction

**23 research questions** were tracked across cycles, covering:
- What agents are actually good and bad at (Q1–Q2)
- Which operating parameters matter most (Q3)
- Multi-agent coordination patterns (Q4–Q5, Q17)
- Verification and trust boundaries (Q6, Q11–Q13)
- Audit trails and externalized memory (Q10, Q15–Q16)
- Promotion criteria and methodology rigor (Q19–Q23)

Five **provisional hypotheses** were validated through the research:
1. Most gains come from better decomposition, retrieval, tool use, and verification — not from more free-form conversation.
2. Multi-agent systems help most when roles, boundaries, and handoffs are explicit.
3. Objective external checks are more valuable than agent self-confidence.
4. The scarcest resource is not tokens but trustworthy attention.
5. Agent orchestration should be designed around artifacts and checkpoints, not personalities.

### Phase 2: The Manifesto (v0.2)

The research produced **5 descriptive observations** about how agents actually behave:

1. Non-determinism is persistent — confidence language is not a reliable accuracy signal.
2. Tool mediation increases reliability.
3. Operational limits (context, cost, latency, tool interfaces) dominate design.
4. Multi-agent systems are conditional gains — unclear roles add coordination noise.
5. High-stakes tasks require external feedback, not self-reported certainty.

And **8 normative postulates** about how to orchestrate them effectively:

| # | Postulate | Status | What It Means |
|---|-----------|--------|---------------|
| P1 | Tool-grounded execution | Accepted | Agents should use tools and produce artifacts, not just write text |
| P2 | Artifact-centered orchestration | Accepted | Coordinate through files and documents, not chat messages |
| P3 | Verification before trust | Accepted | Model confidence is not evidence — run actual checks |
| P4 | Explicit role boundaries | Accepted | Each agent gets one job with clear inputs and outputs |
| P5 | Externalize memory and audit trails | Accepted | Persist everything in files; context windows are temporary |
| P6 | Classify failures by layer | Provisional | Label failures as model, orchestration, or specification problems |
| P7 | Optimize for trustworthy attention | Provisional | Minimize noise, maximize the signal an agent acts on |
| P8 | Evidence-weighted promotion | Provisional | Earn trust through auditable, reproducible evidence |

**Accepted** means sufficient evidence for active use. **Provisional** means useful but still under validation — P6 and P7 are on hold pending controlled experiments, P8 was added in Cycle 02 and needs rubric testing.

Postulates follow a strict lifecycle: `candidate → provisional → accepted` (or `rejected`). Promotion requires explicit evidence quality, reproducibility, and scope-fit checks. No postulate jumps from candidate to accepted in a single step without documented validation.

These postulates are domain-agnostic. They describe how AI agents work well in general, not just in coding.

### Phase 3: Software Engineering Application

We then asked: **what does this look like in practice for software development?**

The postulates mapped directly to a development pipeline:

```
spec → research → plan → execution → verification
```

Each phase has:
- A single responsible agent role
- A defined input and output artifact
- A template for consistency
- Grounding in specific postulates

The result is this framework — a set of files you can drop into any project to get structured, verifiable AI-assisted development.

## What's in the Framework

### Agent Roles (5)

| Agent | Job | Key Rule | Grounded in |
|-------|-----|----------|-------------|
| Specifier | Turn a request into a structured spec | No implementation details — define WHAT, not HOW | P2, P7 |
| Researcher | Investigate the codebase before planning | Read only — no production code | P1, P5 |
| Planner | Break the spec into ordered steps | Concrete steps with file paths — no code | P2, P4, P7 |
| Executor | Implement steps one at a time | Follow the plan — do not improvise | P1, P4 |
| Verifier | Check results and write the run ledger | Report problems — do not fix them | P3, P5, P6 |

### Instruction Files

The framework includes configuration files for:
- **GitHub Copilot**: `.github/copilot-instructions.md` (repo-wide) + `.github/agents/*.md` (custom agents invoked with `@name`)
- **Claude Code**: `CLAUDE.md` (project-wide) + `.claude/rules/*.md` (path-specific rules)
- **Any other tool**: Read `FRAMEWORK.md` for the methodology and adapt

### Templates (4)

Standardized formats for every pipeline artifact:
- `templates/spec.md` — specification artifact
- `templates/research-brief.md` — research brief
- `templates/plan.md` — implementation plan
- `templates/run-ledger-entry.md` — audit trail entry

### Run Ledger

An append-only log (`docs/run-ledger.md`) that records every pipeline run — what was built, whether it passed, and how failures were classified (`model | orchestration | specification`). This is the audit trail that makes outcomes traceable and patterns visible over time.

## How It's Different from Vibe Coding

| | Vibe Coding | This Framework |
|---|---|---|
| **Spec** | None — "just make it work" | Explicit spec with acceptance criteria |
| **Research** | None — agent guesses | Research phase reads the codebase first |
| **Plan** | None — agent does everything at once | Ordered steps with bounded scope |
| **Verification** | "Looks good to me" | Heuristic checks against the spec |
| **Record** | Context dies with the chat | Run ledger preserves outcomes |
| **Quality** | Random — sometimes great, sometimes broken | Predictable through structure |
| **Learning** | Same mistakes repeated | Failure patterns visible in the ledger |

## How to Use It

1. Copy the framework folder contents into your project root.
2. The instruction files (`.github/copilot-instructions.md`, `CLAUDE.md`) are picked up automatically by Copilot and Claude.
3. For structured work, invoke the agents by name: `@specifier`, `@researcher`, `@planner`, `@executor`, `@verifier`.
4. For quick tasks, the repo-wide instructions guide the AI to follow the pipeline principles even without explicit agent invocation.
5. After each run, the verifier writes a ledger entry. Review the ledger periodically to spot patterns.

## What This Is Not

- **Not a platform.** It's files. Drop them in, start using them.
- **Not prescriptive.** Skip research for trivial fixes. Adjust the verification checklist per project. The tools are tunable knobs, not rigid gates.
- **Not exhaustive.** Verification is heuristic — it catches the things that matter most, not every possible issue.
- **Not perfect.** This is v1. The framework is designed to improve through feedback — the run ledger exists specifically to capture what works and what doesn't.

## Feedback Loop

After using this framework on a real project, bring back:
- Which phases worked and which felt like overhead.
- Which agent roles were useful and which were redundant.
- Whether the run ledger format was actually usable.
- New questions or postulate revisions based on real outcomes.

That feedback becomes input to the next manifesto cycle — the same learning loop that built the framework in the first place.

## Origin

This framework was developed in the [agent-engineering](https://github.com/nthchild1/agent-engineering) repository as part of an ongoing effort to formalize agentic AI orchestration methodology. The full manifesto, 22 research sources, 23 tracked questions, and 2 completed cycle records are all available there for traceability.
