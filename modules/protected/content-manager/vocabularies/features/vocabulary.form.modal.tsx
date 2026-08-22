import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    CircularProgress,
    IconButton
} from "@mui/material";
import { X } from "lucide-react";
import { CreateVocabularyRequest, UpdateVocabularyRequest } from "@/types/requests/vocabulary.request";
import { VocabularyResponse } from "@/types/responses/vocabulary.response";
import { useTranslations } from "next-intl";

interface VocabularyFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateVocabularyRequest | UpdateVocabularyRequest) => void;
    vocabulary: VocabularyResponse | null;
    isSubmitting: boolean;
}

type FormData = {
    japanese: string;
    reading: string;
    vietnameseMeaningText: string;
    englishMeaningText: string;
};

export default function VocabularyFormModal({
    open,
    onClose,
    onSubmit,
    vocabulary,
    isSubmitting,
}: Readonly<VocabularyFormModalProps>) {
    const isUpdate = !!vocabulary;
    const t = useTranslations("vocabularyManagement");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            japanese: "",
            reading: "",
            vietnameseMeaningText: "",
            englishMeaningText: "",
        },
    });

    useEffect(() => {
        if (open) {
            if (vocabulary) {
                reset({
                    japanese: vocabulary.japanese,
                    reading: vocabulary.reading || "",
                    vietnameseMeaningText: vocabulary.vietnameseMeaningText || "",
                    englishMeaningText: vocabulary.englishMeaningText || "",
                });
            } else {
                reset({
                    japanese: "",
                    reading: "",
                    vietnameseMeaningText: "",
                    englishMeaningText: "",
                });
            }
        }
    }, [open, vocabulary, reset]);

    const submitHandler = (data: FormData) => {
        onSubmit({
            ...data,
            englishMeaningText: data.englishMeaningText || undefined,
        });
    };

    return (
        <Dialog open={open} onClose={!isSubmitting ? onClose : undefined} maxWidth="sm" fullWidth>
            <DialogTitle className="flex justify-between items-center bg-bgc-app border-b border-bdc-primary">
                <Typography variant="h6" className="font-semibold text-text-contrast">
                    {isUpdate ? t("updateTitle") : t("createTitle")}
                </Typography>
                <IconButton onClick={onClose} disabled={isSubmitting} size="small" className="text-text-muted hover:text-text-contrast">
                    <X size={20} />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogContent className="bg-bgc-app flex flex-col gap-4 py-6">
                    <Controller
                        name="japanese"
                        control={control}
                        rules={{ required: t("japaneseRequired") }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("japaneseLabel")}
                                variant="outlined"
                                fullWidth
                                error={!!errors.japanese}
                                helperText={errors.japanese?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                    <Controller
                        name="reading"
                        control={control}
                        rules={{ required: t("readingRequired") }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("readingLabel")}
                                variant="outlined"
                                fullWidth
                                error={!!errors.reading}
                                helperText={errors.reading?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                    <Controller
                        name="vietnameseMeaningText"
                        control={control}
                        rules={{ required: t("vietnameseMeaningRequired") }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("vietnameseMeaningLabel")}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                error={!!errors.vietnameseMeaningText}
                                helperText={errors.vietnameseMeaningText?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                    <Controller
                        name="englishMeaningText"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("englishMeaningLabel")}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                error={!!errors.englishMeaningText}
                                helperText={errors.englishMeaningText?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions className="bg-bgc-app border-t border-bdc-primary px-6 py-4">
                    <Button
                        onClick={onClose}
                        disabled={isSubmitting}
                        variant="outlined"
                        color="inherit"
                        className="text-text-muted border-bdc-primary hover:bg-hbgc-app"
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
                    >
                        {isSubmitting ? t("saving") : isUpdate ? t("update") : t("create")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
