"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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

    const openUpgradeModal = (user: UpgradeTargetUser) => setUpgradeTargetUser(user);
    const closeUpgradeModal = () => setUpgradeTargetUser(null);

    return (
        <SubscriptionModalContext.Provider
            value={{
                lookupUserId,
                setLookupUserId,
                upgradeTargetUser,
                openUpgradeModal,
                closeUpgradeModal,
            }}
        >
            {children}
        </SubscriptionModalContext.Provider>
    );
}
