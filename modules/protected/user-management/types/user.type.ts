import { JlptLevel, UserStatus } from "@/types/enums/user.enum";
import { RoleResponse } from "@/types/responses/role.response";
import { UserResponse } from "@/types/responses/user.response";

export interface UserFilters {
    userNameOrEmail: string;
    role: "all" | string;
    jlptLevel: "all" | JlptLevel;
    status: "all" | UserStatus;
}

export interface UserManagementContextType {
    users: UserResponse[];
    totalCount: number;
    filters: UserFilters;
    isLoading: boolean;
    roleOptions: RoleResponse[];
    isDetailModalOpen: boolean;
    selectedUser: UserResponse | null;
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
