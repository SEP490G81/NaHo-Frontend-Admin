"use client";
import { useTranslations } from "next-intl";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TagIcon from "@mui/icons-material/Tag";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import { formatSubmittedDate, getInitials } from "../../utils/moderation.format";

const SubmitterCard = ({ detail }: { detail: CustomQuestionResponse }) => {
    const t = useTranslations("promptModeration.detail.submitter");

    return (
        <div className="bg-bgc-app space-y-4 rounded-xl p-6">
            <h3 className="text-text-muted text-xs font-semibold tracking-wider">
                {t("title")}
            </h3>
            <div className="flex items-center gap-3">
                <span className="bg-bgc-highlight/20 text-bgc-highlight flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold">
                    {getInitials(detail.submitterName)}
                </span>
                <div className="min-w-0">
                    <p className="truncate font-semibold">
                        {detail.submitterName}
                    </p>
                    <p className="text-text-muted flex items-center gap-1 truncate text-xs">
                        <EmailOutlinedIcon sx={{ fontSize: 14 }} />
                        {detail.submitterEmail}
                    </p>
                </div>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-text-muted flex items-center gap-1">
                        <TagIcon sx={{ fontSize: 16 }} />
                        {t("userId")}
                    </span>
                    <span className="font-medium">{detail.submitterUserId}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <span className="text-text-muted flex items-center gap-1">
                        <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />
                        {t("submittedAt")}
                    </span>
                    <span className="font-medium">
                        {formatSubmittedDate(detail.submittedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SubmitterCard;
