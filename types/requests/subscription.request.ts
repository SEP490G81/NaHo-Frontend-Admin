export interface UpgradeSubscriptionRequest {
    userId: number;
    planCode: string;
    durationDays: number;
}

export interface UpdateSubscriptionPlanRequest {
    description?: string;
    tier?: string;
    priceAmount?: number;
    priceCurrency?: string;
    durationDays?: number | null;
    dailySpeakingQuestionEvaluationLimit?: number;
    maxSpeakingQuestionRecordingSeconds?: number;
    maxTurnsPerAiSession?: number;
    dailyAiSessionStartLimit?: number;
    maxAiTurnSpeakingSeconds?: number;
    maxInProgressSessionCount?: number;
    sampleAnswerEnabled?: boolean;
    status?: string;
}
