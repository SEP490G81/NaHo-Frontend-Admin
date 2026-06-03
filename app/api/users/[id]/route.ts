import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${process.env.API_URL}/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}
