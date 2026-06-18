import { ModerationStatus } from "@/types/enums/moderation.enum";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";

export interface ModerationFilters {
    search: string;
    status: "all" | ModerationStatus;
}

export interface PromptModerationContextType {
    questions: CustomQuestionResponse[];
    totalCount: number;
    pendingCount: number;
    statusCounts: Record<ModerationStatus, number>;
    filters: ModerationFilters;
    isLoading: boolean;
    isFiltered: boolean;
    setFilters: (partial: Partial<ModerationFilters>) => void;
    resetFilters: () => void;
    toggleStatusFilter: (status: ModerationStatus) => void;
}
