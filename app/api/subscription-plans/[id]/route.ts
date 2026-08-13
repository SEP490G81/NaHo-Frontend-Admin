import { proxyPutJson } from "@/services/server/backend.proxy";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPutJson(`/subscription-plans/${id}`, request);
}
