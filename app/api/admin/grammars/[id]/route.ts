import { proxyPutJson, proxyDelete, proxyGet } from "@/services/server/backend.proxy";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return proxyGet(`/grammars/${id}`);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return proxyPutJson(`/grammars/${id}`, request);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return proxyDelete(`/grammars/${id}`);
}
