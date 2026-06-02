import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mockUserDetailResponse } from "@/app/api/_mock/user.mock";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/users/${id}`, {
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
        return mockUserDetailResponse(Number(id));
    }
}
