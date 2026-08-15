import { TopicStatus } from "../enums/topic.enum";

export interface TopicResponse {
    readonly id: number;
    readonly userId: number;
    readonly bookId: number;
    readonly coverImageFileId?: number | null;
    readonly japaneseName: string;
    readonly japaneseDescription: string;
    readonly vietnameseDescription: string;
    readonly englishDescription: string;
    readonly japaneseNameMarkup?: string;
    readonly japaneseDescriptionMarkup?: string;
    readonly status: TopicStatus;
    readonly orderIndex: number;
    readonly firstNodeGlobalOrderIndex: number;
    readonly lastNodeGlobalOrderIndex: number;
}
