import { proxyGet, proxyPutJson } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ topicId: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/topics/${resolvedParams.topicId}`);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ topicId: string }> }
) {
    const resolvedParams = await params;
    return proxyPutJson(`/topics/${resolvedParams.topicId}`, request);
}
