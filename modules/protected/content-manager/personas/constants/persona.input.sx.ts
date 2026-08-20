/** Style dùng chung cho TextField/Select của module (bám theo token trong globals.css). */
export const personaInputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontSize: "0.85rem",
        backgroundColor: "var(--color-bgc-app)",
        color: "var(--color-text-contrast)",
        "& fieldset": { borderColor: "var(--color-bdc-primary)" },
        "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-bgc-highlight)",
        },
    },
    "& .MuiInputLabel-root": {
        color: "var(--color-text-muted)",
        fontSize: "0.85rem",
        "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
    },
    "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
};
