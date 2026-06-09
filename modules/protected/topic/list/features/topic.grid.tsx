"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import TopicCard from "../components/topic.card";
import { useTopicManagement } from "../providers/topic.management.provider";

const TopicGrid = () => {
    const t = useTranslations("topicManagement.list");
    const { topics, totalCount, isLoading, openDeleteDialog, reorder } =
        useTopicManagement();
    const [draggedId, setDraggedId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex justify-center py-16">
                <CircularProgress sx={{ color: "var(--color-bgc-highlight)" }} />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-text-muted text-sm">
                    {t("showing", { count: topics.length, total: totalCount })}
                </p>
                {topics.length > 1 && (
                    <p className="text-text-muted flex items-center gap-1 text-xs">
                        <DragIndicatorIcon fontSize="inherit" />
                        {t("dragHint")}
                    </p>
                )}
            </div>
            {topics.length === 0 ? (
                <div className="text-text-muted py-16 text-center">{t("empty")}</div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            draggable
                            onDragStart={() => setDraggedId(topic.id)}
                            onDragEnd={() => setDraggedId(null)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                                if (draggedId) reorder(draggedId, topic.id);
                                setDraggedId(null);
                            }}
                            className={`cursor-grab transition-opacity active:cursor-grabbing ${
                                draggedId === topic.id ? "opacity-40" : ""
                            }`}
                        >
                            <TopicCard topic={topic} onDelete={openDeleteDialog} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopicGrid;
