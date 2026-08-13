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
    maxConcurrentAiSessionCount?: number;
    maxTurnsPerAiSession?: number;
    dailyAiSessionEvaluationLimit?: number;
    maxAiTurnSpeakingSeconds?: number;
    sampleAnswerEnabled?: boolean;
    status?: string;
}

