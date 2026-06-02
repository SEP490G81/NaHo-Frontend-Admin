import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mockRolesResponse } from "@/app/api/_mock/user.mock";

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/roles`, {
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
            cache: "no-store",
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return mockRolesResponse();
    }
}
