"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { SubscriptionPlanResponse } from "@/types/responses/subscription.response";

export interface UpgradeTargetUser {
    userId: number;
    currentPlanCode: string;
}

interface SubscriptionModalContextValue {
    lookupUserId: number | null;
    setLookupUserId: (id: number | null) => void;
    upgradeTargetUser: UpgradeTargetUser | null;
    openUpgradeModal: (user: UpgradeTargetUser) => void;
    closeUpgradeModal: () => void;
    editingPlan: SubscriptionPlanResponse | null;
    openEditPlanModal: (plan: SubscriptionPlanResponse) => void;
    closeEditPlanModal: () => void;
}

const SubscriptionModalContext = createContext<SubscriptionModalContextValue | null>(null);

export function useSubscriptionModal(): SubscriptionModalContextValue {
    const ctx = useContext(SubscriptionModalContext);
    if (!ctx) {
        throw new Error(
            "useSubscriptionModal must be used within <SubscriptionModalProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

export function SubscriptionModalProvider({ children }: Props) {
    const [lookupUserId, setLookupUserId] = useState<number | null>(null);
    const [upgradeTargetUser, setUpgradeTargetUser] = useState<UpgradeTargetUser | null>(null);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlanResponse | null>(null);

    const openUpgradeModal = (user: UpgradeTargetUser) => setUpgradeTargetUser(user);
    const closeUpgradeModal = () => setUpgradeTargetUser(null);

    const openEditPlanModal = (plan: SubscriptionPlanResponse) => setEditingPlan(plan);
    const closeEditPlanModal = () => setEditingPlan(null);

    return (
        <SubscriptionModalContext.Provider
            value={{
                lookupUserId,
                setLookupUserId,
                upgradeTargetUser,
                openUpgradeModal,
                closeUpgradeModal,
                editingPlan,
                openEditPlanModal,
                closeEditPlanModal,
            }}
        >
            {children}
        </SubscriptionModalContext.Provider>
    );
}

