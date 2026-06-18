import {
    ModerationStatus,
    RejectionCategory,
} from "@/types/enums/moderation.enum";
import { ModerationFilters } from "../types/prompt.moderation.type";

export const DEFAULT_FILTERS: ModerationFilters = {
    search: "",
    status: "all",
};

/** Các trạng thái hiển thị trong dropdown lọc + badge. */
export const MODERATION_STATUSES: ModerationStatus[] = [
    "PENDING",
    "APPROVED",
    "REJECTED",
];

/** Nhóm lý do từ chối hiển thị trong dialog. */
export const REJECTION_CATEGORIES: RejectionCategory[] = [
    "OFF_TOPIC",
    "DUPLICATE",
    "LOW_QUALITY",
    "INAPPROPRIATE",
    "OTHER",
];

/** Hậu tố key i18n theo trạng thái (dưới promptModeration.status). */
export const STATUS_KEY: Record<
    ModerationStatus,
    "pending" | "approved" | "rejected"
> = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
};

/** Màu chữ số đếm trên thẻ thống kê, theo trạng thái. */
export const STAT_CARD_ACCENT: Record<ModerationStatus, string> = {
    PENDING: "text-amber-500",
    APPROVED: "text-emerald-500",
    REJECTED: "text-rose-500",
};
