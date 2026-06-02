import { JlptLevel, UserStatus } from "@/types/enums/user.enum";
import { LevelResponse } from "@/types/responses/level.response";
import { RoleResponse } from "@/types/responses/role.response";
import {
    UserDetailResponse,
    UserResponse,
} from "@/types/responses/user.response";

export interface UserFilters {
    search: string;
    role: "all" | string;
    level: "all" | JlptLevel;
    status: "all" | UserStatus;
}

export interface UserManagementContextType {
    users: UserResponse[];
    totalCount: number;
    filters: UserFilters;
    isLoading: boolean;
    roleOptions: RoleResponse[];
    levelOptions: LevelResponse[];
    isDetailModalOpen: boolean;
    selectedUser: UserDetailResponse | null;
    isDetailLoading: boolean;
    confirmUser: UserResponse | null;
    setFilters: (partial: Partial<UserFilters>) => void;
    resetFilters: () => void;
    openDetail: (user: UserResponse) => void;
    closeDetail: () => void;
    openLockDialog: (user: UserResponse) => void;
    closeLockDialog: () => void;
    toggleLock: () => void;
}
