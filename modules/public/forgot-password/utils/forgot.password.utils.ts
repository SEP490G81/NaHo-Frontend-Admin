const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;

const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 16;

// Bộ ký tự đặc biệt phải khớp với regex của backend (value object Password),
// nếu nới rộng hơn thì backend sẽ trả USER_006 dù frontend báo hợp lệ.
const SPECIAL_REGEX = /[@#$%^&+=!_~-]/;

export interface PasswordRule {
    needKey: string;
    test: (value: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
    {
        needKey: "register.form.passwordNeed.minLength",
        test: (v) => v.length >= MIN_PASSWORD_LENGTH,
    },
    {
        needKey: "register.form.passwordNeed.lowercase",
        test: (v) => /[a-z]/.test(v),
    },
    {
        needKey: "register.form.passwordNeed.uppercase",
        test: (v) => /[A-Z]/.test(v),
    },
    {
        needKey: "register.form.passwordNeed.number",
        test: (v) => /\d/.test(v),
    },
    {
        needKey: "register.form.passwordNeed.special",
        test: (v) => SPECIAL_REGEX.test(v),
    },
];

export function validateEmail(value: string): string | undefined {
    const v = value.trim();
    if (v.length === 0) return "register.form.pleaseEnterEmail";
    if (!EMAIL_REGEX.test(v)) return "register.form.invalidEmail";
    return undefined;
}

export function validatePassword(value: string): string | undefined {
    if (value.length === 0) return "register.form.pleaseEnterPassword";
    if (PASSWORD_RULES.some((rule) => !rule.test(value)))
        return "register.form.passwordTooWeak";
    return undefined;
}

export function validateConfirmPassword(
    confirmPassword: string,
    password: string,
): string | undefined {
    if (confirmPassword.length === 0)
        return "register.form.pleaseConfirmPassword";
    if (confirmPassword !== password) return "register.form.passwordNotMatch";
    return undefined;
}
