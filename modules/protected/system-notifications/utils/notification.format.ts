/** Format an ISO timestamp as "HH:mm DD/MM/YYYY" (Vietnam-style). */
export const formatSentAt = (iso: string): string => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    const day = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    return `${time} ${day}`;
};

/** Compact recipient count, e.g. 1284 → "1.284". */
export const formatRecipientCount = (count: number): string =>
    count.toLocaleString("vi-VN");
