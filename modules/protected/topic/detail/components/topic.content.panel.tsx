"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { Link } from "@/intl/i18n/navigation";
import { TopicDetailResponse } from "@/types/responses/topic.response";

interface TopicContentPanelProps {
    topic: TopicDetailResponse;
}

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">{label}</span>
        <span className="font-semibold">{value}</span>
    </div>
);

const TopicContentPanel = ({ topic }: TopicContentPanelProps) => {
    const t = useTranslations("topicManagement.detail");

    return (
        <div className="space-y-4">
            <div className="bg-bgc-app space-y-4 rounded-xl p-6">
                <div>
                    <h2 className="text-lg font-bold">{t("panel.title")}</h2>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("panel.description")}
                    </p>
                </div>
                <Link
                    href={{
                        pathname: "/content-manager/topics/[id]/questions",
                        params: { id: topic.id },
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        startIcon={<PlaylistAddCheckOutlinedIcon />}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-contrast)",
                        }}
                    >
                        {t("panel.manageQuestions")}
                    </Button>
                </Link>
                <div className="space-y-3 pt-2">
                    <InfoRow
                        label={t("panel.topicCode")}
                        value={<code className="text-xs">{topic.id}</code>}
                    />
                    <InfoRow
                        label={t("panel.questionCount")}
                        value={topic.questions.length}
                    />
                    <InfoRow
                        label={t("panel.averageScore")}
                        value={topic.averageScore > 0 ? topic.averageScore : "—"}
                    />
                </div>
            </div>

            <div className="border-bdc-primary rounded-xl border border-dashed p-6">
                <h3 className="font-semibold">{t("hint.title")}</h3>
                <p className="text-text-muted mt-2 text-sm">{t("hint.content")}</p>
            </div>
        </div>
    );
};

export default TopicContentPanel;
