import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";

export const JLPT_LEVELS: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export const TOPIC_STATUSES: TopicStatus[] = ["DRAFT", "ACTIVE", "HIDDEN"];

/** Tailwind classes for the status chip, keyed by status */
export const TOPIC_STATUS_STYLE: Record<TopicStatus, string> = {
    DRAFT: "bg-amber-100 text-amber-700",
    ACTIVE: "bg-emerald-100 text-emerald-700",
    HIDDEN: "bg-gray-200 text-gray-600",
};

interface TopicLevelStyle {
    /** Tailwind gradient classes for the topic card cover */
    gradient: string;
    /** Emoji shown on the cover */
    emoji: string;
}

export const TOPIC_LEVEL_STYLE: Record<JlptLevel, TopicLevelStyle> = {
    N5: { gradient: "from-emerald-400 to-teal-500", emoji: "🌱" },
    N4: { gradient: "from-amber-400 to-orange-500", emoji: "🌸" },
    N3: { gradient: "from-sky-400 to-indigo-500", emoji: "💼" },
    N2: { gradient: "from-pink-400 to-rose-500", emoji: "🤝" },
    N1: { gradient: "from-violet-500 to-purple-600", emoji: "🎓" },
};

export const getTopicLevelStyle = (level: JlptLevel): TopicLevelStyle =>
    TOPIC_LEVEL_STYLE[level] ?? TOPIC_LEVEL_STYLE.N3;
