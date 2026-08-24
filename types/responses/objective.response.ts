import { TopicStatus } from "../enums/topic.enum";
import { LearningPathNodeListItemResponse } from "./node.response";

export interface ObjectiveResponse {
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

export interface ObjectiveDetailResponse extends ObjectiveResponse {
    learningPathNodes?: LearningPathNodeListItemResponse[];
}
