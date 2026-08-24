import { proxyPutJson, proxyDelete, proxyGet } from "@/services/server/backend.proxy";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return proxyGet(`/vocabularies/${id}`);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return proxyPutJson(`/vocabularies/${id}`, request);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return proxyDelete(`/vocabularies/${id}`);
}
