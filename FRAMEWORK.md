# Agentic Software Development Framework

This document defines a pipeline, agent roles, tools, and a run ledger format.

The goal is predictable quality — not perfection on every run, but consistently good outcomes
that are verifiable and auditable. This is the opposite of "vibe coding" where outcomes
are random and unaccountable.

## The Pipeline

Every unit of work flows through five phases in order.
Each phase produces an artifact. The artifact is the handoff contract to the next phase.

```
spec → research → plan → execution → verification
```

### 1. Spec

Turn a human request into an unambiguous, scoped specification.

- Input: human intent (feature request, bug report, refactor goal, or open-ended ask).
- Output: a spec artifact.
- Why this phase exists: most quality failures trace back to unclear intent.
  If the spec is vague, everything downstream is a guess.

A spec artifact contains:
- Summary: one paragraph of what needs to happen.
- Acceptance criteria: concrete conditions that define "done."
- Constraints: what must not change, what is out of scope.
- Type: `feature | bugfix | refactor | exploration`.

The spec does not prescribe implementation. It defines the target.

### 2. Research

Investigate the existing codebase, dependencies, conventions, and constraints
before committing to a plan.

- Input: spec artifact.
- Output: a research brief.
- Why this phase exists: we are rarely starting from scratch.
  Skipping research leads to plans that ignore existing patterns,
  break conventions, or duplicate work.

A research brief contains:
- Relevant files and modules discovered.
- Existing patterns and conventions observed.
- Dependencies and constraints that affect the plan.
- Open questions or ambiguities surfaced during research.

The research phase reads; it does not write production code.

### 3. Plan

Break the spec into ordered, concrete implementation steps.

- Input: spec artifact + research brief.
- Output: a plan artifact.
- Why this phase exists: without a plan, an agent will attempt everything at once,
  lose focus partway through, or make contradictory changes.

A plan artifact contains:
- Ordered list of steps, each with a clear description of what changes.
- Expected outcome per step.
- Dependencies between steps (if any).

The plan does not contain code. It describes what to change and in what order.

### 4. Execution

Implement the plan step by step.

- Input: plan artifact (plus spec and research brief for reference).
- Output: code changes.
- Why this phase exists: this is where the actual work happens.
  The executor follows the plan; it does not re-plan or re-scope.

Execution rules:
- Follow the plan in order.
- If a step is blocked or unclear, stop and surface the issue — do not improvise.
- Produce working, minimal changes per step.

### 5. Verification

Check that the execution meets the spec and record what happened.

- Input: spec artifact + code changes.
- Output: verification result + run ledger entry.
- Why this phase exists: model confidence is not evidence of correctness (P3).
  Heuristic checks catch the most common failure modes without over-engineering.

Verification is heuristic, not exhaustive. The goal is to catch the things
that matter most, not to verify every line. What "verification" means is tunable
per project — it could be running tests, type checking, linting, building,
or simply reviewing the diff against the spec's acceptance criteria.

Default verification checklist (tune per project):
- Does the output satisfy the spec's acceptance criteria?
- Does the project still build / pass existing tests?
- Were any files changed that were out of scope?
- Are there obvious regressions?

## Agent Roles

The pipeline maps to agent roles. Each role has a single responsibility,
a defined input, and a defined output artifact. This follows P4 (explicit role boundaries).

| Role | Responsibility | Input | Output |
| --- | --- | --- | --- |
| Specifier | Translate human intent into a structured spec | Human request | Spec artifact |
| Researcher | Investigate codebase context relevant to the spec | Spec artifact | Research brief |
| Planner | Break the spec into ordered implementation steps | Spec + research brief | Plan artifact |
| Executor | Implement the plan step by step | Plan + spec + research brief | Code changes |
| Verifier | Check execution against spec; write run ledger | Spec + code changes | Verification result + run ledger entry |

An orchestrator coordinates these roles in sequence. The orchestrator is not
a separate "thinker" — it is the pipeline itself. It passes artifacts between
roles and stops the pipeline if a phase fails or surfaces a blocker.

The orchestrator does not make implementation decisions.
It manages flow, not judgment.

### Role boundaries

- The Specifier does not plan or research.
- The Researcher does not write production code.
- The Planner does not execute.
- The Executor does not re-scope or skip steps.
- The Verifier does not fix issues — it reports them.

If verification fails, the pipeline loops back to the appropriate phase
(usually Planner or Executor) with the failure report as new input.

### Why these tools and not others

- There is no "creativity agent" or "brainstorming agent" — those are human activities.
- There is no "risk checker" — humans own risk decisions before the pipeline runs.
- There is no "chat agent" — the pipeline is artifact-to-artifact, not conversational.

## Run Ledger Format

The run ledger is the audit trail for every pipeline run.
It must be readable by humans and parseable by agents.

Each run produces one ledger entry. Format:

```markdown
## Run: <short title>

- ID: <unique run identifier>
- Date: <timestamp>
- Type: feature | bugfix | refactor | exploration
- Status: pass | fail | partial

### Spec Summary
<one paragraph from the spec artifact>

### Acceptance Criteria
- [ ] <criterion 1>
- [ ] <criterion 2>

### Research Findings
<key findings from research brief, 3-5 bullets max>

### Plan Summary
<ordered step list from plan artifact>

### Execution Notes
<what was actually done, any deviations from plan>

### Verification Result
- Checks run: <list of checks>
- Result: pass | fail | partial
- Failure classification (if applicable): model | orchestration | specification
- Notes: <what failed and why>

### Cost / Performance
- Phases completed: <which phases ran>
- Approximate token usage: <if tracked>
- Duration: <if tracked>
```

### Why this format

- Markdown is human-readable and agent-parseable.
- Acceptance criteria use checkboxes so verification can mark them.
- Failure classification uses the P6 taxonomy so patterns are trackable across runs.
- Cost/performance fields are optional — they exist for tuning, not gatekeeping.
- The format is flat and simple. No nested structures, no schemas to maintain.

## The Methodology

### Before a run

1. Human writes or describes what they want.
2. Human decides the quality bar for this run (what verification means).
3. Human decides if research is needed (skip for trivial changes).