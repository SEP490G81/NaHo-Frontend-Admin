"use client";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
    ModerationStatus,
    RejectionCategory,
} from "@/types/enums/moderation.enum";
import { formatReviewedAt } from "../../utils/moderation.format";

interface ModerationActionPanelProps {
    status: ModerationStatus;
    reviewedAt: string;
    rejectionCategory: RejectionCategory | "";
    rejectionReason: string;
    canApprove: boolean;
    isDirty: boolean;
    isSaving: boolean;
    isModerating: boolean;
    onSave: () => void;
    onApprove: () => void;
    onReject: () => void;
}

const ModerationActionPanel = ({
    status,
    reviewedAt,
    rejectionCategory,
    rejectionReason,
    canApprove,
    isDirty,
    isSaving,
    isModerating,
    onSave,
    onApprove,
    onReject,
}: ModerationActionPanelProps) => {
    const t = useTranslations("promptModeration.detail.actions");
    const tCat = useTranslations("promptModeration.rejectionCategory");
    const busy = isSaving || isModerating;

    return (
        <div className="bg-bgc-app space-y-3 rounded-xl p-6">
            <h3 className="text-text-muted text-xs font-semibold tracking-wider">
                {t("title")}
            </h3>

            <div className="space-y-2">
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CheckCircleOutlineIcon />}
                    disabled={busy || !canApprove}
                    onClick={onApprove}
                    sx={{
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("approve")}
                </Button>
                {!canApprove && (
                    <p className="text-text-muted text-xs">
                        {t("approveHint")}
                    </p>
                )}
            </div>

            <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<CancelOutlinedIcon />}
                disabled={busy}
                onClick={onReject}
            >
                {t("reject")}
            </Button>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<SaveOutlinedIcon />}
                disabled={busy || !isDirty}
                onClick={onSave}
                sx={{
                    color: "text.primary",
                    borderColor: "var(--color-bdc-muted)",
                }}
            >
                {isDirty ? t("save") : t("saveClean")}
            </Button>

            {reviewedAt && (
                <p className="text-text-muted pt-1 text-xs">
                    {t("reviewedAt", { at: formatReviewedAt(reviewedAt) })}
                </p>
            )}

            {status === "REJECTED" && (rejectionCategory || rejectionReason) && (
                <div className="border-bgc-error/40 bg-bgc-error/10 mt-2 rounded-lg border p-3">
                    <p className="text-bgc-error text-xs font-semibold">
                        {t("rejectedReasonTitle")}
                    </p>
                    {rejectionCategory && (
                        <p className="mt-1 text-sm font-medium">
                            {tCat(rejectionCategory)}
                        </p>
                    )}
                    {rejectionReason && (
                        <p className="text-text-muted mt-1 text-sm">
                            {rejectionReason}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ModerationActionPanel;
