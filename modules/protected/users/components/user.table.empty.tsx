"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function UserTableEmpty() {
    const t = useTranslations("userManagement.table");

    return (
        <div className="text-text-muted flex items-center justify-center py-16 text-sm font-medium">
            {t("noData")}
        </div>
    );
}
