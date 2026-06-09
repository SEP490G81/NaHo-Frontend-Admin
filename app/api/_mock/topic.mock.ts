import { NextResponse } from "next/server";
import { MOCK_TOPICS } from "@/app/api/_mock/topic.data";

const buildMeta = (totalElements: number) => ({
    traceId: "mock",
    timestamp: new Date().toISOString(),
    pageMeta: { currentPage: 1, pageSize: 12, totalPages: 1, totalElements },
});

const toListItem = ({ questions, ...rest }: (typeof MOCK_TOPICS)[number]) => ({
    ...rest,
    questionCount: questions.length,
});

export const mockTopicsResponse = (searchParams: URLSearchParams) => {
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const level = searchParams.get("level");
    const status = searchParams.get("status");

    const filtered = MOCK_TOPICS.filter((topic) => {
        if (level && topic.jlptLevel !== level) return false;
        if (status && topic.status !== status) return false;
        if (search) {
            const haystack = `${topic.name} ${topic.description}`.toLowerCase();
            if (!haystack.includes(search)) return false;
        }
        return true;
    }).map(toListItem);

    return NextResponse.json({
        meta: buildMeta(filtered.length),
        message: "OK (mock)",
        data: filtered,
    });
};

export const mockTopicDetailResponse = (id: string) => {
    const detail = MOCK_TOPICS.find((topic) => topic.id === id);
    if (!detail) {
        return NextResponse.json(
            { meta: buildMeta(0), message: "Topic not found (mock)", data: null },
            { status: 404 },
        );
    }
    return NextResponse.json({
        meta: buildMeta(1),
        message: "OK (mock)",
        data: detail,
    });
};

export const mockOkResponse = () =>
    NextResponse.json({ meta: buildMeta(0), message: "OK (mock)", data: null });
