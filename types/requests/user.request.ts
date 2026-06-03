import { UserStatus } from "@/types/enums/user.enum";

export interface UpdateUserStatusRequest {
    newStatus: UserStatus;
}
