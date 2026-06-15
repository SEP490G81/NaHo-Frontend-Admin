/** Format an ISO timestamp as "HH:mm DD/MM/YYYY" (Vietnam-style). */
export const formatReportedAt = (iso: string): string => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    const day = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    return `${time} ${day}`;
};

/** First + last word initials of a name, e.g. "Nguyễn Minh Tuấn" → "NT". */
export const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "?";
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    const first = words[0].charAt(0);
    const last = words[words.length - 1].charAt(0);
    return `${first}${last}`.toUpperCase();
};
