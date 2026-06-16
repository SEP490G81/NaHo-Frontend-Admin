import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    const backendResponse = await fetch(`${process.env.API_URL}/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const result = await backendResponse.json();
    return NextResponse.json(result, { status: backendResponse.status });
}
