import { CreateTopicState } from "../types/topic.create.ui.type";

export function validateCreateTopicForm(formData: FormData): CreateTopicState {
    const nameEntry = formData.get("name");
    const descriptionEntry = formData.get("description");

    const name = typeof nameEntry === "string" ? nameEntry : "";
    const description =
        typeof descriptionEntry === "string" ? descriptionEntry : "";

    const result: CreateTopicState = {
        name: { value: name, error: false },
        description: { value: description, error: false },
    };

    if (name.trim().length === 0) {
        result.name.error = true;
    }
    if (description.trim().length === 0) {
        result.description.error = true;
    }

    return result;
}
