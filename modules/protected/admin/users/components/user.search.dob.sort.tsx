"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { useUserFilter } from "@/modules/protected/admin/users/providers/user.filter.provider";
import { SortDirection, UserSortColumn } from "@/types/enums/user.enum";

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontSize: "0.85rem",
        backgroundColor: "var(--color-bgc-app)",
        color: "var(--color-text-contrast)",
        "& fieldset": { borderColor: "var(--color-bdc-primary)" },
        "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-bgc-highlight)",
        },
    },
    "& .MuiInputLabel-root": {
        color: "var(--color-text-muted)",
        fontSize: "0.85rem",
        "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
    },
    "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
};

export default function UserSearchDobSort() {
    const t = useTranslations("userManagement.searchBox");
    const { filter, setSortColumn, toggleSortDirection, setDobFrom, setDobTo } =
        useUserFilter();

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left group: DOB range */}
            <div className="flex items-center gap-3">
                <TextField
                    size="small"
                    type="date"
                    label={t("dobFromLabel")}
                    value={filter.dobFrom}
                    onChange={(e) => setDobFrom(e.target.value)}
                    sx={{ ...inputSx, minWidth: 160 }}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                    size="small"
                    type="date"
                    label={t("dobToLabel")}
                    value={filter.dobTo}
                    onChange={(e) => setDobTo(e.target.value)}
                    sx={{ ...inputSx, minWidth: 160 }}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
            </div>

            {/* Right group: Sort column + direction toggle */}
            <div className="flex items-center gap-2">
                <FormControl size="small" sx={{ ...inputSx, minWidth: 150 }}>
                    <InputLabel>{t("sortColumnLabel")}</InputLabel>
                    <Select
                        label={t("sortColumnLabel")}
                        value={filter.sortColumn}
                        onChange={(e) =>
                            setSortColumn(e.target.value as UserSortColumn)
                        }
                    >
                        <MenuItem value={UserSortColumn.ID}>
                            {t("sortId")}
                        </MenuItem>
                        <MenuItem value={UserSortColumn.EMAIL}>
                            {t("sortEmail")}
                        </MenuItem>
                        <MenuItem value={UserSortColumn.USERNAME}>
                            {t("sortUsername")}
                        </MenuItem>
                        <MenuItem value={UserSortColumn.FULL_NAME}>
                            {t("sortFullName")}
                        </MenuItem>
                        <MenuItem value={UserSortColumn.DOB}>
                            {t("sortDob")}
                        </MenuItem>
                    </Select>
                </FormControl>

                <Tooltip
                    title={
                        filter.sortDirection === SortDirection.ASC
                            ? t("sortDirectionAsc")
                            : t("sortDirectionDesc")
                    }
                >
                    <IconButton
                        onClick={toggleSortDirection}
                        sx={{
                            border: "1px solid var(--color-bdc-primary)",
                            borderRadius: "10px",
                            color: "var(--color-bgc-highlight)",
                            "&:hover": {
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {filter.sortDirection === SortDirection.ASC ? (
                            <ArrowDownAZ className="h-5 w-5" />
                        ) : (
                            <ArrowUpZA className="h-5 w-5" />
                        )}
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
