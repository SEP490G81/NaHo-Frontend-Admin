import { QuestionResponse } from "@/types/responses/topic.response";
import { QuestionDraft } from "../types/topic.questions.type";

export const EMPTY_DRAFT: QuestionDraft = {
    jp: "",
    furigana: "",
    vi: "",
    audioName: "",
    vocab: [],
    sentences: [],
    contextHintJp: "",
    contextHintVi: "",
};

export const questionToDraft = (question: QuestionResponse): QuestionDraft => ({
    jp: question.jp,
    furigana: question.furigana,
    vi: question.vi,
    audioName: question.audioUrl ?? "",
    vocab: question.vocab.map((v) => ({ ...v })),
    sentences: question.sentences.map((s) => ({ ...s })),
    contextHintJp: question.contextHintJp,
    contextHintVi: question.contextHintVi,
});
