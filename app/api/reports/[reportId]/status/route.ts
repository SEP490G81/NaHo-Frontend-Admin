import { proxyPatchJson } from "@/services/server/backend.proxy";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ reportId: string }> },
) {
    const { reportId } = await params;
    return proxyPatchJson(`/reports/${reportId}/status`, request);
}
