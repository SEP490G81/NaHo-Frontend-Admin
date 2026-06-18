import {
    QuestionResponse,
    SentenceItem,
    TopicDetailResponse,
    VocabItem,
} from "@/types/responses/topic.response";

export type QuestionTab = "content" | "vocab" | "context";

export interface QuestionDraft {
    jp: string;
    furigana: string;
    vi: string;
    audioName: string;
    vocab: VocabItem[];
    sentences: SentenceItem[];
    contextHintJp: string;
    contextHintVi: string;
}

export interface TopicQuestionsContextType {
    topic: TopicDetailResponse | null;
    isLoading: boolean;
    isSaving: boolean;
    isTokenizing: boolean;
    questions: QuestionResponse[];
    selectedId: string | null;
    activeTab: QuestionTab;
    draft: QuestionDraft;
    selectQuestion: (id: string) => void;
    startCreate: () => void;
    setActiveTab: (tab: QuestionTab) => void;
    setDraftField: (partial: Partial<QuestionDraft>) => void;
    setAudioName: (name: string) => void;
    addVocab: () => void;
    updateVocab: (index: number, partial: Partial<VocabItem>) => void;
    removeVocab: (index: number) => void;
    addSentence: () => void;
    updateSentence: (index: number, partial: Partial<SentenceItem>) => void;
    removeSentence: (index: number) => void;
    generateFurigana: () => void;
    save: () => void;
    deleteQuestion: (id: string) => void;
    reorderQuestions: (fromId: string, toId: string) => void;
}
