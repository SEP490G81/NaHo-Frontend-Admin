import { proxyGet, proxyPutJson } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ bookId: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/books/${resolvedParams.bookId}`);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ bookId: string }> }
) {
    const resolvedParams = await params;
    return proxyPutJson(`/books/${resolvedParams.bookId}`, request);
}
