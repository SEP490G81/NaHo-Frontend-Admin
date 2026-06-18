const ReportType = Object.freeze({
    STT_RECORDING: "STT_RECORDING",
    KEIGO_TRANSLATION: "KEIGO_TRANSLATION",
    API_CONNECTION: "API_CONNECTION",
    OTHER: "OTHER",
});
export type ReportType = (typeof ReportType)[keyof typeof ReportType];

const ReportStatus = Object.freeze({
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    RESOLVED: "RESOLVED",
});
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
