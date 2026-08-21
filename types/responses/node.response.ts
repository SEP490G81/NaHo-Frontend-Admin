export interface LearningPathNodeListItemResponse {
    id: number;
    objectiveId: number;
    speakingQuestionId?: number;
    vocabularyQuestionId?: number;
    chestId?: number;
    globalOrderIndex: number;
    orderIndex: number;
    nodeType: string;
}
