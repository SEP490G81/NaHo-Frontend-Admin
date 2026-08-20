import { TopicStatus } from "../enums/topic.enum";

export interface UpdateLessonRequest {
    japaneseName: string;
    japaneseDescription?: string;
    status: TopicStatus;
}
