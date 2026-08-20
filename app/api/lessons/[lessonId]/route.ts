import { proxyPutJson } from "@/services/server/backend.proxy";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ lessonId: string }> }
) {
    const resolvedParams = await params;
    return proxyPutJson(`/lessons/${resolvedParams.lessonId}`, request);
}
