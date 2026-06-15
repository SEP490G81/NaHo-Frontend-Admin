import React from "react";
import { getInitials } from "../utils/report.format";

const ReportSenderCell = ({
    name,
    email,
}: {
    name: string;
    email: string;
}) => {
    return (
        <div className="flex items-center gap-3">
            <span className="bg-bgc-highlight text-text-contrast flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {getInitials(name)}
            </span>
            <div className="min-w-0">
                <p className="truncate font-medium">{name}</p>
                <p className="text-text-muted truncate text-xs">{email}</p>
            </div>
        </div>
    );
};

export default ReportSenderCell;
