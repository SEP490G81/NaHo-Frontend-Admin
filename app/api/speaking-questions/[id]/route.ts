import { proxyGet, proxyPutJson } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/speaking-questions/${resolvedParams.id}`);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    return proxyPutJson(`/speaking-questions/${resolvedParams.id}`, request);
}
