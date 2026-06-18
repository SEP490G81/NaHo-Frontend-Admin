import React from "react";
import { useTranslations } from "next-intl";
import { ReportStatus } from "@/types/enums/report.enum";
import {
    REPORT_STATUS_STYLE,
    STATUS_KEY,
} from "../constants/user.reports.constant";

const ReportStatusBadge = ({ status }: { status: ReportStatus }) => {
    const t = useTranslations("userReports.status");
    const key = STATUS_KEY[status] ?? "pending";
    const style = REPORT_STATUS_STYLE[status] ?? REPORT_STATUS_STYLE.PENDING;

    return (
        <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
        >
            {t(key)}
        </span>
    );
};

export default ReportStatusBadge;
