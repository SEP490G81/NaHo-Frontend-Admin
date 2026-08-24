import { proxyPostForm } from "@/services/server/backend.proxy";

export async function POST(request: Request) {
    return proxyPostForm("/books/import", request);
}
