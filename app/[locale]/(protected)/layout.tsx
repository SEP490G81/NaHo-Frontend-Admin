import React, { ReactNode } from "react";
import { SidebarCollapseProvider } from "@/layouts/sidebar/providers/sidebar.collapse.provider";
import AppSidebar from "@/layouts/sidebar/components/app.sidebar";
import AppHeader from "@/layouts/header/components/app.header";

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <SidebarCollapseProvider>
            <div className="relative flex">
                <AppSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <AppHeader />
                    <div className="bg-bgc-page w-full flex-1 p-5">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarCollapseProvider>
    );
};

export default ProtectedLayout;
