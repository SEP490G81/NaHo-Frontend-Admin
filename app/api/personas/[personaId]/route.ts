import { proxyGet, proxyPutJson } from "@/services/server/backend.proxy";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ personaId: string }> },
) {
    const { personaId } = await params;
    return proxyGet(`/personas/${personaId}`);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ personaId: string }> },
) {
    const { personaId } = await params;
    return proxyPutJson(`/personas/${personaId}`, request);
}
