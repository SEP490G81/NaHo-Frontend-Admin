import { proxyPatchJson } from "@/services/server/backend.proxy";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ personaId: string }> },
) {
    const { personaId } = await params;
    return proxyPatchJson(`/personas/${personaId}/status`, request);
}
