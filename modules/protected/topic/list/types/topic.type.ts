import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";
import { TopicResponse } from "@/types/responses/topic.response";

export interface TopicFilters {
    search: string;
    level: "all" | JlptLevel;
    status: "all" | TopicStatus;
}

export interface TopicManagementContextType {
    topics: TopicResponse[];
    totalCount: number;
    filters: TopicFilters;
    isLoading: boolean;
    confirmTopic: TopicResponse | null;
    isDeleting: boolean;
    isImportOpen: boolean;
    openImport: () => void;
    closeImport: () => void;
    setFilters: (partial: Partial<TopicFilters>) => void;
    resetFilters: () => void;
    openDeleteDialog: (topic: TopicResponse) => void;
    closeDeleteDialog: () => void;
    confirmDelete: () => void;
    reorder: (fromId: string, toId: string) => void;
}
