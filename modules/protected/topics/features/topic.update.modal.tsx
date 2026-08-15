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

    return (
        <Dialog open={isOpen} onClose={!isSaving ? onClose : undefined} maxWidth="md" fullWidth>
            <DialogTitle className="border-b pb-4 text-xl font-bold">
                {t("updateTitle")}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="pt-6 space-y-6">
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
                                />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined" disabled={isSaving}>
                                    <InputLabel>{t("status")}</InputLabel>
                                    <Select {...field} label={t("status")}>
                                        <MenuItem value={TopicStatus.DRAFT}>{t("statusDraft")}</MenuItem>
                                        <MenuItem value={TopicStatus.PUBLISHED}>{t("statusPublished")}</MenuItem>
                                        <MenuItem value={TopicStatus.ARCHIVE}>{t("statusArchive")}</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-muted-foreground">{t("description")}</h4>
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
                                />
                            )}
                        />
                    </div>
                </DialogContent>
                <DialogActions className="border-t p-4">
                    <Button onClick={onClose} disabled={isSaving} color="inherit">
                        {t("cancel")}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSaving}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        {isSaving ? t("loading") : t("save")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
