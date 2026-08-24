import {
    PERSONA_NAME_MAX_LENGTH,
    PERSONA_PROMPT_MAX_LENGTH,
} from "../constants/persona.constants";
import {
    PersonaFormErrors,
    PersonaFormValues,
} from "../types/persona.form.type";

/**
 * Kiểm tra dữ liệu form nhân vật. Trả về map field -> hậu tố key i18n trong
 * `personaManagement.form.errors` để component tự dịch.
 *
 * @param takenNames tên các nhân vật khác (đã lowercase) - BE ràng buộc unique.
 */
export function validatePersonaForm(
    values: PersonaFormValues,
    takenNames: string[],
): PersonaFormErrors {
    const errors: PersonaFormErrors = {};

    const name = values.name.trim();
    if (!name) {
        errors.name = "nameRequired";
    } else if (name.length > PERSONA_NAME_MAX_LENGTH) {
        errors.name = "nameTooLong";
    } else if (takenNames.includes(name.toLowerCase())) {
        errors.name = "nameDuplicated";
    }

    const prompt = values.prompt.trim();
    if (!prompt) {
        errors.prompt = "promptRequired";
    } else if (prompt.length > PERSONA_PROMPT_MAX_LENGTH) {
        errors.prompt = "promptTooLong";
    }

    return errors;
}
