import {
    Gender,
    SortDirection,
    UserSortColumn,
    UserStatus,
} from "@/types/enums/user.enum";

export interface UserQueryRequest {
    page?: number;
    size?: number;
    sortColumn?: UserSortColumn;
    sortDirection?: SortDirection;
    searchKeyword?: string | null;
    gender?: Gender | null;
    dobFrom?: string | null;
    dobTo?: string | null;
    status?: UserStatus | null;
    roleId?: number | null;
    isEmailVerified?: boolean | null;
}
