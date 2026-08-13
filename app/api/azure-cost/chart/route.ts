import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(request: NextRequest) {
    return proxyGet("/admin/azure-cost/chart", request.nextUrl.searchParams);
}
