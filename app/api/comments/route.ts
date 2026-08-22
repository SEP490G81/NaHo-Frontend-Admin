import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    return proxyGet("/comments", searchParams);
}
