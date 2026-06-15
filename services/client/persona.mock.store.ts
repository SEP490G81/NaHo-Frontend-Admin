import { MOCK_PERSONAS } from "@/app/api/_mock/persona.data";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";

/**
 * Client-side mock persistence backed by localStorage.
 * TODO: replace these helpers with real API calls when BE is ready.
 */
const PERSONA_KEY = "naho_mock_personas";
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

/** Fill defaults for any field missing from older persisted records. */
const normalize = (raw: Partial<PersonaResponse>): PersonaResponse => ({
    id: raw.id ?? `p-${Date.now()}`,
    name: raw.name ?? "",
    role: raw.role ?? "",
    description: raw.description ?? "",
    jlptLevel: raw.jlptLevel ?? "N3",
    politenessStyle: raw.politenessStyle ?? "CASUAL",
    voice: raw.voice ?? "NANAMI",
    speakingRate: raw.speakingRate ?? "NORMAL",
    greeting: raw.greeting ?? "",
    personaPrompt: raw.personaPrompt ?? "",
    topicIds: raw.topicIds ?? [],
    status: raw.status ?? "ACTIVE",
    avatarPreset: raw.avatarPreset ?? "",
});

const readPersonas = (): PersonaResponse[] => {
    if (typeof window === "undefined") return clone(MOCK_PERSONAS);
    const raw = window.localStorage.getItem(PERSONA_KEY);
    if (!raw) {
        window.localStorage.setItem(PERSONA_KEY, JSON.stringify(MOCK_PERSONAS));
        return clone(MOCK_PERSONAS);
    }
    try {
        const parsed = JSON.parse(raw) as Partial<PersonaResponse>[];
        return parsed.map(normalize);
    } catch {
        return clone(MOCK_PERSONAS);
    }
};

const writePersonas = (list: PersonaResponse[]) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(PERSONA_KEY, JSON.stringify(list));
    }
};

export const storeListPersonas = (): PersonaResponse[] => readPersonas();

export const storeCreatePersona = (
    request: CreatePersonaRequest,
): PersonaResponse => {
    const persona: PersonaResponse = { id: `p-${Date.now()}`, ...request };
    writePersonas([...readPersonas(), persona]);
    return persona;
};

export const storeUpdatePersona = (
    request: UpdatePersonaRequest,
): PersonaResponse => {
    const list = readPersonas();
    const next = list.map((p) => (p.id === request.id ? { ...request } : p));
    writePersonas(next);
    return { ...request };
};

export const storeDeletePersona = (id: string): void => {
    writePersonas(readPersonas().filter((p) => p.id !== id));
};
