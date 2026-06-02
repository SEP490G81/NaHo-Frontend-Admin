"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useUserManagement } from "../providers/user.management.provider";

const UserFilterBar = () => {
    const t = useTranslations("userManagement.filter");
    const { filters, setFilters, resetFilters, roleOptions, levelOptions } = useUserManagement();

    const roleLabel = filters.role === "all"
        ? t("role.all")
        : (roleOptions.find((r) => r.code === filters.role)?.name ?? filters.role);
    const levelLabel = filters.level === "all" ? t("level.all") : filters.level;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <TextFieldCustom
                placeholder={t("searchPlaceholder")}
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                size="small"
                className="min-w-64 flex-1"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" className="text-text-muted" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Select
                size="small"
                value={filters.role}
                onChange={(e) => setFilters({ role: e.target.value as typeof filters.role })}
                renderValue={() => `${t("role.label")}: ${roleLabel}`}
                sx={{ minWidth: 170 }}
            >
                <MenuItem value="all">{t("role.all")}</MenuItem>
                {roleOptions.map((r) => (
                    <MenuItem key={r.code} value={r.code}>
                        {r.name}
                    </MenuItem>
                ))}
            </Select>
            <Select
                size="small"
                value={filters.level}
                onChange={(e) => setFilters({ level: e.target.value as typeof filters.level })}
                renderValue={() => `${t("level.label")}: ${levelLabel}`}
                sx={{ minWidth: 170 }}
            >
                <MenuItem value="all">{t("level.all")}</MenuItem>
                {levelOptions.map((lv) => (
                    <MenuItem key={lv.code} value={lv.code}>
                        {lv.code}
                    </MenuItem>
                ))}
            </Select>
            <Select
                size="small"
                value={filters.status}
                onChange={(e) => setFilters({ status: e.target.value as typeof filters.status })}
                renderValue={(v) =>
                    `${t("status.label")}: ${
                        v === "all" ? t("status.all") : v === "ACTIVE" ? t("status.active") : t("status.banned")
                    }`
                }
                sx={{ minWidth: 185 }}
            >
                <MenuItem value="all">{t("status.all")}</MenuItem>
                <MenuItem value="ACTIVE">{t("status.active")}</MenuItem>
                <MenuItem value="BANNED">{t("status.banned")}</MenuItem>
            </Select>
            <Button
                variant="text"
                onClick={resetFilters}
                sx={{ color: "text.primary", whiteSpace: "nowrap" }}
            >
                {t("clearFilter")}
            </Button>
        </div>
    );
};

export default UserFilterBar;
