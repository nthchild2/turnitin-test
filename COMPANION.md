# How This Framework Was Built

This document explains the thinking, research, and methodology behind the Agentic Software Development Framework included in this project. It's meant to be read alongside the framework itself.

## The Problem

AI-assisted coding today is mostly unstructured. You open a chat, describe what you want, and hope the output is good. Sometimes it is. Often it isn't. There's no spec, no plan, no verification, and no record of what happened. This is "vibe coding" — outcomes are random and unrepeatable.

The question we started with: **can we make AI-assisted development predictable and verifiable without making it slow or rigid?**

## The Approach

We didn't start by building tools. We started by building understanding.

The entire process was modeled as a **learning loop** — essentially knowledge refinement. Sources capture observations, questions capture uncertainty, postulates capture consolidated guidance, and validation updates confidence. Each cycle sharpens what we know.

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
- What agents are actually good and bad at
- Which operating parameters matter most
- Multi-agent coordination patterns
- Verification and trust boundaries
- Audit trails and externalized memory

Five **provisional hypotheses** were validated through the research:
1. Most gains come from better decomposition, retrieval, tool use, and verification — not from more free-form conversation.
2. Multi-agent systems help most when roles, boundaries, and handoffs are explicit.
3. Objective external checks are more valuable than agent self-confidence.
4. Agent orchestration should be designed around artifacts and checkpoints, not personalities.

### Phase 2: The Manifesto

The research produced **5 descriptive observations** about how agents actually behave:

1. Non-determinism is persistent — confidence language is not a reliable accuracy signal.
2. Tool mediation increases reliability.
3. Operational limits (context, cost, latency, tool interfaces) dominate design.
4. Multi-agent systems are conditional gains — unclear roles add coordination noise.
5. High-stakes tasks require external feedback, not self-reported certainty.

And **6 normative postulates** about how to orchestrate them effectively:

| # | Postulate | What It Means |
|---|-----------|---------------|
| P1 | Tool-grounded execution | Agents should use tools and produce artifacts, not just write text |
| P2 | Artifact-centered orchestration | Coordinate through files and documents, not chat messages |
| P3 | Verification before trust | Model confidence is not evidence — run actual checks |
| P4 | Explicit role boundaries | Each agent gets one job with clear inputs and outputs |
| P5 | Externalize memory and audit trails | Persist everything in files; context windows are temporary |
| P6 | Classify failures by layer | Label failures as model, orchestration, or specification problems |

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

| Agent | Job | Key Rule |
|-------|-----|----------|
| Specifier | Turn a request into a structured spec | No implementation details — define WHAT, not HOW |
| Researcher | Investigate the codebase before planning | Read only — no production code |
| Planner | Break the spec into ordered steps | Concrete steps with file paths — no code |
| Executor | Implement steps one at a time | Follow the plan — do not improvise |
| Verifier | Check results and write the run ledger | Report problems — do not fix them |

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

## Feedback Loop

After using this framework on a real project, bring back:
- Which phases worked and which felt like overhead.
- Which agent roles were useful and which were redundant.
- Whether the run ledger format was actually usable.
- New questions or postulate revisions based on real outcomes.

That feedback becomes input to the next manifesto cycle — the same learning loop that built the framework in the first place.