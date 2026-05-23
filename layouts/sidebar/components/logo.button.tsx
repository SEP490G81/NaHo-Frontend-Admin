"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSidebarCollapse } from "@/layouts/sidebar/providers/sidebar.collapse.provider";
import { Link } from "@/intl/i18n/navigation";

const LogoButton = () => {
    const { isCollapse } = useSidebarCollapse();
    const t = useTranslations();

    return (
        <div className="mb-3 flex items-center justify-center">
            <Link
                href={"/dashboard"}
                className="flex items-center gap-x-3 select-none"
            >
                <Image
                    src={"/logo.png"}
                    alt="app-logo"
                    width={40}
                    height={40}
                />
                {!isCollapse && (
                    <h1 className="text-lg font-bold whitespace-nowrap">
                        {t("appName")}
                    </h1>
                )}
            </Link>
        </div>
    );
};

export default LogoButton;
