import { Gender, JlptLevel, UserStatus } from "@/types/enums/user.enum";

export interface UserResponse {
    id: number;
    username: string;
    roleNames: string[];
    avatarFileUrl: string | null;
    email: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    dob: string;
    jlptLevel: JlptLevel;
    status: UserStatus;
}
