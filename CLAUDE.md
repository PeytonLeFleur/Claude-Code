# Repo rules — model routing & change safeguards

These rules live in the repo, not in anyone's memory. Every session loads them.
They govern how work is routed across models and how changes reach production.

## 1. Work auto-routes to the right model (silent, automatic)

| Lane | Model | Does |
|------|-------|------|
| DOWN | **Haiku 4.5** | reads, greps, scans, lookups |
| DOWN | **Sonnet 5** | routine building — ordinary coding |
| SEAT | **Opus 4.8** | the seat — plans, judges, reviews |
| UP | **Fable 5** | top-tier — **always asks first** |

Routing is automatic and silent. The only two moments that ever interrupt a human:

1. **"Use the expensive model?"** (before going UP to Fable)
2. **"Ship to production?"** (before a production change lands)

Nothing else should stop to ask.

## 2. Top-tier (Fable 5) = design, danger, or money only

Fable is reserved for: **architecture · production debugging · security review · migrations.**

Never routine coding. Target **~20% of total work, maximum**. If a task is ordinary
feature work, it does not go to Fable — it stays in the Sonnet lane.

## 3. Every production change is guarded

```
branch → PR → automated check → merge → deploy → verify
```

The AI **never merges itself.** It shows a plain-English summary derived from the actual
code diff and waits for an explicit **"go"** before anything merges or ships.

## 4. Outage fallback

If a model is down or unavailable, it **drops exactly one tier** and says so:

```
Fable → Opus → Sonnet → Haiku
```

But for anything **risky** (design, danger, money — the Fable-class work), it does **not**
silently substitute. It **stops and asks** before running the work on a lower tier.

---

### Note for this environment

Claude Code here runs as a single configured model per session; it cannot literally
hot-swap the main loop between Haiku/Sonnet/Opus/Fable mid-turn. Where genuine
multi-model routing is needed, it is expressed by delegating a unit of work to a subagent
with an explicit model override (the Agent/Workflow tools accept `model: haiku|sonnet|opus|fable`).
Fable is **never** invoked without first asking — per rule 1.
