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
import {
    deleteQuestion as deleteQuestionApi,
    fetchTopicDetail,
    reorderQuestions as reorderQuestionsApi,
    saveQuestion,
    tokenizeJapanese,
} from "@/services/client/topic.service";
import {
    QuestionResponse,
    SentenceItem,
    TopicDetailResponse,
    VocabItem,
} from "@/types/responses/topic.response";
import { EMPTY_DRAFT, questionToDraft } from "../constants/topic.questions.constant";
import {
    QuestionDraft,
    QuestionTab,
    TopicQuestionsContextType,
} from "../types/topic.questions.type";

const TopicQuestionsContext = createContext<TopicQuestionsContextType | null>(
    null,
);

const TopicQuestionsProvider = ({
    topicId,
    children,
}: {
    topicId: string;
    children: React.ReactNode;
}) => {
    const t = useTranslations("topicManagement.questions");
    const [topic, setTopic] = useState<TopicDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTokenizing, setIsTokenizing] = useState(false);
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<QuestionTab>("content");
    const [draft, setDraft] = useState<QuestionDraft>(EMPTY_DRAFT);

    useEffect(() => {
        setIsLoading(true);
        fetchTopicDetail(topicId)
            .then((result) => {
                setTopic(result.data);
                setQuestions(result.data.questions);
            })
            .catch(() => toast.error(t("notFound")))
            .finally(() => setIsLoading(false));
    }, [topicId, t]);

    const selectQuestion = useCallback(
        (id: string) => {
            const found = questions.find((q) => q.id === id);
            if (!found) return;
            setSelectedId(id);
            setActiveTab("content");
            setDraft(questionToDraft(found));
        },
        [questions],
    );

    const startCreate = useCallback(() => {
        setSelectedId(null);
        setActiveTab("content");
        setDraft(EMPTY_DRAFT);
    }, []);

    const setDraftField = useCallback(
        (partial: Partial<QuestionDraft>) =>
            setDraft((prev) => ({ ...prev, ...partial })),
        [],
    );
    const setAudioName = useCallback(
        (name: string) => setDraft((prev) => ({ ...prev, audioName: name })),
        [],
    );

    const addVocab = useCallback(
        () =>
            setDraft((prev) => ({
                ...prev,
                vocab: [...prev.vocab, { jp: "", furigana: "", vi: "" }],
            })),
        [],
    );
    const updateVocab = useCallback(
        (index: number, partial: Partial<VocabItem>) =>
            setDraft((prev) => ({
                ...prev,
                vocab: prev.vocab.map((v, i) =>
                    i === index ? { ...v, ...partial } : v,
                ),
            })),
        [],
    );
    const removeVocab = useCallback(
        (index: number) =>
            setDraft((prev) => ({
                ...prev,
                vocab: prev.vocab.filter((_, i) => i !== index),
            })),
        [],
    );

    const addSentence = useCallback(
        () =>
            setDraft((prev) => ({
                ...prev,
                sentences: [...prev.sentences, { jp: "", vi: "" }],
            })),
        [],
    );
    const updateSentence = useCallback(
        (index: number, partial: Partial<SentenceItem>) =>
            setDraft((prev) => ({
                ...prev,
                sentences: prev.sentences.map((s, i) =>
                    i === index ? { ...s, ...partial } : s,
                ),
            })),
        [],
    );
    const removeSentence = useCallback(
        (index: number) =>
            setDraft((prev) => ({
                ...prev,
                sentences: prev.sentences.filter((_, i) => i !== index),
            })),
        [],
    );

    const generateFurigana = useCallback(async () => {
        if (!draft.jp.trim()) {
            toast.info(t("content.generateEmpty"));
            return;
        }
        setIsTokenizing(true);
        try {
            const result = await tokenizeJapanese(draft.jp);
            setDraft((prev) => ({ ...prev, furigana: result.data.furigana }));
        } catch {
            toast.error(t("content.generateError"));
        } finally {
            setIsTokenizing(false);
        }
    }, [draft.jp, t]);

    const save = useCallback(async () => {
        setIsSaving(true);
        const id = selectedId ?? `q-${Date.now()}`;
        try {
            const saved: QuestionResponse = {
                id,
                jp: draft.jp,
                furigana: draft.furigana,
                vi: draft.vi,
                audioUrl: draft.audioName || undefined,
                vocab: draft.vocab,
                sentences: draft.sentences,
                contextHintJp: draft.contextHintJp,
                contextHintVi: draft.contextHintVi,
            };
            await saveQuestion(topicId, saved);
            setQuestions((prev) =>
                selectedId
                    ? prev.map((q) => (q.id === selectedId ? saved : q))
                    : [...prev, saved],
            );
            setSelectedId(id);
            toast.success(t("saveSuccess"));
        } catch {
            toast.error(t("notFound"));
        } finally {
            setIsSaving(false);
        }
    }, [topicId, draft, selectedId, t]);

    const deleteQuestion = useCallback(
        async (id: string) => {
            try {
                await deleteQuestionApi(topicId, id);
                setQuestions((prev) => prev.filter((q) => q.id !== id));
                if (selectedId === id) {
                    setSelectedId(null);
                    setActiveTab("content");
                    setDraft(EMPTY_DRAFT);
                }
                toast.success(t("deleteSuccess"));
            } catch {
                toast.error(t("notFound"));
            }
        },
        [topicId, selectedId, t],
    );

    const reorderQuestions = useCallback(
        (fromId: string, toId: string) => {
            if (fromId === toId) return;
            setQuestions((prev) => {
                const fromIndex = prev.findIndex((q) => q.id === fromId);
                const toIndex = prev.findIndex((q) => q.id === toId);
                if (fromIndex < 0 || toIndex < 0) return prev;
                const next = [...prev];
                const [moved] = next.splice(fromIndex, 1);
                next.splice(toIndex, 0, moved);
                reorderQuestionsApi(topicId, next.map((q) => q.id)).catch(() => {});
                return next;
            });
            toast.success(t("reorderSuccess"));
        },
        [topicId, t],
    );

    const value = useMemo<TopicQuestionsContextType>(
        () => ({
            topic,
            isLoading,
            isSaving,
            isTokenizing,
            questions,
            selectedId,
            activeTab,
            draft,
            selectQuestion,
            startCreate,
            setActiveTab,
            setDraftField,
            setAudioName,
            addVocab,
            updateVocab,
            removeVocab,
            addSentence,
            updateSentence,
            removeSentence,
            generateFurigana,
            save,
            deleteQuestion,
            reorderQuestions,
        }),
        [
            topic,
            isLoading,
            isSaving,
            isTokenizing,
            questions,
            selectedId,
            activeTab,
            draft,
            selectQuestion,
            startCreate,
            setDraftField,
            setAudioName,
            addVocab,
            updateVocab,
            removeVocab,
            addSentence,
            updateSentence,
            removeSentence,
            generateFurigana,
            save,
            deleteQuestion,
            reorderQuestions,
        ],
    );

    return (
        <TopicQuestionsContext.Provider value={value}>
            {children}
        </TopicQuestionsContext.Provider>
    );
};

export { TopicQuestionsProvider };

export const useTopicQuestions = (): TopicQuestionsContextType => {
    const ctx = useContext(TopicQuestionsContext);
    if (!ctx)
        throw new Error(
            "useTopicQuestions must be used within TopicQuestionsProvider",
        );
    return ctx;
};
