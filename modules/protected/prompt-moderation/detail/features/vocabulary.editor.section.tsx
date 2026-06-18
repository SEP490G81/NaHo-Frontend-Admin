"use client";
import { useTranslations } from "next-intl";
import { Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { VocabularyItem } from "@/types/responses/custom.question.response";
import { createVocabItem } from "../utils/draft.util";

interface VocabularyEditorSectionProps {
    items: VocabularyItem[];
    onChange: (items: VocabularyItem[]) => void;
}

const VocabularyEditorSection = ({
    items,
    onChange,
}: VocabularyEditorSectionProps) => {
    const t = useTranslations("promptModeration.detail.vocab");

    const update = (id: string, patch: Partial<VocabularyItem>) =>
        onChange(items.map((v) => (v.id === id ? { ...v, ...patch } : v)));
    const remove = (id: string) => onChange(items.filter((v) => v.id !== id));
    const add = () => onChange([...items, createVocabItem()]);

    return (
        <section className="bg-bgc-app space-y-4 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        {t("title")}{" "}
                        <span className="text-text-muted text-sm font-normal">
                            {t("tableTag")}
                        </span>
                    </h2>
                    <p className="text-text-muted mt-1 text-sm">{t("hint")}</p>
                </div>
                <span className="text-text-muted text-sm whitespace-nowrap">
                    {t("count", { count: items.length })}
                </span>
            </div>

            {items.length === 0 ? (
                <p className="text-text-muted text-sm">{t("empty")}</p>
            ) : (
                <div className="space-y-4">
                    {items.map((v) => (
                        <div
                            key={v.id}
                            className="border-bdc-muted flex items-end gap-3 rounded-lg border p-4"
                        >
                            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                <Field
                                    label={t("japaneseWord")}
                                    value={v.japaneseWord}
                                    onChange={(value) =>
                                        update(v.id, { japaneseWord: value })
                                    }
                                />
                                <Field
                                    label={t("furiganaMarkup")}
                                    value={v.furiganaMarkup}
                                    onChange={(value) =>
                                        update(v.id, { furiganaMarkup: value })
                                    }
                                />
                                <Field
                                    label={t("vietnameseMeaning")}
                                    value={v.vietnameseMeaning}
                                    onChange={(value) =>
                                        update(v.id, {
                                            vietnameseMeaning: value,
                                        })
                                    }
                                />
                                <Field
                                    label={t("englishMeaning")}
                                    value={v.englishMeaning}
                                    onChange={(value) =>
                                        update(v.id, { englishMeaning: value })
                                    }
                                />
                            </div>
                            <IconButton
                                onClick={() => remove(v.id)}
                                sx={{ color: "var(--color-bgc-error)" }}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </div>
                    ))}
                </div>
            )}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={add}
                sx={{
                    color: "text.primary",
                    borderColor: "var(--color-bdc-muted)",
                }}
            >
                {t("add")}
            </Button>
        </section>
    );
};

const Field = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-text-muted text-xs">{label}</label>
        <TextFieldCustom
            fullWidth
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default VocabularyEditorSection;
