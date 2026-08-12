import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ userId: string }> },
) {
    const { userId } = await params;
    return proxyGet(`/users/${userId}`);
}
