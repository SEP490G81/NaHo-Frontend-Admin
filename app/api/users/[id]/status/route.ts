import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const body = await request.json();

    const response = await fetch(
        `${process.env.API_URL}/users/${id}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
            body: JSON.stringify(body),
        },
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}
