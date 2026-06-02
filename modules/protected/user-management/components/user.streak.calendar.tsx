import React from "react";
import { useTranslations } from "next-intl";

interface UserStreakCalendarProps {
    streakLogs: boolean[];
    title: string;
}

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const UserStreakCalendar = ({ streakLogs, title }: UserStreakCalendarProps) => {
    const t = useTranslations("userManagement.detail.days");

    return (
        <div>
            <p className="mb-2 text-sm font-semibold">{title}</p>
            <div className="flex gap-2">
                {DAY_KEYS.map((key, i) => (
                    <div
                        key={key}
                        className={`flex h-12 w-12 flex-col items-center justify-center rounded-lg text-xs font-medium ${
                            streakLogs[i]
                                ? "bg-bgc-highlight text-white"
                                : "border border-bdc-primary text-text-muted"
                        }`}
                    >
                        <span>{t(key)}</span>
                        <span>{streakLogs[i] ? "✓" : "—"}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserStreakCalendar;
