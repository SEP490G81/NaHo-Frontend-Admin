import { ReportStatus, ReportType } from "@/types/enums/report.enum";

/**
 * Browser & device fingerprint auto-captured (from `navigator`) when the
 * report was filed. Cheap to collect client-side, useful for reproducing
 * browser/OS-specific bugs.
 */
export interface ReportDeviceInfo {
    browser: string;
    browserVersion: string;
    os: string;
    /** e.g. "1920x1080" */
    screenSize: string;
    /** BCP-47 language tag, e.g. "vi-VN" */
    language: string;
}

/**
 * App-side context auto-captured when the report was filed — where in the app
 * the error happened. Lets an admin route/reproduce the bug.
 */
export interface ReportContext {
    /** Feature/screen the user was on, e.g. "Sandbox luyện nói" */
    feature: string;
    /** App route/path at the time, e.g. "/sandbox/speaking" */
    route: string;
    /** App build/version, e.g. "1.8.2 (build 2406)" */
    appVersion: string;
}

export interface ReportResponse {
    /** Human-facing report code, e.g. "BR-1001" */
    id: string;
    senderName: string;
    senderEmail: string;
    type: ReportType;
    /** Free-text description written by the user */
    description: string;
    status: ReportStatus;
    /** ISO timestamp the report was filed at */
    reportedAt: string;
    /** Optional screenshot the learner attached when filing the report */
    screenshotUrl?: string;
    /** Where in the app the error occurred (auto-captured) */
    context: ReportContext;
    device: ReportDeviceInfo;
}
