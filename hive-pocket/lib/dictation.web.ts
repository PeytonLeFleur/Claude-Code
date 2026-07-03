// Voice-to-note interface (web variant). Browser speech recognition is
// inconsistent across browsers, so we don't promise it here — the note field
// is always typeable. Keeps the web-export smoke deterministic.
import type { DictationCapability } from './dictation';

export const DICTATION: DictationCapability = {
  available: false,
  reason: 'Voice-to-note is available in the mobile app. Type your note here.',
};

export async function dictate(): Promise<string> {
  throw new Error(DICTATION.reason);
}
