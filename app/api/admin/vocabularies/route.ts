import { proxyGet, proxyPostJson } from "@/services/server/backend.proxy";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    return proxyGet("/vocabularies/search", searchParams);
}

export async function POST(request: Request) {
    return proxyPostJson("/vocabularies", request);
}
