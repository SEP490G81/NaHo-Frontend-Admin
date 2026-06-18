"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@/i18n/navigation";
import { RejectionCategory } from "@/types/enums/moderation.enum";
import {
    GrammarItem,
    VocabularyItem,
} from "@/types/responses/custom.question.response";
import { SaveCustomQuestionRequest } from "@/types/requests/custom.question.request";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import ModerationStatusBadge from "../components/moderation.status.badge";
import {
    ModerationDetailProvider,
    useModerationDetail,
} from "./providers/moderation.detail.provider";
import {
    hasDraftError,
    validateModerationDraft,
} from "./actions/moderation.detail.action";
import QuestionContentSection from "./features/question.content.section";
import VocabularyEditorSection from "./features/vocabulary.editor.section";
import GrammarEditorSection from "./features/grammar.editor.section";
import SubmitterCard from "./features/submitter.card";
import TopicAssignCard from "./features/topic.assign.card";
import ModerationActionPanel from "./features/moderation.action.panel";
import RejectDialog from "./features/reject.dialog";

type QuestionField =
    | "japaneseQuestion"
    | "japaneseQuestionMarkup"
    | "contextualHint";

const noErrors = { japaneseQuestion: false, vocab: false, grammar: false };

/**
 * Form chỉnh sửa + kiểm duyệt. Mount mới (keyed theo detail.id) mỗi khi đổi
 * câu hỏi nên useState khởi tạo trực tiếp từ prop, không cần sync effect.
 */
const ReviewForm = ({ initial }: { initial: CustomQuestionResponse }) => {
    const tValidation = useTranslations("promptModeration.detail.validation");
    const { save, approve, reject, topicOptions, isSaving, isModerating } =
        useModerationDetail();

    const [japaneseQuestion, setJapaneseQuestion] = useState(
        initial.japaneseQuestion,
    );
    const [japaneseQuestionMarkup, setJapaneseQuestionMarkup] = useState(
        initial.japaneseQuestionMarkup,
    );
    const [contextualHint, setContextualHint] = useState(
        initial.contextualHint,
    );
    const [topicId, setTopicId] = useState(initial.topicId);
    const [vocabularies, setVocabularies] = useState<VocabularyItem[]>(
        initial.vocabularies,
    );
    const [grammars, setGrammars] = useState<GrammarItem[]>(initial.grammars);
    const [errors, setErrors] = useState(noErrors);
    const [topicError, setTopicError] = useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);

    const draft: SaveCustomQuestionRequest = useMemo(
        () => ({
            id: initial.id,
            japaneseQuestion,
            japaneseQuestionMarkup,
            contextualHint,
            topicId,
            vocabularies,
            grammars,
        }),
        [
            initial.id,
            japaneseQuestion,
            japaneseQuestionMarkup,
            contextualHint,
            topicId,
            vocabularies,
            grammars,
        ],
    );

    const isDirty = useMemo(() => {
        const snapshot: SaveCustomQuestionRequest = {
            id: initial.id,
            japaneseQuestion: initial.japaneseQuestion,
            japaneseQuestionMarkup: initial.japaneseQuestionMarkup,
            contextualHint: initial.contextualHint,
            topicId: initial.topicId,
            vocabularies: initial.vocabularies,
            grammars: initial.grammars,
        };
        return JSON.stringify(draft) !== JSON.stringify(snapshot);
    }, [draft, initial]);

    const onQuestionChange = (field: QuestionField, value: string) => {
        if (field === "japaneseQuestion") setJapaneseQuestion(value);
        else if (field === "japaneseQuestionMarkup")
            setJapaneseQuestionMarkup(value);
        else setContextualHint(value);
        if (errors.japaneseQuestion && field === "japaneseQuestion") {
            setErrors((prev) => ({ ...prev, japaneseQuestion: false }));
        }
    };

    const validate = (): boolean => {
        const next = validateModerationDraft(draft);
        setErrors(next);
        if (hasDraftError(next)) {
            if (next.japaneseQuestion)
                toast.error(tValidation("questionRequired"));
            else if (next.vocab) toast.error(tValidation("vocabIncomplete"));
            else if (next.grammar)
                toast.error(tValidation("grammarIncomplete"));
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (!validate()) return;
        save(draft);
    };
    const handleApprove = () => {
        if (topicId === "") {
            setTopicError(true);
            toast.error(tValidation("topicRequired"));
            return;
        }
        if (!validate()) return;
        approve(draft);
    };
    const handleReject = (category: RejectionCategory, reason: string) => {
        reject(draft, category, reason);
        setIsRejectOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
                <div className="space-y-5">
                    <QuestionContentSection
                        japaneseQuestion={japaneseQuestion}
                        japaneseQuestionMarkup={japaneseQuestionMarkup}
                        contextualHint={contextualHint}
                        questionError={errors.japaneseQuestion}
                        onChange={onQuestionChange}
                    />
                    <VocabularyEditorSection
                        items={vocabularies}
                        onChange={setVocabularies}
                    />
                    <GrammarEditorSection
                        items={grammars}
                        onChange={setGrammars}
                    />
                </div>
                <div className="space-y-5 lg:sticky lg:top-5 lg:self-start">
                    <SubmitterCard detail={initial} />
                    <TopicAssignCard
                        topicId={topicId}
                        options={topicOptions}
                        error={topicError}
                        onChange={(value) => {
                            setTopicId(value);
                            if (topicError) setTopicError(false);
                        }}
                    />
                    <ModerationActionPanel
                        status={initial.status}
                        reviewedAt={initial.reviewedAt}
                        rejectionCategory={initial.rejectionCategory}
                        rejectionReason={initial.rejectionReason}
                        canApprove={topicId !== ""}
                        isDirty={isDirty}
                        isSaving={isSaving}
                        isModerating={isModerating}
                        onSave={handleSave}
                        onApprove={handleApprove}
                        onReject={() => setIsRejectOpen(true)}
                    />
                </div>
            </div>

            <RejectDialog
                open={isRejectOpen}
                isSubmitting={isModerating}
                onClose={() => setIsRejectOpen(false)}
                onConfirm={handleReject}
            />
        </>
    );
};

const DetailContent = () => {
    const t = useTranslations("promptModeration.detail");
    const { detail, isLoading, isError } = useModerationDetail();

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app rounded-xl p-6">
                <Link
                    href="/content-manager/prompt-moderation"
                    className="text-text-muted hover:text-text-primary inline-flex items-center gap-2 text-sm font-medium"
                >
                    <ArrowBackIcon fontSize="small" />
                    {t("back")}
                </Link>

                {!isLoading && !isError && detail && (
                    <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {t("heading", { id: detail.id })}
                            </h1>
                            <p className="text-text-muted mt-1 text-sm">
                                {t("subtitle")}
                            </p>
                        </div>
                        <ModerationStatusBadge status={detail.status} />
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <CircularProgress
                        sx={{ color: "var(--color-bgc-highlight)" }}
                    />
                </div>
            ) : isError || !detail ? (
                <div className="bg-bgc-app text-text-muted rounded-xl p-10 text-center">
                    {t("notFound")}
                </div>
            ) : (
                <ReviewForm key={detail.id} initial={detail} />
            )}
        </div>
    );
};

const PromptModerationDetail = ({ id }: { id: string }) => {
    return (
        <ModerationDetailProvider id={id}>
            <DetailContent />
        </ModerationDetailProvider>
    );
};

export default PromptModerationDetail;
