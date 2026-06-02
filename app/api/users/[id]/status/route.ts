import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mockUpdateStatusResponse } from "@/app/api/_mock/user.mock";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const body = await request.json();

    try {
        const response = await fetch(
            `${process.env.API_URL}/api/v1/users/${id}/status`,
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
    } catch {
        // TODO: remove mock fallback when BE ready
        return mockUpdateStatusResponse();
    }
}
