/**
 * BE có thể trả nguyên văn lỗi SQL (vd vi phạm khoá ngoại, trùng khoá) trong
 * `detail`. Đổi các lỗi đã biết thành hậu tố key i18n trong
 * `personaManagement.form.errors`, còn lại trả null để hiển thị nguyên văn.
 */
export function matchPersonaApiError(message: string): string | null {
    const lower = message.toLowerCase();

    if (lower.includes("fk_personas_on_avatar_file")) {
        return "avatarFileNotFound";
    }
    if (lower.includes("duplicate entry") || lower.includes("uk_personas")) {
        return "nameDuplicated";
    }
    if (
        lower.includes("could not execute statement") ||
        lower.includes("constraint")
    ) {
        return "saveConflict";
    }

    return null;
}
