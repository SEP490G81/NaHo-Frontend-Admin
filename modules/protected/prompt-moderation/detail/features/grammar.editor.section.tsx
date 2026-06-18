"use client";
import { useTranslations } from "next-intl";
import { Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { GrammarItem } from "@/types/responses/custom.question.response";
import { createGrammarItem } from "../utils/draft.util";

interface GrammarEditorSectionProps {
    items: GrammarItem[];
    onChange: (items: GrammarItem[]) => void;
}

const GrammarEditorSection = ({
    items,
    onChange,
}: GrammarEditorSectionProps) => {
    const t = useTranslations("promptModeration.detail.grammar");

    const update = (id: string, patch: Partial<GrammarItem>) =>
        onChange(items.map((g) => (g.id === id ? { ...g, ...patch } : g)));
    const remove = (id: string) => onChange(items.filter((g) => g.id !== id));
    const add = () => onChange([...items, createGrammarItem()]);

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
                    {items.map((g, index) => (
                        <div
                            key={g.id}
                            className="border-bdc-muted space-y-3 rounded-lg border p-4"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-text-muted text-sm font-medium">
                                    {t("itemLabel", { index: index + 1 })}
                                </span>
                                <IconButton
                                    size="small"
                                    onClick={() => remove(g.id)}
                                    sx={{ color: "var(--color-bgc-error)" }}
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <Field
                                    label={t("japanesePattern")}
                                    value={g.japanesePattern}
                                    onChange={(value) =>
                                        update(g.id, { japanesePattern: value })
                                    }
                                />
                                <Field
                                    label={t("furiganaMarkup")}
                                    value={g.furiganaMarkup}
                                    onChange={(value) =>
                                        update(g.id, { furiganaMarkup: value })
                                    }
                                />
                                <Field
                                    label={t("vietnameseMeaning")}
                                    value={g.vietnameseMeaning}
                                    onChange={(value) =>
                                        update(g.id, {
                                            vietnameseMeaning: value,
                                        })
                                    }
                                />
                                <Field
                                    label={t("englishMeaning")}
                                    value={g.englishMeaning}
                                    onChange={(value) =>
                                        update(g.id, { englishMeaning: value })
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-text-muted text-xs">
                                    {t("explanation")}
                                </label>
                                <TextFieldCustom
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    size="small"
                                    value={g.explanation}
                                    onChange={(e) =>
                                        update(g.id, {
                                            explanation: e.target.value,
                                        })
                                    }
                                />
                            </div>
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

export default GrammarEditorSection;
