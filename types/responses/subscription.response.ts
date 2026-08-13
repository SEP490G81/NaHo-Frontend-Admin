import {
    SubscriptionStatus,
    SubscriptionTier,
} from "../enums/subscription.enum";

export interface SubscriptionPlanResponse {
    id: number;
    code: SubscriptionTier | string;
    description: string;
    tier: SubscriptionTier | string;
    priceAmount: number;
    priceCurrency: string;
    durationDays: number | null;
    dailySpeakingQuestionEvaluationLimit: number;
    maxSpeakingQuestionRecordingSeconds: number;
    maxConcurrentAiSessionCount: number;
    maxTurnsPerAiSession: number;
    dailyAiSessionEvaluationLimit: number;
    maxAiTurnSpeakingSeconds: number;
    sampleAnswerEnabled: boolean;
    status: SubscriptionStatus | string;
}

export interface UserSubscriptionResponse {
    id: number;
    userId: number;
    subscriptionPlanId: number;
    paymentOrderId: number | null;
    status: SubscriptionStatus | string;
    startTime: string;
    endTime: string;
    subscriptionPlan: SubscriptionPlanResponse;
}
