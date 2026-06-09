"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "@/intl/i18n/navigation";
import { fetchTopicDetail, updateTopic } from "@/services/client/topic.service";
import { TopicDetailResponse } from "@/types/responses/topic.response";
import {
    TopicDetailContextType,
    TopicDetailForm,
} from "../types/topic.detail.type";

const TopicDetailContext = createContext<TopicDetailContextType | null>(null);

const EMPTY_FORM: TopicDetailForm = {
    name: "",
    jlptLevel: "N3",
    status: "DRAFT",
    description: "",
    coverImageName: "",
};

const TopicDetailProvider = ({
    topicId,
    children,
}: {
    topicId: string;
    children: React.ReactNode;
}) => {
    const t = useTranslations("topicManagement.detail");
    const router = useRouter();
    const [topic, setTopic] = useState<TopicDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [form, setForm] = useState<TopicDetailForm>(EMPTY_FORM);

    useEffect(() => {
        setIsLoading(true);
        fetchTopicDetail(topicId)
            .then((result) => {
                setTopic(result.data);
                setForm({
                    name: result.data.name,
                    jlptLevel: result.data.jlptLevel,
                    status: result.data.status,
                    description: result.data.description,
                    coverImageName: result.data.coverImageUrl ?? "",
                });
            })
            .catch(() => toast.error(t("error")))
            .finally(() => setIsLoading(false));
    }, [topicId, t]);

    const setFormField = useCallback(
        (partial: Partial<TopicDetailForm>) =>
            setForm((prev) => ({ ...prev, ...partial })),
        [],
    );

    const save = useCallback(async () => {
        if (!topic) return;
        const questionCount = topic.questions.length;

        // Không cho xuất bản khi chưa có câu hỏi nào.
        if (form.status === "ACTIVE" && questionCount === 0) {
            toast.info(t("needQuestion"));
            return;
        }

        // Tự xuất bản khi chủ đề (đang là bản nháp) đã có ít nhất 1 câu hỏi.
        const willAutoPublish =
            topic.status === "DRAFT" &&
            form.status === "DRAFT" &&
            questionCount >= 1;
        const finalStatus = willAutoPublish ? "ACTIVE" : form.status;

        setIsSaving(true);
        try {
            await updateTopic(topicId, {
                name: form.name,
                jlptLevel: form.jlptLevel,
                status: finalStatus,
                description: form.description,
                coverImageUrl: form.coverImageName || undefined,
            });
            toast.success(willAutoPublish ? t("publishSuccess") : t("saveSuccess"));
            router.push("/content-manager/topics");
        } catch {
            toast.error(t("error"));
            setIsSaving(false);
        }
    }, [topic, topicId, form, t, router]);

    const value = useMemo<TopicDetailContextType>(
        () => ({ topic, isLoading, isSaving, form, setFormField, save }),
        [topic, isLoading, isSaving, form, setFormField, save],
    );

    return (
        <TopicDetailContext.Provider value={value}>
            {children}
        </TopicDetailContext.Provider>
    );
};

export { TopicDetailProvider };

export const useTopicDetail = (): TopicDetailContextType => {
    const ctx = useContext(TopicDetailContext);
    if (!ctx)
        throw new Error("useTopicDetail must be used within TopicDetailProvider");
    return ctx;
};
