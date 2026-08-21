import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/learning-path-nodes/${resolvedParams.id}`);
}
