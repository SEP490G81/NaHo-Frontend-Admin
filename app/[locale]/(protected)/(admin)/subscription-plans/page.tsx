import { Metadata } from "next";
import SubscriptionManagementView from "@/modules/protected/admin/subscriptions/features/subscription.management.view";

export const metadata: Metadata = {
    title: "Quản lý Gói học & Nâng cấp | NaHo Admin",
    description:
        "Xem chi tiết các gói cước thành viên và nâng cấp gói học cho người dùng.",
};

export default function SubscriptionPlansPage() {
    return <SubscriptionManagementView />;
}
