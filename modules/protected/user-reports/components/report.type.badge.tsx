import React from "react";
import { useTranslations } from "next-intl";
import { ReportType } from "@/types/enums/report.enum";
import {
    REPORT_TYPE_STYLE,
    TYPE_KEY,
} from "../constants/user.reports.constant";

const ReportTypeBadge = ({ type }: { type: ReportType }) => {
    const t = useTranslations("userReports.type");

    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${REPORT_TYPE_STYLE[type]}`}
        >
            {t(TYPE_KEY[type])}
        </span>
    );
};

export default ReportTypeBadge;
