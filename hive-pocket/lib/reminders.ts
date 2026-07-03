// Auto-generated next-action reminders. Pure and unit-tested — `now` is always
// passed in. Intervals are sensible defaults the beekeeper can act on or ignore;
// anything treatment-related carries a "confirm against local guidance" note so
// the app never issues definitive treatment advice (product guardrail).
import type { Inspection, Treatment, Task, TaskKind } from './types';
import { infestationRisk } from './mites';

export type TaskDraft = Omit<Task, 'id' | 'done'>;

/** Default gap before the next routine inspection is suggested. */
export const DEFAULT_INSPECTION_INTERVAL_DAYS = 14;

function addDays(now: Date, days: number): string {
  return new Date(now.getTime() + days * 86_400_000).toISOString();
}

/** Suggested follow-ups implied by a saved inspection. */
export function suggestTasksForInspection(insp: Inspection, now: Date): TaskDraft[] {
  const hiveId = insp.hiveId;
  const drafts: TaskDraft[] = [
    {
      hiveId,
      kind: 'inspection',
      dueAt: addDays(now, DEFAULT_INSPECTION_INTERVAL_DAYS),
      title: 'Routine inspection',
    },
  ];

  if (insp.queen === 'queenless') {
    drafts.push({
      hiveId,
      kind: 'follow_up',
      dueAt: addDays(now, 4),
      title: 'Queenless — check for queen cells / add resources',
    });
  }

  if (insp.stores === 'empty') {
    drafts.push({ hiveId, kind: 'feeding', dueAt: addDays(now, 1), title: 'Feed — out of stores' });
  } else if (insp.stores === 'light') {
    drafts.push({ hiveId, kind: 'feeding', dueAt: addDays(now, 3), title: 'Feed — light on stores' });
  }

  if (insp.miteCount) {
    const risk = infestationRisk(insp.miteCount);
    if (risk.level === 'high') {
      drafts.push({
        hiveId,
        kind: 'treatment',
        dueAt: addDays(now, 2),
        title: 'High mite load — plan treatment (confirm against local guidance)',
      });
    } else if (risk.level === 'moderate') {
      drafts.push({ hiveId, kind: 'mite_check', dueAt: addDays(now, 7), title: 'Recheck mites' });
    }
  }

  return drafts;
}

/** A treatment with a withdrawal / re-check window implies a follow-up task. */
export function suggestTasksForTreatment(t: Treatment, now: Date): TaskDraft[] {
  if (!t.followUpDays || t.followUpDays <= 0) return [];
  return [
    {
      hiveId: t.hiveId,
      kind: 'follow_up',
      dueAt: addDays(now, t.followUpDays),
      title: 'Treatment follow-up',
    },
  ];
}

/** Identity of an open reminder for dedup: same hive + kind + title. */
export function taskKey(t: { hiveId: string; kind: TaskKind; title: string }): string {
  return `${t.hiveId}|${t.kind}|${t.title}`;
}

/**
 * Drop drafts that duplicate an already-OPEN task, so repeated inspections don't
 * pile up identical reminders. Completed tasks don't suppress a fresh suggestion.
 */
export function newTaskDrafts(existing: Task[], drafts: TaskDraft[]): TaskDraft[] {
  const open = new Set(existing.filter((t) => !t.done).map(taskKey));
  const out: TaskDraft[] = [];
  const staged = new Set<string>();
  for (const d of drafts) {
    const k = taskKey(d);
    if (open.has(k) || staged.has(k)) continue;
    staged.add(k);
    out.push(d);
  }
  return out;
}
