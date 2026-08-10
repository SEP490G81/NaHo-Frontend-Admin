import { SortDirection, UserSortColumn } from "@/types/enums/user.enum";

/** Client-side sort state cho cột bảng (sort FE-side trong 1 trang). */
export type FeSortColumn =
    | "stt"
    | "email"
    | "username"
    | "fullName"
    | "role"
    | "emailVerified";

export interface FeSort {
    column: FeSortColumn | null;
    direction: "asc" | "desc";
}

/** State tổng hợp cho bộ lọc + phân trang (gửi lên BE). */
export interface UserFilterState {
    page: number;
    size: number;
    sortColumn: UserSortColumn;
    sortDirection: SortDirection;
    searchKeyword: string;
    gender: string | null;
    status: string | null;
    isEmailVerified: boolean | null;
    roleId: number | null;
    dobFrom: string;
    dobTo: string;
}
