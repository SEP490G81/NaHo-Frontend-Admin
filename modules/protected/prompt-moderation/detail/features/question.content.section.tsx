"use client";
import { useTranslations } from "next-intl";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";

interface QuestionContentSectionProps {
    japaneseQuestion: string;
    japaneseQuestionMarkup: string;
    contextualHint: string;
    questionError: boolean;
    onChange: (
        field: "japaneseQuestion" | "japaneseQuestionMarkup" | "contextualHint",
        value: string,
    ) => void;
}

const QuestionContentSection = ({
    japaneseQuestion,
    japaneseQuestionMarkup,
    contextualHint,
    questionError,
    onChange,
}: QuestionContentSectionProps) => {
    const t = useTranslations("promptModeration.detail.question");

    return (
        <section className="bg-bgc-app space-y-4 rounded-xl p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    {t("title")}{" "}
                    <span className="text-text-muted text-sm font-normal">
                        {t("tableTag")}
                    </span>
                </h2>
                <p className="text-text-muted mt-1 text-sm">{t("hint")}</p>
            </div>

            <div className="space-y-1">
                <label className="text-text-muted text-sm">
                    {t("japaneseQuestion")}
                </label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={3}
                    value={japaneseQuestion}
                    onChange={(e) =>
                        onChange("japaneseQuestion", e.target.value)
                    }
                    error={questionError}
                />
            </div>

            <div className="space-y-1">
                <label className="text-text-muted text-sm">
                    {t("japaneseQuestionMarkup")}
                </label>
                <TextFieldCustom
                    fullWidth
                    value={japaneseQuestionMarkup}
                    onChange={(e) =>
                        onChange("japaneseQuestionMarkup", e.target.value)
                    }
                />
            </div>

            <div className="space-y-1">
                <label className="text-text-muted text-sm">
                    {t("contextualHint")}
                </label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={2}
                    value={contextualHint}
                    onChange={(e) => onChange("contextualHint", e.target.value)}
                />
            </div>
        </section>
    );
};

export default QuestionContentSection;
