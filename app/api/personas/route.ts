import { proxyGet, proxyPostJson } from "@/services/server/backend.proxy";

export async function GET() {
    return proxyGet("/personas");
}

export async function POST(request: Request) {
    return proxyPostJson("/personas", request);
}
