// Voice-to-note interface (native variant).
//
// Honest scaffold: on-device speech-to-text needs a native module + config
// plugin and can only be verified on a real device (this sandbox has no mic,
// no dev build). Rather than fake it, we expose a stable interface and report
// it unavailable with a clear reason, so the UI degrades to manual typing.
// Per the product guardrail, any future AI note-cleanup is assist-only and
// must carry a disclaimer — it never invents observations.
export interface DictationCapability {
  available: boolean;
  reason: string;
}

export const DICTATION: DictationCapability = {
  available: false,
  reason:
    'Voice-to-note runs in the installed app (on-device speech recognition) and ' +
    'is wired up in a coming dev build. For now, type your note.',
};

export async function dictate(): Promise<string> {
  throw new Error(DICTATION.reason);
}
