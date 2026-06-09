"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { Link } from "@/intl/i18n/navigation";
import { JLPT_LEVELS, TOPIC_STATUSES } from "@/constants/topic.constant";
import { TopicStatus } from "@/types/enums/topic.enum";
import { useTopicManagement } from "../providers/topic.management.provider";

const STATUS_KEY: Record<TopicStatus, "draft" | "active" | "hidden"> = {
    DRAFT: "draft",
    ACTIVE: "active",
    HIDDEN: "hidden",
};

const TopicFilterBar = () => {
    const t = useTranslations("topicManagement.list");
    const tStatus = useTranslations("topicManagement.status");
    const { filters, setFilters, openImport } = useTopicManagement();

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
                value={filters.level}
                onChange={(e) =>
                    setFilters({ level: e.target.value as typeof filters.level })
                }
                renderValue={(v) => (v === "all" ? t("levelFilterAll") : v)}
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="all">{t("levelFilterAll")}</MenuItem>
                {JLPT_LEVELS.map((lv) => (
                    <MenuItem key={lv} value={lv}>
                        {lv}
                    </MenuItem>
                ))}
            </Select>
            <Select
                size="small"
                value={filters.status}
                onChange={(e) =>
                    setFilters({ status: e.target.value as typeof filters.status })
                }
                renderValue={(v) =>
                    v === "all" ? t("statusFilterAll") : tStatus(STATUS_KEY[v])
                }
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="all">{t("statusFilterAll")}</MenuItem>
                {TOPIC_STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                        {tStatus(STATUS_KEY[s])}
                    </MenuItem>
                ))}
            </Select>
            <Link href="/content-manager/topics/new">
                <Button
                    variant="contained"
                    disableElevation
                    startIcon={<AddIcon />}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                        whiteSpace: "nowrap",
                    }}
                >
                    {t("addTopic")}
                </Button>
            </Link>
            <Button
                variant="outlined"
                startIcon={<UploadFileOutlinedIcon />}
                onClick={openImport}
                sx={{ color: "text.primary", whiteSpace: "nowrap" }}
            >
                {t("importExcel")}
            </Button>
        </div>
    );
};

export default TopicFilterBar;
