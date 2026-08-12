import { proxyPostJson } from "@/services/server/backend.proxy";

export async function POST(request: Request) {
    return proxyPostJson("/payments/admin/upgrade-subscription", request);
}
