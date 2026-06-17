/** Format an ISO timestamp as "HH:mm DD/MM/YYYY" (Vietnam-style). */
export const formatReportedAt = (iso: string): string => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    const day = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    return `${time} ${day}`;
};

/** Whole days elapsed since an ISO timestamp (0 if invalid). */
export const getAgeDays = (iso: string): number => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return 0;
    return Math.floor((Date.now() - date.getTime()) / 86_400_000);
};

/** Vietnamese relative time from an ISO timestamp, e.g. "3 ngày trước". */
export const formatRelativeTime = (iso: string): string => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const minutes = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (minutes < 1) return "vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
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
