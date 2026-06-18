import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";
import { TopicDetailResponse } from "@/types/responses/topic.response";

export interface TopicDetailForm {
    name: string;
    jlptLevel: JlptLevel;
    status: TopicStatus;
    description: string;
    coverImageName: string;
}

export interface TopicDetailContextType {
    topic: TopicDetailResponse | null;
    isLoading: boolean;
    isSaving: boolean;
    form: TopicDetailForm;
    setFormField: (partial: Partial<TopicDetailForm>) => void;
    save: () => void;
}
