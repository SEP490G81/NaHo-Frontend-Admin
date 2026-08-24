import { Messages } from "next-intl";

export type MetadataTitleKey = keyof Messages["common"]["metadata"]["title"];

export type AllRoute =
    | "/"
    | "/home"
    | "/dashboard"
    | "/users"
    | "/login"
    | "/introduction"
    | "/forgot-password"
    | "/register"
    | "/verify-email"
    | "/topics"
    | "/lessons"
    | "/objectives"
    | "/books"
    | `/books/${string}` // "/books/[bookId]"
    | `/books/${string}/topics` // "/books/[bookId]/topics"
    | `/books/${string}/topics/${string}/lessons` // "/books/[bookId]/topics/[topicId]/lessons"
    | `/books/${string}/topics/${string}/lessons/${string}/objectives` // "/books/[bookId]/topics/[topicId]/lessons/[lessonId]/objectives"
    | "/sandbox"
    | `/sandbox/${string}` // hoặc "/sandbox/[questionId]"
    | "/speaking-history"
    | `/speaking-history/${string}` // hoặc "/speaking-history/[historyId]"
    | "/point-history"
    | "/dialogue-setup"
    | "/live-chatroom"
    | "/leaderboard"
    | "/speaking-result"
    | "/settings"
    | "/settings/account"
    | "/settings/security"
    | "/settings/billing"
    | "/orders"
    | "/reports"
    | "/content-reports"
    | "/subscription-plans"
    | "/cost-service-management"
    | "/personas"
    | "/dialogue-setup"
    | "/get-help"
    | "/features"
    | "/learner-feedback"
    | "/frequently-questions"
    | "/terms"
    | "/privacy";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
export type AnchorRoute = `${StaticRoute}#${string}`;
