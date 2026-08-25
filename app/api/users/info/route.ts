import { proxyPatchJson } from "@/services/server/backend.proxy";

export async function PATCH(request: Request) {
    return proxyPatchJson("/users/info", request);
}
