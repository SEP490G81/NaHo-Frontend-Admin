import { TopicStatus } from "../enums/topic.enum";

export interface UpdateObjectiveRequest {
    japaneseName: string;
    japaneseDescription?: string;
    status: TopicStatus;
}
