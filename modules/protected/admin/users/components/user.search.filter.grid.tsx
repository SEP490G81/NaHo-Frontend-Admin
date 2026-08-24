"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useUserFilter } from "@/modules/protected/admin/users/providers/user.filter.provider";
import { ROLE_ID_MAP } from "@/modules/protected/admin/users/constants/user.table.constants";

const ALL = "__ALL__";

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

export default function UserSearchFilterGrid() {
    const t = useTranslations("userManagement.searchBox");
    const { filter, setGender, setStatus, setIsEmailVerified, setRoleId } =
        useUserFilter();

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Gender */}
            <FormControl size="small" sx={inputSx}>
                <InputLabel>{t("genderLabel")}</InputLabel>
                <Select
                    label={t("genderLabel")}
                    value={filter.gender ?? ALL}
                    onChange={(e) =>
                        setGender(
                            e.target.value === ALL ? null : e.target.value,
                        )
                    }
                >
                    <MenuItem value={ALL}>{t("all")}</MenuItem>
                    <MenuItem value="MALE">{t("genderMale")}</MenuItem>
                    <MenuItem value="FEMALE">{t("genderFemale")}</MenuItem>
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
                            e.target.value === ALL ? null : e.target.value,
                        )
                    }
                >
                    <MenuItem value={ALL}>{t("all")}</MenuItem>
                    <MenuItem value="ACTIVE">{t("statusActive")}</MenuItem>
                    <MenuItem value="UNACTIVE">{t("statusUnactive")}</MenuItem>
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
                        setIsEmailVerified(val === ALL ? null : val === "true");
                    }}
                >
                    <MenuItem value={ALL}>{t("all")}</MenuItem>
                    <MenuItem value="true">{t("emailVerifiedTrue")}</MenuItem>
                    <MenuItem value="false">{t("emailVerifiedFalse")}</MenuItem>
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
                    <MenuItem value={ROLE_ID_MAP.CONTENT_MANAGER.toString()}>
                        {t("roleContentManager")}
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
