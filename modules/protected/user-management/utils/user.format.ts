import { UserResponse } from "@/types/responses/user.response";

export const getUserFullName = (user: Pick<UserResponse, "firstName" | "lastName">): string => {
    return `${user.lastName} ${user.firstName}`.trim();
};
