import { proxyGet, proxyPutJson } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ objectiveId: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/objectives/${resolvedParams.objectiveId}`);
}
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ objectiveId: string }> }
) {
    const resolvedParams = await params;
    return proxyPutJson(`/objectives/${resolvedParams.objectiveId}`, request);
}
