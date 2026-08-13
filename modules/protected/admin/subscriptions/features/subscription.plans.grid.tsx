"use client";

import React from "react";
import { useSubscriptionPlansQuery } from "../hooks/use.subscription.query";
import { SubscriptionPlanCard } from "../components/subscription.plan.card";
import { Skeleton } from "@mui/material";

export function SubscriptionPlansGrid() {
    const { data, isLoading } = useSubscriptionPlansQuery();
    const plans = data?.data || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} variant="rounded" height={420} className="rounded-3xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
                <SubscriptionPlanCard key={plan.id} plan={plan} />
            ))}
        </div>
    );
}
