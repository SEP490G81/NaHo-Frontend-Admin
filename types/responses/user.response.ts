import {
    AccountType,
    JlptLevel,
    UserStatus,
} from "@/types/enums/user.enum";

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accountType: AccountType;
    jlptLevel: JlptLevel;
    status: UserStatus;
    currentStreak: number;
}

interface UserSkillsResponse {
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    naturalness: number;
}

export interface UserDetailResponse extends UserResponse {
    totalPracticeMinutes: number;
    sessionsThisWeek: number;
    streakLogs: boolean[];
    skills: UserSkillsResponse;
}
