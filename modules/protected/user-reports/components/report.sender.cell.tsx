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
        <>
            <td className="w-12 py-3 pr-0 pl-1 align-middle">
                <span className="bg-bgc-highlight text-text-contrast flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {getInitials(name)}
                </span>
            </td>
            <td className="px-3 py-3">
                <p className="font-medium">{name}</p>
                <p className="text-text-muted text-xs">{email}</p>
            </td>
        </>
    );
};

export default ReportSenderCell;
