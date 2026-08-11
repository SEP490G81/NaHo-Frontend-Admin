import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> },
) {
    const { userId } = await params;
    return proxyGet(`/user-learning-progresses/${userId}`);
}
