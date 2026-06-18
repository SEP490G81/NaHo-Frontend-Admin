import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    mockOkResponse,
    mockTopicDetailResponse,
} from "@/app/api/_mock/topic.mock";

async function authHeader() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    return {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/topics/${id}`, {
            headers: await authHeader(),
            cache: "no-store",
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        // TODO: remove mock fallback when BE ready
        return mockTopicDetailResponse(id);
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await request.json();
    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/topics/${id}`, {
            method: "PUT",
            headers: await authHeader(),
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return mockOkResponse();
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/topics/${id}`, {
            method: "DELETE",
            headers: await authHeader(),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return mockOkResponse();
    }
}
