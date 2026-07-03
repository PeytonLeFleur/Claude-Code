// HivePocket domain model. Pure types — no react-native imports, so this file
// (and the logic modules that depend only on it) is unit-testable under ts-jest.

/** A yard / location holding one or more hives. */
export interface Apiary {
  id: string;
  name: string;
  notes?: string;
  createdAt: string; // ISO
}

export type QueenStatus = 'queenright' | 'queenless' | 'virgin' | 'unknown';
export type BroodStatus = 'laying_well' | 'spotty' | 'none' | 'unknown';
export type Temperament = 'calm' | 'normal' | 'defensive' | 'hot';
export type Stores = 'heavy' | 'adequate' | 'light' | 'empty' | 'unknown';

/** A single colony. */
export interface Hive {
  id: string;
  apiaryId: string;
  name: string;
  installedAt?: string; // ISO — package/nuc install or swarm capture date
  notes?: string;
  createdAt: string; // ISO
}

/** One field inspection of a hive. Saved locally first, synced later. */
export interface Inspection {
  id: string;
  hiveId: string;
  date: string; // ISO
  queen: QueenStatus;
  brood: BroodStatus;
  temperament: Temperament;
  stores: Stores;
  /** Free text — may originate from dictated voice-to-note. */
  note?: string;
  /** Local URIs of attached photos. */
  photos?: string[];
  /** Optional mite count captured during this inspection. */
  miteCount?: MiteCount;
}

export type MiteMethod = 'alcohol_wash' | 'sugar_roll' | 'sticky_board';

/** A varroa mite count sample. */
export interface MiteCount {
  method: MiteMethod;
  /** Mites found in the sample. */
  mites: number;
  /** Bees in the sample (for wash/roll). Ignored for sticky_board. */
  bees?: number;
  /** For sticky_board: number of days the board was in. */
  days?: number;
  date: string; // ISO
}

export type TreatmentType =
  | 'oxalic_acid'
  | 'formic_acid'
  | 'thymol'
  | 'amitraz'
  | 'other';

/** A treatment or feeding applied to a hive, with follow-up windows. */
export interface Treatment {
  id: string;
  hiveId: string;
  type: TreatmentType;
  appliedAt: string; // ISO
  /** Withdrawal / re-check window in days, if any. */
  followUpDays?: number;
  note?: string;
}

export type TaskKind =
  | 'inspection'
  | 'mite_check'
  | 'treatment'
  | 'feeding'
  | 'follow_up'
  | 'other';

/** A next-action reminder tied to a hive. */
export interface Task {
  id: string;
  hiveId: string;
  kind: TaskKind;
  dueAt: string; // ISO
  title: string;
  done: boolean;
}

/** The whole offline dataset — what gets persisted locally and exported. */
export interface HiveData {
  apiaries: Apiary[];
  hives: Hive[];
  inspections: Inspection[];
  treatments: Treatment[];
  tasks: Task[];
}
