import { NextResponse } from "next/server";

const MOCK_USERS = [
    {
        id: 1,
        firstName: "An",
        lastName: "Nguyễn Văn",
        email: "an.nguyen@naho.dev",
        accountType: "LEARNER",
        jlptLevel: "N3",
        status: "ACTIVE",
        currentStreak: 12,
    },
    {
        id: 2,
        firstName: "Bích",
        lastName: "Trần Thị",
        email: "bich.tran@naho.dev",
        accountType: "TEACHER",
        jlptLevel: "N1",
        status: "BANNED",
        currentStreak: 0,
    },
];

const MOCK_USER_DETAILS: Record<number, object> = {
    1: {
        ...MOCK_USERS[0],
        totalPracticeMinutes: 480,
        sessionsThisWeek: 5,
        streakLogs: [true, true, false, true, true, true, false],
        skills: { pronunciation: 75, vocabulary: 60, grammar: 80, naturalness: 65 },
    },
    2: {
        ...MOCK_USERS[1],
        totalPracticeMinutes: 1200,
        sessionsThisWeek: 0,
        streakLogs: [false, false, false, false, false, false, false],
        skills: { pronunciation: 90, vocabulary: 95, grammar: 92, naturalness: 88 },
    },
};

const MOCK_ROLES = [
    { code: "LEARNER", name: "Học viên" },
    { code: "TEACHER", name: "Giảng viên" },
];

const MOCK_LEVELS = [
    { code: "N5", name: "N5 - Sơ cấp" },
    { code: "N4", name: "N4 - Sơ trung cấp" },
    { code: "N3", name: "N3 - Trung cấp" },
    { code: "N2", name: "N2 - Trung cao cấp" },
    { code: "N1", name: "N1 - Cao cấp" },
];

const buildMeta = (totalElements: number) => ({
    traceId: "mock",
    timestamp: new Date().toISOString(),
    pageMeta: { currentPage: 1, pageSize: 10, totalPages: 1, totalElements },
});

export const mockUsersResponse = (searchParams: URLSearchParams) => {
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const role = searchParams.get("role");
    const level = searchParams.get("level");
    const status = searchParams.get("status");

    const filtered = MOCK_USERS.filter((u) => {
        if (role && u.accountType !== role) return false;
        if (level && u.jlptLevel !== level) return false;
        if (status && u.status !== status) return false;
        if (search) {
            const fullName = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase();
            if (!fullName.includes(search)) return false;
        }
        return true;
    });

    return NextResponse.json({
        meta: buildMeta(filtered.length),
        message: "OK (mock)",
        data: filtered,
    });
};

export const mockUserDetailResponse = (id: number) => {
    const detail = MOCK_USER_DETAILS[id];
    if (!detail) {
        return NextResponse.json(
            { meta: buildMeta(0), message: "User not found (mock)", data: null },
            { status: 404 },
        );
    }
    return NextResponse.json({ meta: buildMeta(1), message: "OK (mock)", data: detail });
};

export const mockUpdateStatusResponse = () =>
    NextResponse.json({ meta: buildMeta(0), message: "OK (mock)", data: null });

export const mockRolesResponse = () =>
    NextResponse.json({
        meta: buildMeta(MOCK_ROLES.length),
        message: "OK (mock)",
        data: MOCK_ROLES,
    });

export const mockLevelsResponse = () =>
    NextResponse.json({
        meta: buildMeta(MOCK_LEVELS.length),
        message: "OK (mock)",
        data: MOCK_LEVELS,
    });
