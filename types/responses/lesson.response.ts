import { TopicStatus } from "../enums/topic.enum";

export interface LessonResponse {
    id: number;
    japaneseName: string;
    japaneseDescription?: string;
    japaneseNameMarkup?: string;
    japaneseDescriptionMarkup?: string;
    status: TopicStatus;
    orderIndex?: number;
    firstNodeGlobalOrderIndex?: number;
    lastNodeGlobalOrderIndex?: number;
}

export interface LessonDetailResponse extends LessonResponse {
    objectives?: any[]; // Keep it any[] or define ObjectiveResponse if needed
}
