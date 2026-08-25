import { UserResponse } from "@/types/responses/user.response";
import { ApiResponse } from "@/types/responses/base.response";
import { cache } from "react";
import { redirect } from "next/navigation";
import { serverFetch } from "@/services/server/server.fetch";

// cache() function use to cache the result in a request
export const getCurrentUser = cache(async (): Promise<UserResponse | null> => {
    try {
        const backendResponse = await serverFetch("/users/me", {
            method: "GET",
        });

        if (!backendResponse.ok) {
            redirect("/login");
        }

        const result = await backendResponse.json();
        return (result as ApiResponse<UserResponse>).data;
    } catch {
        return null;
    }
});
