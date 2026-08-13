import {
    AuthProviderName,
    Gender,
    OAuthProviderName,
    RoleName,
    UserStatus,
} from "@/types/enums/user.enum";

export interface PointSummaryResult {
    id: number;
    totalPoint: number;
}

export interface RoleResponse {
    id: number;
    roleName: RoleName;
    description: string | null;
}

export type RoleResult = RoleResponse;

export interface AuthProviderResponse {
    id: number;
    providerName: AuthProviderName | OAuthProviderName;
    avatarUrl: string | null;
}

export type OAuthProviderResult = AuthProviderResponse;
export type OAuthProviderResponse = AuthProviderResponse;

export interface UserResponse {
    id: number;
    role: RoleResponse;
    authProviders: AuthProviderResponse[];
    avatarUrl: string | null;
    userLearningProgressId: number | null;
    username: string;
    email: string;
    fullName: string | null;
    gender: Gender | null;
    dob: string | null;
    status: UserStatus;
    isEmailVerified: boolean;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
}

export interface TokenResponse {
    value: string;
    expiresAt: string;
    expiresIn: number;
}

export interface ResetPasswordTokenResponse {
    resetToken: string;
}

export interface TokenExpResponse {
    expiresAt: string;
    expiresIn: number;
}

export interface LeaderboardUserResponse {
    id: number;
    leagueId: number | null;
    rank: number | null;
    fullName: string | null;
    avatarUrl: string | null;
    authAvatarUrl: string[];
    totalPoint: number;
}

export interface UserLearningProgressResponse {
    id: number;
    farthestAvailableNodeId: number | null;
    farthestAvailableNodeGlobalOrderIndex: number | null;
    lastLearningNodeId: number | null;
    lastLearningNodeGlobalOrderIndex: number | null;
    lastLearningAt: string | null;
    currentStreak: number;
    longestStreak: number;
    totalPoint: number;
    leaderboardUser: LeaderboardUserResponse | null;
}
