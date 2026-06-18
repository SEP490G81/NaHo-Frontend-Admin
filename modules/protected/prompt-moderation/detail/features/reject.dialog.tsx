"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
} from "@mui/material";
import { RejectionCategory } from "@/types/enums/moderation.enum";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { REJECTION_CATEGORIES } from "../../constants/prompt.moderation.constant";

interface RejectDialogProps {
    open: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onConfirm: (category: RejectionCategory, reason: string) => void;
}

const RejectDialog = ({
    open,
    isSubmitting,
    onClose,
    onConfirm,
}: RejectDialogProps) => {
    const t = useTranslations("promptModeration.detail.rejectDialog");
    const tCat = useTranslations("promptModeration.rejectionCategory");
    const tValidation = useTranslations("promptModeration.detail.validation");
    const [category, setCategory] = useState<RejectionCategory | "">("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState(false);

    const reset = () => {
        setCategory("");
        setReason("");
        setError(false);
    };
    const handleClose = () => {
        reset();
        onClose();
    };

    const handleConfirm = () => {
        // "OTHER" cần ghi chú; các nhóm khác chỉ cần chọn category.
        if (!category || (category === "OTHER" && reason.trim() === "")) {
            setError(true);
            return;
        }
        onConfirm(category, reason.trim());
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogContent>
                <p className="text-text-muted mb-4 text-sm">{t("description")}</p>

                <label className="text-text-muted mb-1 block text-sm">
                    {t("categoryLabel")}
                </label>
                <Select
                    fullWidth
                    size="small"
                    displayEmpty
                    value={category}
                    error={error && !category}
                    onChange={(e) => {
                        setCategory(e.target.value as RejectionCategory);
                        if (error) setError(false);
                    }}
                    renderValue={(value) =>
                        value ? tCat(value) : t("categoryPlaceholder")
                    }
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="" disabled>
                        {t("categoryPlaceholder")}
                    </MenuItem>
                    {REJECTION_CATEGORIES.map((c) => (
                        <MenuItem key={c} value={c}>
                            {tCat(c)}
                        </MenuItem>
                    ))}
                </Select>

                <label className="text-text-muted mb-1 block text-sm">
                    {t("reasonLabel")}
                </label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder={t("reasonPlaceholder")}
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                        if (error) setError(false);
                    }}
                    error={error && category === "OTHER" && reason.trim() === ""}
                    helperText={
                        error && category === "OTHER" && reason.trim() === ""
                            ? tValidation("rejectReasonRequired")
                            : ""
                    }
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    sx={{ color: "text.primary" }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                >
                    {t("confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RejectDialog;
