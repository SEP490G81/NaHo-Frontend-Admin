import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { mockTopicsResponse } from "@/app/api/_mock/topic.mock";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const backendUrl = new URL(`${process.env.API_URL}/api/v1/topics`);
    request.nextUrl.searchParams.forEach((value, key) => {
        backendUrl.searchParams.set(key, value);
    });

    try {
        const response = await fetch(backendUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
            cache: "no-store",
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        // TODO: remove mock fallback when BE ready
        return mockTopicsResponse(request.nextUrl.searchParams);
    }
}
