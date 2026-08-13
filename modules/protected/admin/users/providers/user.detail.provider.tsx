"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserResponse } from "@/types/responses/user.response";

interface UserDetailContextValue {
    selectedUser: UserResponse | null;
    openDetail: (user: UserResponse) => void;
    closeDetail: () => void;
}

const UserDetailContext = createContext<UserDetailContextValue | null>(null);

/**
 * Custom hook to consume the UserDetailContext.
 */
export function useUserDetailModal(): UserDetailContextValue {
    const ctx = useContext(UserDetailContext);
    if (!ctx) {
        throw new Error(
            "useUserDetailModal must be used within a <UserDetailProvider>",
        );
    }
    return ctx;
}

interface UserDetailProviderProps {
    children: ReactNode;
}

/**
 * Provider to manage open/closed state of the User Details modal across the module.
 */
export function UserDetailProvider({
    children,
}: Readonly<UserDetailProviderProps>) {
    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

    const openDetail = (user: UserResponse) => setSelectedUser(user);
    const closeDetail = () => setSelectedUser(null);

    return (
        <UserDetailContext.Provider
            value={{ selectedUser, openDetail, closeDetail }}
        >
            {children}
        </UserDetailContext.Provider>
    );
}
