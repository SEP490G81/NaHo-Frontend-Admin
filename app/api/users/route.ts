import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const backendUrl = new URL(`${process.env.API_URL}/users`);
    request.nextUrl.searchParams.forEach((value, key) => {
        backendUrl.searchParams.set(key, value);
    });

    const backendResponse = await fetch(backendUrl.toString(), {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const result = await backendResponse.json();
    return NextResponse.json(result, { status: backendResponse.status });
}
