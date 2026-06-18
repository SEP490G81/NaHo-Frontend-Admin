import { PersonaFormState } from "../types/ai.personas.type";

export function validatePersonaForm(formData: FormData): PersonaFormState {
    const get = (key: string): string => {
        const entry = formData.get(key);
        return typeof entry === "string" ? entry : "";
    };

    const name = get("name");
    const roleStyle = get("roleStyle");
    const systemPrompt = get("systemPrompt");

    return {
        name: { value: name, error: name.trim().length === 0 },
        roleStyle: { value: roleStyle, error: roleStyle.trim().length === 0 },
        systemPrompt: {
            value: systemPrompt,
            error: systemPrompt.trim().length === 0,
        },
    };
}
