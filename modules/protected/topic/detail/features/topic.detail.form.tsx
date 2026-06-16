"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { Link } from "@/i18n/navigation";
import {
    JLPT_LEVELS,
    TOPIC_STATUSES,
    getTopicLevelStyle,
} from "@/constants/topic.constant";
import { TopicStatus } from "@/types/enums/topic.enum";
import { useTopicDetail } from "../providers/topic.detail.provider";

const STATUS_KEY: Record<TopicStatus, "draft" | "active" | "hidden"> = {
    DRAFT: "draft",
    ACTIVE: "active",
    HIDDEN: "hidden",
};

const TopicDetailForm = () => {
    const t = useTranslations("topicManagement.detail");
    const tStatus = useTranslations("topicManagement.status");
    const { form, setFormField, save, isSaving } = useTopicDetail();
    const { gradient, emoji } = getTopicLevelStyle(form.jlptLevel);

    return (
        <div className="bg-bgc-app space-y-6 rounded-xl p-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    {t("nameLabel")} <span className="text-bgc-error">*</span>
                </label>
                <TextFieldCustom
                    fullWidth
                    size="small"
                    value={form.name}
                    onChange={(e) => setFormField({ name: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">{t("levelLabel")}</label>
                    <Select
                        fullWidth
                        size="small"
                        value={form.jlptLevel}
                        onChange={(e) =>
                            setFormField({
                                jlptLevel: e.target.value as typeof form.jlptLevel,
                            })
                        }
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
                        value={form.status}
                        onChange={(e) =>
                            setFormField({ status: e.target.value as typeof form.status })
                        }
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
                    {form.coverImageName || t("coverPick")}
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) =>
                            setFormField({
                                coverImageName: e.target.files?.[0]?.name ?? "",
                            })
                        }
                    />
                </label>
                <p className="text-text-muted text-xs">{t("coverSupport")}</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    {t("descLabel")} <span className="text-bgc-error">*</span>
                </label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder={t("descPlaceholder")}
                    value={form.description}
                    onChange={(e) => setFormField({ description: e.target.value })}
                />
            </div>

            <div className="flex justify-end gap-3 border-t pt-5">
                <Link href="/content-manager/topics">
                    <Button variant="outlined" startIcon={<CloseIcon />} sx={{ color: "text.primary" }}>
                        {t("cancel")}
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    disableElevation
                    disabled={isSaving}
                    startIcon={<SaveOutlinedIcon />}
                    onClick={save}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("save")}
                </Button>
            </div>
        </div>
    );
};

export default TopicDetailForm;
