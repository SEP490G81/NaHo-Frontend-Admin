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
import { CreateGrammarRequest, UpdateGrammarRequest } from "@/types/requests/grammar.request";
import { GrammarResponse } from "@/types/responses/vocabulary.response";
import { useTranslations } from "next-intl";

interface GrammarFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateGrammarRequest | UpdateGrammarRequest) => void;
    grammar: GrammarResponse | null;
    isSubmitting: boolean;
}

type FormData = {
    japanese: string;
    reading: string;
    vietnameseMeaningText: string;
    englishMeaningText: string;
};

export default function GrammarFormModal({
    open,
    onClose,
    onSubmit,
    grammar,
    isSubmitting,
}: Readonly<GrammarFormModalProps>) {
    const isUpdate = !!grammar;
    const t = useTranslations("grammarManagement");

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
            if (grammar) {
                reset({
                    japanese: grammar.japanese,
                    reading: grammar.reading || "",
                    vietnameseMeaningText: grammar.vietnameseMeaningText || "",
                    englishMeaningText: grammar.englishMeaningText || "",
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
    }, [open, grammar, reset]);

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
