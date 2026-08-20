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
import { TopicResponse } from "@/types/responses/topic.response";
import { UpdateTopicRequest } from "@/types/requests/topic.request";
import { TopicStatus } from "@/types/enums/topic.enum";

interface UpdateTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: TopicResponse | undefined;
    onSave: (data: UpdateTopicRequest) => void;
    isSaving: boolean;
}

export const UpdateTopicModal: React.FC<UpdateTopicModalProps> = ({
    isOpen,
    onClose,
    topic,
    onSave,
    isSaving,
}) => {
    const t = useTranslations("topicManagement");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateTopicRequest>({
        defaultValues: {
            japaneseName: "",
            japaneseDescription: "",
            vietnameseDescription: "",
            englishDescription: "",
            status: TopicStatus.DRAFT,
        },
    });

    useEffect(() => {
        if (topic && isOpen) {
            reset({
                japaneseName: topic.japaneseName || "",
                japaneseDescription: topic.japaneseDescription || "",
                vietnameseDescription: topic.vietnameseDescription || "",
                englishDescription: topic.englishDescription || "",
                status: topic.status || TopicStatus.DRAFT,
            });
        }
    }, [topic, isOpen, reset]);

    const onSubmit = (data: UpdateTopicRequest) => {
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
            "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
        },
        "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
    };

    return (
        <Dialog 
            open={isOpen} 
            onClose={!isSaving ? onClose : undefined} 
            maxWidth="md" 
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            name="japaneseName"
                            control={control}
                            rules={{ required: "Tên chủ đề không được để trống" }}
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
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined" disabled={isSaving} sx={inputSx}>
                                    <InputLabel>{t("status")}</InputLabel>
                                    <Select 
                                        {...field} 
                                        label={t("status")}
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
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-text-muted mb-2">{t("description")}</h4>
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
                                    rows={2}
                                    disabled={isSaving}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="vietnameseDescription"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t("vietnameseDescription")}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    disabled={isSaving}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="englishDescription"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t("englishDescription")}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    disabled={isSaving}
                                    sx={inputSx}
                                />
                            )}
                        />
                    </div>
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
