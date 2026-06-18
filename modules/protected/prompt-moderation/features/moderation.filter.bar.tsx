"use client";
import { useTranslations } from "next-intl";
import { Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { usePromptModeration } from "../providers/prompt.moderation.provider";

const ModerationFilterBar = () => {
    const t = useTranslations("promptModeration");
    const { filters, setFilters, resetFilters, isFiltered } =
        usePromptModeration();

    return (
        <div className="flex flex-wrap items-center gap-3">
            <TextFieldCustom
                placeholder={t("filter.searchPlaceholder")}
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                size="small"
                className="min-w-64 flex-1"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    fontSize="small"
                                    className="text-text-muted"
                                />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            {isFiltered && (
                <Button
                    variant="text"
                    onClick={resetFilters}
                    sx={{ color: "text.primary", whiteSpace: "nowrap" }}
                >
                    {t("filter.clear")}
                </Button>
            )}
        </div>
    );
};

export default ModerationFilterBar;
