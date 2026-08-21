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
import { LessonResponse } from "@/types/responses/lesson.response";
import { UpdateLessonRequest } from "@/types/requests/lesson.request";
import { TopicStatus } from "@/types/enums/topic.enum";

interface UpdateLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    lesson: LessonResponse | undefined;
    onSave: (data: UpdateLessonRequest) => void;
    isSaving: boolean;
}

export const UpdateLessonModal: React.FC<UpdateLessonModalProps> = ({
    isOpen,
    onClose,
    lesson,
    onSave,
    isSaving,
}) => {
    const t = useTranslations("lessonManagement");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateLessonRequest>({
        defaultValues: {
            japaneseName: "",
            japaneseDescription: "",
            status: TopicStatus.DRAFT,
        },
    });

    useEffect(() => {
        if (lesson && isOpen) {
            reset({
                japaneseName: lesson.japaneseName || "",
                japaneseDescription: lesson.japaneseDescription || "",
                status: lesson.status || TopicStatus.DRAFT,
            });
        }
    }, [lesson, isOpen, reset]);

    const onSubmit = (data: UpdateLessonRequest) => {
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
                {t("updateTitle")}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="pt-6 px-6 space-y-6">
                    <Controller
                        name="japaneseName"
                        control={control}
                        rules={{ required: "Tên bài học không được để trống" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("japaneseName")}
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
                                label={t("japaneseDescription")}
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
                                <InputLabel>{t("statusLabel")}</InputLabel>
                                <Select 
                                    {...field} 
                                    label={t("statusLabel")}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: "var(--color-bgc-panel)",
                                                color: "var(--color-text-contrast)",
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={TopicStatus.DRAFT}>{t("statusDraft")}</MenuItem>
                                    <MenuItem value={TopicStatus.PUBLISHED}>{t("statusPublished")}</MenuItem>
                                    <MenuItem value={TopicStatus.ARCHIVE}>{t("statusArchive")}</MenuItem>
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
                        {t("cancel")}
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
                        {isSaving ? t("loading") : t("save")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
