import { Gender, JlptLevel, UserStatus } from "@/types/enums/user.enum";

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    roleNames: string[];
    fullName: string | null;
    gender: Gender | null;
    dob: string | null;
    avatarUrl: string | null;
    jlptLevel: JlptLevel;
    status: UserStatus;
}
