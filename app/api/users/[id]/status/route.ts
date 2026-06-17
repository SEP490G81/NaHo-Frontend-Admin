import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await request.json();

    const backendResponse = await fetch(
        `${process.env.API_URL}/users/${id}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    );
    const result = await backendResponse.json();
    return NextResponse.json(result, { status: backendResponse.status });
}
