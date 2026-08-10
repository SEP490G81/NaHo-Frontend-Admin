import { SortDirection, UserSortColumn } from "@/types/enums/user.enum";
import { UserFilterState } from "@/modules/protected/users/types/user.table.type";

export const PAGE_SIZE_OPTIONS = [20, 50, 100] as const;

export const DEFAULT_FILTER: UserFilterState = {
    page: 0,
    size: 20,
    sortColumn: UserSortColumn.ID,
    sortDirection: SortDirection.ASC,
    searchKeyword: "",
    gender: null,
    status: null,
    isEmailVerified: null,
    roleId: null,
    dobFrom: "",
    dobTo: "",
};

/** Map role name → role id (giả định khớp với DB seed). */
export const ROLE_ID_MAP: Record<string, number> = {
    LEARNER: 2,
    CONTENT_MANAGER: 3,
    ADMIN: 1,
};
