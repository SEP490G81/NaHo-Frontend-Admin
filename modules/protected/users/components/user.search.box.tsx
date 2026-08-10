"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { ArrowDownAZ, ArrowUpZA, RotateCcw, Search } from "lucide-react";
import { useUserFilter } from "@/modules/protected/users/providers/user.filter.provider";
import { UserSortColumn, SortDirection } from "@/types/enums/user.enum";
import { ROLE_ID_MAP } from "@/modules/protected/users/constants/user.table.constants";

const ALL = "__ALL__";

/** Shared MUI sx for inputs/selects, using theme CSS vars. */
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

export default function UserSearchBox() {
    const t = useTranslations("userManagement.searchBox");
    const {
        filter,
        pendingKeyword,
        setSortColumn,
        toggleSortDirection,
        setPendingKeyword,
        applySearch,
        setGender,
        setStatus,
        setIsEmailVerified,
        setRoleId,
        setDobFrom,
        setDobTo,
        resetFilter,
    } = useUserFilter();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") applySearch();
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Row 1: Keyword search + reset */}
            <div className="flex items-center gap-2">
                <TextField
                    size="small"
                    fullWidth
                    placeholder={t("keywordPlaceholder")}
                    value={pendingKeyword}
                    onChange={(e) => setPendingKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={inputSx}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={applySearch}
                                        size="small"
                                        sx={{
                                            color: "var(--color-bgc-highlight)",
                                        }}
                                    >
                                        <Search className="h-4 w-4" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {/* Reset button */}
                <Tooltip title={t("resetButton")}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={resetFilter}
                        startIcon={<RotateCcw className="h-4 w-4" />}
                        sx={{
                            minWidth: "auto",
                            whiteSpace: "nowrap",
                            borderRadius: "10px",
                            borderColor: "var(--color-bdc-primary)",
                            color: "var(--color-text-muted)",
                            textTransform: "none",
                            fontSize: "0.8rem",
                            px: 2,
                            "&:hover": {
                                borderColor: "var(--color-text-error)",
                                color: "var(--color-text-error)",
                                backgroundColor:
                                    "color-mix(in srgb, var(--color-text-error) 8%, transparent)",
                            },
                        }}
                    >
                        {t("resetButton")}
                    </Button>
                </Tooltip>
            </div>

            {/* Row 2: Filter selects (4 columns) */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {/* Gender */}
                <FormControl size="small" sx={inputSx}>
                    <InputLabel>{t("genderLabel")}</InputLabel>
                    <Select
                        label={t("genderLabel")}
                        value={filter.gender ?? ALL}
                        onChange={(e) =>
                            setGender(
                                e.target.value === ALL
                                    ? null
                                    : e.target.value,
                            )
                        }
                    >
                        <MenuItem value={ALL}>{t("all")}</MenuItem>
                        <MenuItem value="MALE">{t("genderMale")}</MenuItem>
                        <MenuItem value="FEMALE">
                            {t("genderFemale")}
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Status */}
                <FormControl size="small" sx={inputSx}>
                    <InputLabel>{t("statusLabel")}</InputLabel>
                    <Select
                        label={t("statusLabel")}
                        value={filter.status ?? ALL}
                        onChange={(e) =>
                            setStatus(
                                e.target.value === ALL
                                    ? null
                                    : e.target.value,
                            )
                        }
                    >
                        <MenuItem value={ALL}>{t("all")}</MenuItem>
                        <MenuItem value="ACTIVE">
                            {t("statusActive")}
                        </MenuItem>
                        <MenuItem value="UNACTIVE">
                            {t("statusUnactive")}
                        </MenuItem>
                        <MenuItem value="DELETED">
                            {t("statusDeleted")}
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Email Verified */}
                <FormControl size="small" sx={inputSx}>
                    <InputLabel>{t("emailVerifiedLabel")}</InputLabel>
                    <Select
                        label={t("emailVerifiedLabel")}
                        value={
                            filter.isEmailVerified === null
                                ? ALL
                                : filter.isEmailVerified
                                  ? "true"
                                  : "false"
                        }
                        onChange={(e) => {
                            const val = e.target.value;
                            setIsEmailVerified(
                                val === ALL ? null : val === "true",
                            );
                        }}
                    >
                        <MenuItem value={ALL}>{t("all")}</MenuItem>
                        <MenuItem value="true">
                            {t("emailVerifiedTrue")}
                        </MenuItem>
                        <MenuItem value="false">
                            {t("emailVerifiedFalse")}
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Role */}
                <FormControl size="small" sx={inputSx}>
                    <InputLabel>{t("roleLabel")}</InputLabel>
                    <Select
                        label={t("roleLabel")}
                        value={filter.roleId?.toString() ?? ALL}
                        onChange={(e) =>
                            setRoleId(
                                e.target.value === ALL
                                    ? null
                                    : Number(e.target.value),
                            )
                        }
                    >
                        <MenuItem value={ALL}>{t("all")}</MenuItem>
                        <MenuItem value={ROLE_ID_MAP.LEARNER.toString()}>
                            {t("roleLearner")}
                        </MenuItem>
                        <MenuItem
                            value={ROLE_ID_MAP.CONTENT_MANAGER.toString()}
                        >
                            {t("roleContentManager")}
                        </MenuItem>
                        <MenuItem value={ROLE_ID_MAP.ADMIN.toString()}>
                            {t("roleAdmin")}
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Row 3: DOB range (left) | Sort column + direction (right) */}
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
                                setSortColumn(
                                    e.target.value as UserSortColumn,
                                )
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
        </div>
    );
}
