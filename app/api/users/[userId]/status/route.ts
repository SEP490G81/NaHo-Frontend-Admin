import { proxyPatchJson } from "@/services/server/backend.proxy";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ userId: string }> },
) {
    const { userId } = await params;
    return proxyPatchJson(`/users/${userId}/status`, request);
}
