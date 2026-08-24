"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";

export const LAST_NON_SETTINGS_KEY = "naho_last_non_settings_path";
export const DEFAULT_FALLBACK_PATH = "/users";

/**
 * Custom hook xử lý logic quay lại trang trước đó ngoài màn hình Settings.
 * Tự động ghi nhớ trang trước đó và điều hướng thoát khỏi Settings khi ấn Back.
 */
export function useSettingsBack() {
    const pathname = usePathname();
    const router = useRouter();
    const [backPath, setBackPath] = useState<string>(DEFAULT_FALLBACK_PATH);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedPath = sessionStorage.getItem(LAST_NON_SETTINGS_KEY);
            if (savedPath && !savedPath.startsWith("/settings")) {
                setBackPath(savedPath);
            }
        }
    }, [pathname]);

    const handleBack = () => {
        let target = DEFAULT_FALLBACK_PATH;
        if (typeof window !== "undefined") {
            const savedPath = sessionStorage.getItem(LAST_NON_SETTINGS_KEY);
            if (savedPath && !savedPath.startsWith("/settings")) {
                target = savedPath;
            }
        }
        router.push(target as AllRoute);
    };

    return {
        handleBack,
        backPath,
    };
}
