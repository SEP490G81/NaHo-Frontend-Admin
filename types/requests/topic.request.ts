import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";
import { SentenceItem, VocabItem } from "@/types/responses/topic.response";

export interface CreateTopicRequest {
    name: string;
    jlptLevel: JlptLevel;
    status: TopicStatus;
    description: string;
    coverImageUrl?: string;
}

export interface UpdateTopicRequest {
    name: string;
    jlptLevel: JlptLevel;
    status: TopicStatus;
    description: string;
    coverImageUrl?: string;
}

export interface SaveQuestionRequest {
    id?: string;
    jp: string;
    furigana: string;
    vi: string;
    audioUrl?: string;
    vocab: VocabItem[];
    sentences: SentenceItem[];
    contextHintJp: string;
    contextHintVi: string;
}
