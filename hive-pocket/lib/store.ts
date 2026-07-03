// Offline-first data store. Guardrail #1: every write lands locally immediately.
// Zustand + persist(AsyncStorage) means the whole dataset survives app restarts
// with no network. Cloud backup (a later loop iteration) syncs on top of this,
// never in front of it.
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  Apiary,
  Hive,
  Inspection,
  Task,
  Treatment,
  HiveData,
} from './types';

// Monotonic-ish id without pulling a uuid native dep. Fine for local records;
// server-authoritative ids arrive with cloud sync.
let counter = 0;
export function localId(prefix = 'id'): string {
  counter += 1;
  return `${prefix}_${counter.toString(36)}${Math.floor(performance.now?.() ?? 0).toString(36)}`;
}

export interface HiveState extends HiveData {
  addApiary: (name: string, notes?: string) => Apiary;
  addHive: (apiaryId: string, name: string, installedAt?: string) => Hive;
  addInspection: (insp: Omit<Inspection, 'id'>) => Inspection;
  addTreatment: (t: Omit<Treatment, 'id'>) => Treatment;
  addTask: (t: Omit<Task, 'id' | 'done'>) => Task;
  toggleTask: (id: string) => void;
  /** Bulk-create hives from parsed CSV rows, reusing apiaries by name. */
  importHives: (rows: { apiary: string; hive: string; installedAt?: string }[]) => number;
  /** Full snapshot for export / backup. */
  snapshot: () => HiveData;
  /** Replace everything (e.g. after a restore). */
  hydrate: (data: HiveData) => void;
}

const EMPTY: HiveData = {
  apiaries: [],
  hives: [],
  inspections: [],
  treatments: [],
  tasks: [],
};

export const useHiveStore = create<HiveState>()(
  persist(
    (set, get) => ({
      ...EMPTY,

      addApiary: (name, notes) => {
        const apiary: Apiary = {
          id: localId('ap'),
          name,
          notes,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ apiaries: [...s.apiaries, apiary] }));
        return apiary;
      },

      addHive: (apiaryId, name, installedAt) => {
        const hive: Hive = {
          id: localId('hv'),
          apiaryId,
          name,
          installedAt,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ hives: [...s.hives, hive] }));
        return hive;
      },

      addInspection: (insp) => {
        const full: Inspection = { ...insp, id: localId('in') };
        set((s) => ({ inspections: [...s.inspections, full] }));
        return full;
      },

      addTreatment: (t) => {
        const full: Treatment = { ...t, id: localId('tr') };
        set((s) => ({ treatments: [...s.treatments, full] }));
        return full;
      },

      addTask: (t) => {
        const full: Task = { ...t, id: localId('tk'), done: false };
        set((s) => ({ tasks: [...s.tasks, full] }));
        return full;
      },

      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),

      importHives: (rows) => {
        // Reuse apiaries by (case-insensitive) name, including ones created
        // earlier in the same batch. set() is synchronous, so get() sees them.
        const nameToId = new Map(
          get().apiaries.map((a) => [a.name.toLowerCase(), a.id]),
        );
        let count = 0;
        for (const row of rows) {
          const key = row.apiary.toLowerCase();
          let apiaryId = nameToId.get(key);
          if (!apiaryId) {
            apiaryId = get().addApiary(row.apiary).id;
            nameToId.set(key, apiaryId);
          }
          get().addHive(apiaryId, row.hive, row.installedAt);
          count += 1;
        }
        return count;
      },

      snapshot: () => {
        const { apiaries, hives, inspections, treatments, tasks } = get();
        return { apiaries, hives, inspections, treatments, tasks };
      },

      hydrate: (data) => set({ ...data }),
    }),
    {
      name: 'hivepocket-data-v1',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
