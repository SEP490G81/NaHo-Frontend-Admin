export interface CommentAuthorResponse {
    id: number;
    leagueId?: number | null;
    rank?: number | null;
    fullName: string;
    avatarUrl?: string | null;
    authAvatarUrl?: string[] | null;
    totalPoint?: number | null;
}

export interface CommentResponse {
    commentId: number;
    questionId: number;
    userInfo: CommentAuthorResponse | null;
    parentId?: number | null;
    content: string;
    createdTime: string;
    modifiedTime?: string | null;
    children?: CommentResponse[] | null;
}

export interface CommentListResponse {
    speakingQuestionId: number;
    comments: CommentResponse[];
}
