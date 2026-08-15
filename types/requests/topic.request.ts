import { TopicStatus } from "../enums/topic.enum";

export interface TopicQueryRequest {
    readonly page?: number;
    readonly size?: number;
    readonly keyword?: string;
    readonly status?: TopicStatus | "ALL";
    readonly sortDirection?: "ASC" | "DESC";
}

export interface UpdateTopicRequest {
    readonly japaneseName: string;
    readonly japaneseDescription?: string;
    readonly vietnameseDescription?: string;
    readonly englishDescription?: string;
    readonly status: TopicStatus;
    readonly coverImageFileId?: number | null;
}
