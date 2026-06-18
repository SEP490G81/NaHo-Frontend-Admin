import { DashboardOverviewResponse } from "@/types/responses/dashboard.response";
import { buildDashboardOverview } from "@/services/client/dashboard.mock.store";

// MOCK: composed from a static analytics mock + the live report/notification
// stores (dashboard.mock.store). TODO: when BE is ready, swap the body for
// fetch("/api/dashboard/overview") via a proxy route, returning result.data
// and throwing ProblemDetail.detail on !ok — like user.service.ts.
export async function fetchDashboardOverview(): Promise<DashboardOverviewResponse> {
    return buildDashboardOverview();
}
