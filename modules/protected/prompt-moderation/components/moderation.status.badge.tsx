import { useTranslations } from "next-intl";
import { ModerationStatus } from "@/types/enums/moderation.enum";

interface ModerationStatusBadgeProps {
    status: ModerationStatus;
}

const STYLES: Record<ModerationStatus, string> = {
    PENDING: "bg-amber-500/15 text-amber-500",
    APPROVED: "bg-emerald-500/15 text-emerald-500",
    REJECTED: "bg-rose-500/15 text-rose-500",
};

const KEY: Record<ModerationStatus, "pending" | "approved" | "rejected"> = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
};

const ModerationStatusBadge = ({ status }: ModerationStatusBadgeProps) => {
    const t = useTranslations("promptModeration.status");

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${STYLES[status]}`}
        >
            {t(KEY[status])}
        </span>
    );
};

export default ModerationStatusBadge;
