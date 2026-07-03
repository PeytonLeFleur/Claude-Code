// Single source of truth for the inspection form's choices. `satisfies` pins each
// value to the domain union at compile time, so a typo or a drifted enum fails tsc.
import type {
  QueenStatus,
  BroodStatus,
  Temperament,
  Stores,
  MiteMethod,
} from './types';

export interface Option<T> {
  value: T;
  label: string;
}

export const QUEEN_OPTIONS = [
  { value: 'queenright', label: 'Queenright' },
  { value: 'queenless', label: 'Queenless' },
  { value: 'virgin', label: 'Virgin' },
  { value: 'unknown', label: 'Unknown' },
] as const satisfies readonly Option<QueenStatus>[];

export const BROOD_OPTIONS = [
  { value: 'laying_well', label: 'Laying well' },
  { value: 'spotty', label: 'Spotty' },
  { value: 'none', label: 'None' },
  { value: 'unknown', label: 'Unknown' },
] as const satisfies readonly Option<BroodStatus>[];

export const TEMPERAMENT_OPTIONS = [
  { value: 'calm', label: 'Calm' },
  { value: 'normal', label: 'Normal' },
  { value: 'defensive', label: 'Defensive' },
  { value: 'hot', label: 'Hot' },
] as const satisfies readonly Option<Temperament>[];

export const STORES_OPTIONS = [
  { value: 'heavy', label: 'Heavy' },
  { value: 'adequate', label: 'Adequate' },
  { value: 'light', label: 'Light' },
  { value: 'empty', label: 'Empty' },
] as const satisfies readonly Option<Stores>[];

export const MITE_METHOD_OPTIONS = [
  { value: 'alcohol_wash', label: 'Alcohol wash' },
  { value: 'sugar_roll', label: 'Sugar roll' },
  { value: 'sticky_board', label: 'Sticky board' },
] as const satisfies readonly Option<MiteMethod>[];

/** Sensible "quick log" defaults — a healthy colony, one tap to save. */
export const INSPECTION_DEFAULTS = {
  queen: 'queenright',
  brood: 'laying_well',
  temperament: 'calm',
  stores: 'adequate',
} satisfies {
  queen: QueenStatus;
  brood: BroodStatus;
  temperament: Temperament;
  stores: Stores;
};
