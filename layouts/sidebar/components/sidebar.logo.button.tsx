"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";

import { useCurrentUser } from "@/hooks/use.current.user";
import { RoleName } from "@/types/enums/user.enum";

const SidebarLogoButton = ({ children }: { children: React.ReactNode }) => {
    const { data: user } = useCurrentUser();
    const targetHref = user?.role?.roleName === RoleName.CONTENT_MANAGER ? "/books" : "/dashboard";

    return (
        <div className="flex items-center justify-center">
            <Link
                href={targetHref}
                className="flex items-center gap-x-3 select-none"
            >
                <Image
                    src={"/logo.png"}
                    alt="app-logo"
                    width={40}
                    height={40}
                />
                {children}
            </Link>
        </div>
    );
};

export default SidebarLogoButton;
