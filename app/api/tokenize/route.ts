import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mockTokenizeResponse } from "@/app/api/_mock/tokenize.mock";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const body = await request.json();
    const text = String(body?.text ?? "");

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/tokenize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        // TODO: remove mock fallback when BE ready
        return mockTokenizeResponse(text);
    }
}
