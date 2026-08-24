import { proxyPutJson, proxyGet } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ lessonId: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/lessons/${resolvedParams.lessonId}`);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ lessonId: string }> }
) {
    const resolvedParams = await params;
    return proxyPutJson(`/lessons/${resolvedParams.lessonId}`, request);
}
