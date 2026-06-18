import React from "react";
import { JlptLevel } from "@/types/enums/user.enum";

interface TopicLevelBadgeProps {
    level: JlptLevel;
}

const TopicLevelBadge = ({ level }: TopicLevelBadgeProps) => {
    return (
        <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-sm">
            {level}
        </span>
    );
};

export default TopicLevelBadge;
