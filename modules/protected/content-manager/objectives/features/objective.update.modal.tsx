import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { ObjectiveResponse } from "@/types/responses/objective.response";
import { UpdateObjectiveRequest } from "@/types/requests/objective.request";
import { TopicStatus } from "@/types/enums/topic.enum";

interface UpdateObjectiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    objective: ObjectiveResponse | null;
    onSave: (data: UpdateObjectiveRequest) => void;
    isSaving: boolean;
}

export const UpdateObjectiveModal: React.FC<UpdateObjectiveModalProps> = ({
    isOpen,
    onClose,
    objective,
    onSave,
    isSaving,
}) => {
    const t = useTranslations("objectiveManagement");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateObjectiveRequest>({
        defaultValues: {
            japaneseName: "",
            japaneseDescription: "",
            status: TopicStatus.DRAFT,
        },
    });

    useEffect(() => {
        if (objective && isOpen) {
            reset({
                japaneseName: objective.japaneseName || "",
                japaneseDescription: objective.japaneseDescription || "",
                status: objective.status || TopicStatus.DRAFT,
            });
        }
    }, [objective, isOpen, reset]);

    const onSubmit = (data: UpdateObjectiveRequest) => {
        onSave(data);
    };

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
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
            backgroundColor: "var(--color-bgc-modal)",
            padding: "0 4px",
            "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
        },
        "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
    };

    return (
        <Dialog 
            open={isOpen} 
            onClose={!isSaving ? onClose : undefined} 
            maxWidth="sm" 
            fullWidth
            slotProps={{
                paper: {
                    className: "bg-bgc-modal text-text-contrast border border-bdc-primary rounded-xl",
                    sx: {
                        backgroundColor: "var(--color-bgc-modal)",
                        color: "var(--color-text-contrast)",
                        borderRadius: "16px",
                    },
                },
            }}
        >
            <DialogTitle className="border-b border-bdc-primary pb-4 pt-5 px-6 text-xl font-bold">
                {t("updateTitle") || "Chỉnh sửa Mục tiêu"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="pt-6 px-6 space-y-6">
                    <Controller
                        name="japaneseName"
                        control={control}
                        rules={{ required: "Tên mục tiêu không được để trống" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("japaneseName") || "Tên tiếng Nhật"}
                                variant="outlined"
                                fullWidth
                                error={!!errors.japaneseName}
                                helperText={errors.japaneseName?.message}
                                disabled={isSaving}
                                sx={inputSx}
                            />
                        )}
                    />

                    <Controller
                        name="japaneseDescription"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("japaneseDescription") || "Mô tả tiếng Nhật"}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                disabled={isSaving}
                                sx={inputSx}
                            />
                        )}
                    />

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth variant="outlined" disabled={isSaving} sx={inputSx}>
                                <InputLabel>{t("statusLabel") || "Trạng thái"}</InputLabel>
                                <Select 
                                    {...field} 
                                    label={t("statusLabel") || "Trạng thái"}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: "var(--color-bgc-panel)",
                                                color: "var(--color-text-contrast)",
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={TopicStatus.DRAFT}>{t("statusDraft") || "Bản nháp"}</MenuItem>
                                    <MenuItem value={TopicStatus.PUBLISHED}>{t("statusPublished") || "Đã xuất bản"}</MenuItem>
                                    <MenuItem value={TopicStatus.ARCHIVE}>{t("statusArchive") || "Lưu trữ"}</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </DialogContent>
                <DialogActions className="border-t border-bdc-primary px-6 py-4">
                    <Button 
                        onClick={onClose} 
                        disabled={isSaving}
                        sx={{ color: "var(--color-text-muted)" }}
                    >
                        {t("cancel") || "Hủy"}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSaving}
                        sx={{
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "var(--color-bgc-highlight)",
                                opacity: 0.9
                            }
                        }}
                    >
                        {isSaving ? (t("loading") || "Đang lưu...") : (t("save") || "Lưu")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
