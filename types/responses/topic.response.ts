import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";

export interface VocabItem {
    jp: string;
    furigana: string;
    vi: string;
    en?: string;
}

export interface SentenceItem {
    jp: string;
    vi: string;
    en?: string;
}

export interface QuestionResponse {
    id: string;
    jp: string;
    furigana: string;
    vi: string;
    audioUrl?: string;
    vocab: VocabItem[];
    sentences: SentenceItem[];
    contextHintJp: string;
    contextHintVi: string;
}

export interface TopicResponse {
    id: string;
    name: string;
    jlptLevel: JlptLevel;
    description: string;
    coverImageUrl?: string;
    status: TopicStatus;
    orderIndex: number;
    questionCount: number;
    averageScore: number;
}

export interface TopicDetailResponse extends TopicResponse {
    questions: QuestionResponse[];
}

export interface FuriganaTokenItem {
    text: string;
    reading: string;
}

export interface TokenizeResponse {
    furigana: string;
    tokens: FuriganaTokenItem[];
}
