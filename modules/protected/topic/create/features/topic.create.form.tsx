"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { Link, useRouter } from "@/intl/i18n/navigation";
import {
    JLPT_LEVELS,
    TOPIC_STATUSES,
    getTopicLevelStyle,
} from "@/constants/topic.constant";
import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";
import { createTopic } from "@/services/client/topic.service";
import { validateCreateTopicForm } from "../actions/topic.create.action";
import { CreateTopicState } from "../types/topic.create.ui.type";

const STATUS_KEY: Record<TopicStatus, "draft" | "active" | "hidden"> = {
    DRAFT: "draft",
    ACTIVE: "active",
    HIDDEN: "hidden",
};

const initialState: CreateTopicState = {
    name: { value: "", error: false },
    description: { value: "", error: false },
};

const TopicCreateForm = () => {
    const t = useTranslations("topicManagement.create");
    const tStatus = useTranslations("topicManagement.status");
    const { push } = useRouter();

    const [state, setState] = useState<CreateTopicState>(initialState);
    const [level, setLevel] = useState<JlptLevel>("N3");
    const [status, setStatus] = useState<TopicStatus>("DRAFT");
    const [coverName, setCoverName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { gradient, emoji } = getTopicLevelStyle(level);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const newState = validateCreateTopicForm(new FormData(event.currentTarget));
        setState(newState);

        if (newState.name.error || newState.description.error) return;

        setSubmitting(true);
        try {
            const result = await createTopic({
                name: newState.name.value.trim(),
                jlptLevel: level,
                status,
                description: newState.description.value.trim(),
                coverImageUrl: coverName || undefined,
            });
            push({
                pathname: "/content-manager/topics/[id]",
                params: { id: result.data.id },
            });
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : t("error"));
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-bgc-app space-y-6 rounded-xl p-6">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    {t("nameLabel")} <span className="text-bgc-error">*</span>
                </label>
                <TextFieldCustom
                    name="name"
                    id="name"
                    fullWidth
                    size="small"
                    placeholder={t("namePlaceholder")}
                    defaultValue={state.name.value}
                    error={state.name.error}
                    helperText={state.name.error ? t("nameRequired") : ""}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">{t("levelLabel")}</label>
                    <Select
                        fullWidth
                        size="small"
                        value={level}
                        onChange={(e) => setLevel(e.target.value as JlptLevel)}
                    >
                        {JLPT_LEVELS.map((lv) => (
                            <MenuItem key={lv} value={lv}>
                                {lv}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">{t("statusLabel")}</label>
                    <Select
                        fullWidth
                        size="small"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TopicStatus)}
                    >
                        {TOPIC_STATUSES.map((s) => (
                            <MenuItem key={s} value={s}>
                                {tStatus(STATUS_KEY[s])}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t("coverLabel")}</label>
                <div
                    className={`flex h-64 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
                >
                    <span className="text-7xl">{emoji}</span>
                </div>
                <label className="border-bdc-muted hover:border-bgc-highlight inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors">
                    <AddPhotoAlternateOutlinedIcon fontSize="small" />
                    {coverName || t("coverPick")}
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) => setCoverName(e.target.files?.[0]?.name ?? "")}
                    />
                </label>
                <p className="text-text-muted text-xs">{t("coverSupport")}</p>
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                    {t("descLabel")} <span className="text-bgc-error">*</span>
                </label>
                <TextFieldCustom
                    name="description"
                    id="description"
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder={t("descPlaceholder")}
                    defaultValue={state.description.value}
                    error={state.description.error}
                    helperText={state.description.error ? t("descRequired") : ""}
                />
            </div>

            {errorMessage && (
                <p className="text-bgc-error text-sm font-medium">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-3 border-t pt-5">
                <Link href="/content-manager/topics">
                    <Button variant="outlined" startIcon={<CloseIcon />} sx={{ color: "text.primary" }}>
                        {t("cancel")}
                    </Button>
                </Link>
                <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    loading={submitting}
                    startIcon={<SaveOutlinedIcon />}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("submit")}
                </Button>
            </div>
        </form>
    );
};

export default TopicCreateForm;
