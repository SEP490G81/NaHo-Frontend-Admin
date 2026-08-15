import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ bookId: string }> }
) {
    const resolvedParams = await params;
    return proxyGet(`/topics/books/${resolvedParams.bookId}`);
}
