import { NextResponse } from "next/server";

export async function GET() {
    const backendResponse = await fetch(`${process.env.API_URL}/roles`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const result = await backendResponse.json();
    return NextResponse.json(result, { status: backendResponse.status });
}
