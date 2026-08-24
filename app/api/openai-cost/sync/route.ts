import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

export async function POST(request: NextRequest) {
    return proxyPostJson("/admin/openai-cost/sync", request);
}
