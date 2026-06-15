import { ReportStatus, ReportType } from "@/types/enums/report.enum";
import { ReportFilters } from "../types/user.reports.type";

export const REPORT_TYPES: ReportType[] = [
    "STT_RECORDING",
    "KEIGO_TRANSLATION",
    "API_CONNECTION",
    "OTHER",
];

export const REPORT_STATUSES: ReportStatus[] = [
    "PENDING",
    "IN_PROGRESS",
    "RESOLVED",
];

export const DEFAULT_FILTERS: ReportFilters = {
    search: "",
    type: "ALL",
    status: "ALL",
};

/** Tailwind classes for the error-type chip, keyed by type */
export const REPORT_TYPE_STYLE: Record<ReportType, string> = {
    STT_RECORDING: "bg-indigo-100 text-indigo-700",
    KEIGO_TRANSLATION: "bg-violet-100 text-violet-700",
    API_CONNECTION: "bg-cyan-100 text-cyan-700",
    OTHER: "bg-slate-100 text-slate-600",
};

/** Tailwind classes for the status chip, keyed by status */
export const REPORT_STATUS_STYLE: Record<ReportStatus, string> = {
    PENDING: "bg-slate-100 text-slate-600",
    IN_PROGRESS: "bg-amber-100 text-amber-700",
    RESOLVED: "bg-emerald-100 text-emerald-700",
};

/** i18n key suffix per type (under userReports.type) */
export const TYPE_KEY: Record<
    ReportType,
    "sttRecording" | "keigoTranslation" | "apiConnection" | "other"
> = {
    STT_RECORDING: "sttRecording",
    KEIGO_TRANSLATION: "keigoTranslation",
    API_CONNECTION: "apiConnection",
    OTHER: "other",
};

/** i18n key suffix per status (under userReports.status) */
export const STATUS_KEY: Record<
    ReportStatus,
    "pending" | "inProgress" | "resolved"
> = {
    PENDING: "pending",
    IN_PROGRESS: "inProgress",
    RESOLVED: "resolved",
};

/** Sort weight per status so unresolved reports surface first */
export const STATUS_ORDER: Record<ReportStatus, number> = {
    PENDING: 0,
    IN_PROGRESS: 1,
    RESOLVED: 2,
};

/** Accent (count text) color for the triage stat cards, keyed by status */
export const STAT_CARD_ACCENT: Record<ReportStatus, string> = {
    PENDING: "text-slate-600",
    IN_PROGRESS: "text-amber-600",
    RESOLVED: "text-emerald-600",
};
