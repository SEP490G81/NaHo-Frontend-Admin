import { TopicStatus } from "../enums/topic.enum";
import { ObjectiveResponse } from "./objective.response";

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
    objectives?: ObjectiveResponse[];
}
