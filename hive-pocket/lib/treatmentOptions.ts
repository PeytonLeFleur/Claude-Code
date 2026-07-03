// Treatment type choices for the treatment log. Values are pinned to the domain
// union via `satisfies`. Withdrawal/follow-up windows are intentionally NOT
// hard-coded here — they vary by product, dose, and local regulation, so the app
// asks the beekeeper rather than inventing a number (product guardrail).
import type { Option } from './inspectionOptions';
import type { TreatmentType } from './types';

export const TREATMENT_OPTIONS = [
  { value: 'oxalic_acid', label: 'Oxalic acid' },
  { value: 'formic_acid', label: 'Formic acid' },
  { value: 'thymol', label: 'Thymol' },
  { value: 'amitraz', label: 'Amitraz' },
  { value: 'other', label: 'Other' },
] as const satisfies readonly Option<TreatmentType>[];
