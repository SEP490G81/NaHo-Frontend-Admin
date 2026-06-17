"use client";
import { useTranslations } from "next-intl";
import { Button, CircularProgress, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useUserManagement } from "../providers/user.management.provider";
import { JLPT_LEVELS } from "../constants/user.constant";

const UserFilterBar = () => {
    const t = useTranslations("userManagement");
    const { filters, setFilters, resetFilters, roleOptions, isLoading } =
        useUserManagement();

    const visibleRoles = roleOptions.filter((r) => r.id !== "ADMIN");
    const translateRole = (code: string) => {
        if (code === "ADMIN") return t("roles.ADMIN");
        if (code === "LEARNER") return t("roles.LEARNER");
        if (code === "CONTENT_MANAGER") return t("roles.CONTENT_MANAGER");
        return code;
    };
    const roleLabel = filters.role === "all"
        ? t("filter.role.all")
        : translateRole(filters.role);
    const levelLabel = filters.jlptLevel === "all" ? t("filter.level.all") : filters.jlptLevel;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <TextFieldCustom
                placeholder={t("filter.searchPlaceholder")}
                value={filters.userNameOrEmail}
                onChange={(e) => setFilters({ userNameOrEmail: e.target.value })}
                size="small"
                className="min-w-64 flex-1"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                {isLoading ? (
                                    <CircularProgress
                                        size={16}
                                        sx={{ color: "var(--color-bgc-highlight)" }}
                                    />
                                ) : (
                                    <SearchIcon fontSize="small" className="text-text-muted" />
                                )}
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Select
                size="small"
                value={filters.role}
                onChange={(e) => setFilters({ role: e.target.value as typeof filters.role })}
                renderValue={() => `${t("filter.role.label")}: ${roleLabel}`}
                sx={{ minWidth: 170 }}
            >
                <MenuItem value="all">{t("filter.role.all")}</MenuItem>
                {visibleRoles.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                        {translateRole(r.id)}
                    </MenuItem>
                ))}
            </Select>
            <Select
                size="small"
                value={filters.jlptLevel}
                onChange={(e) => setFilters({ jlptLevel: e.target.value as typeof filters.jlptLevel })}
                renderValue={() => `${t("filter.level.label")}: ${levelLabel}`}
                sx={{ minWidth: 170 }}
            >
                <MenuItem value="all">{t("filter.level.all")}</MenuItem>
                {JLPT_LEVELS.map((lv) => (
                    <MenuItem key={lv} value={lv}>
                        {lv}
                    </MenuItem>
                ))}
            </Select>
            <Select
                size="small"
                value={filters.status}
                onChange={(e) => setFilters({ status: e.target.value as typeof filters.status })}
                renderValue={(v) =>
                    `${t("filter.status.label")}: ${
                        v === "all"
                            ? t("filter.status.all")
                            : v === "ACTIVE"
                                ? t("filter.status.active")
                                : t("filter.status.unactive")
                    }`
                }
                sx={{ minWidth: 185 }}
            >
                <MenuItem value="all">{t("filter.status.all")}</MenuItem>
                <MenuItem value="ACTIVE">{t("filter.status.active")}</MenuItem>
                <MenuItem value="UNACTIVE">{t("filter.status.unactive")}</MenuItem>
            </Select>
            <Button
                variant="text"
                onClick={resetFilters}
                sx={{ color: "text.primary", whiteSpace: "nowrap" }}
            >
                {t("filter.clearFilter")}
            </Button>
        </div>
    );
};

export default UserFilterBar;
