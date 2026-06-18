"use client";
import { useTranslations } from "next-intl";
import { MenuItem, Select } from "@mui/material";
import { TopicOption } from "@/types/responses/topic.option.response";

interface TopicAssignCardProps {
    topicId: string;
    options: TopicOption[];
    error: boolean;
    onChange: (topicId: string) => void;
}

const TopicAssignCard = ({
    topicId,
    options,
    error,
    onChange,
}: TopicAssignCardProps) => {
    const t = useTranslations("promptModeration.detail.topic");

    return (
        <div className="bg-bgc-app space-y-2 rounded-xl p-6">
            <h3 className="text-text-muted text-xs font-semibold tracking-wider">
                {t("title")}
            </h3>
            <p className="text-text-muted text-sm">{t("hint")}</p>
            <Select
                fullWidth
                size="small"
                displayEmpty
                value={topicId}
                error={error}
                onChange={(e) => onChange(e.target.value)}
                renderValue={(value) => {
                    if (!value) return <span>{t("placeholder")}</span>;
                    const opt = options.find((o) => o.id === value);
                    return opt ? `${opt.label} · ${opt.jlptLevel}` : value;
                }}
            >
                <MenuItem value="" disabled>
                    {t("placeholder")}
                </MenuItem>
                {options.map((o) => (
                    <MenuItem key={o.id} value={o.id}>
                        <div className="flex flex-col">
                            <span>
                                {o.japaneseName} — {o.label}
                            </span>
                            <span className="text-text-muted text-xs">
                                {o.categoryName} · {o.jlptLevel}
                            </span>
                        </div>
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <p className="text-bgc-error text-xs">{t("required")}</p>
            )}
        </div>
    );
};

export default TopicAssignCard;
