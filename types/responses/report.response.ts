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
    device: ReportDeviceInfo;
}
