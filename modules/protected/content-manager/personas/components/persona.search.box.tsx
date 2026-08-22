"use client";

import React from "react";
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
import { RotateCcw, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import {
    FormalityLevelFilter,
    PersonaStatusFilter,
} from "@/types/enums/persona.enum";
import { personaInputSx } from "../constants/persona.input.sx";
import {
    FORMALITY_LEVEL_OPTIONS,
    PERSONA_STATUS_OPTIONS,
} from "../constants/persona.constants";
import { usePersonaFilter } from "../providers/persona.filter.provider";

export function PersonaSearchBox() {
    const t = useTranslations("personaManagement.searchBox");
    const tFormality = useTranslations("personaManagement.formality");
    const tStatus = useTranslations("personaManagement.status");
    const {
        filter,
        pendingKeyword,
        setPendingKeyword,
        setFormalityLevel,
        setStatus,
        applySearch,
        resetFilter,
    } = usePersonaFilter();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") applySearch();
    };

    return (
        <ContainerBox>
            <div className="flex flex-col items-center gap-3 lg:flex-row">
                {/* Tìm theo tên, prompt hoặc mã nhân vật */}
                <div className="w-full flex-1">
                    <TextField
                        size="small"
                        fullWidth
                        placeholder={t("keywordPlaceholder")}
                        value={pendingKeyword}
                        onChange={(e) => setPendingKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={personaInputSx}
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
                </div>

                {/* Lọc theo mức trang trọng */}
                <div className="w-full lg:w-52">
                    <FormControl size="small" fullWidth sx={personaInputSx}>
                        <InputLabel>{t("formalityLabel")}</InputLabel>
                        <Select
                            label={t("formalityLabel")}
                            value={filter.formalityLevel}
                            onChange={(e) => setFormalityLevel(e.target.value)}
                        >
                            <MenuItem value={FormalityLevelFilter.ALL}>
                                {t("all")}
                            </MenuItem>
                            {FORMALITY_LEVEL_OPTIONS.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {tFormality(level)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Lọc theo trạng thái */}
                <div className="w-full lg:w-44">
                    <FormControl size="small" fullWidth sx={personaInputSx}>
                        <InputLabel>{t("statusLabel")}</InputLabel>
                        <Select
                            label={t("statusLabel")}
                            value={filter.status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={PersonaStatusFilter.ALL}>
                                {t("all")}
                            </MenuItem>
                            {PERSONA_STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {tStatus(status)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Đặt lại bộ lọc */}
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
                            py: 0.9,
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
        </ContainerBox>
    );
}
