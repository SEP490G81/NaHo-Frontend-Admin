const TopicStatus = Object.freeze({
    DRAFT: "DRAFT",
    ACTIVE: "ACTIVE",
    HIDDEN: "HIDDEN",
});
export type TopicStatus = (typeof TopicStatus)[keyof typeof TopicStatus];
