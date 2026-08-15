import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    Button
} from "@mui/material";
import { Search, X, ArrowLeft } from "lucide-react";
import { TopicQueryRequest } from "@/types/requests/topic.request";
import { TopicStatus } from "@/types/enums/topic.enum";

interface TopicSearchFilterProps {
    onSearch: (params: Partial<TopicQueryRequest>) => void;
    currentParams: TopicQueryRequest;
    onBack: () => void;
}

export const TopicSearchFilter: React.FC<TopicSearchFilterProps> = ({
    onSearch,
    currentParams,
    onBack,
}) => {
    const t = useTranslations("topicManagement");

    const [keyword, setKeyword] = useState(currentParams.keyword || "");
    const [status, setStatus] = useState<TopicStatus | "ALL">(currentParams.status || "ALL");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC" | "">("ASC");

    // Debounce keyword search
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (keyword !== currentParams.keyword) {
                onSearch({ keyword });
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [keyword, currentParams.keyword, onSearch]);

    const handleClear = () => {
        setKeyword("");
        setStatus("ALL");
        setSortDirection("ASC");
        onSearch({ keyword: "", status: "ALL", sortDirection: "ASC" });
    };

    return (
        <Box className="flex flex-col gap-4 p-5 bg-card border rounded-xl shadow-sm mb-6">
            <div className="flex items-center justify-between border-b pb-4">
                <Button 
                    variant="text" 
                    color="inherit" 
                    startIcon={<ArrowLeft className="w-4 h-4" />}
                    onClick={onBack}
                    className="text-muted-foreground hover:text-foreground"
                >
                    {t("backToBooks")}
                </Button>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClear}
                        startIcon={<X className="w-4 h-4" />}
                        size="small"
                        className="h-10"
                    >
                        {t("clearAll")}
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <TextField
                    size="small"
                    className="flex-1 min-w-[250px]"
                    variant="outlined"
                    label={t("searchByTitle") || "Search"}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search className="w-4 h-4 text-gray-500" />
                            </InputAdornment>
                        ),
                        endAdornment: keyword && (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setKeyword("")}>
                                    <X className="w-4 h-4" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <FormControl size="small" className="min-w-[180px]">
                    <InputLabel>{t("status") || "Status"}</InputLabel>
                    <Select
                        value={status}
                        label={t("status") || "Status"}
                        onChange={(e) => {
                            const val = e.target.value as TopicStatus | "ALL";
                            setStatus(val);
                            onSearch({ status: val });
                        }}
                    >
                        <MenuItem value="ALL">{t("allStatus")}</MenuItem>
                        <MenuItem value={TopicStatus.DRAFT}>{t("statusDraft")}</MenuItem>
                        <MenuItem value={TopicStatus.PUBLISHED}>{t("statusPublished")}</MenuItem>
                        <MenuItem value={TopicStatus.ARCHIVE}>{t("statusArchive")}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" className="min-w-[150px]">
                    <InputLabel>Sắp xếp (Tên)</InputLabel>
                    <Select
                        value={sortDirection}
                        label="Sắp xếp (Tên)"
                        onChange={(e) => {
                            const val = e.target.value as "ASC" | "DESC" | "";
                            setSortDirection(val);
                            onSearch({ sortDirection: val || undefined });
                        }}
                    >
                        <MenuItem value="">Mặc định</MenuItem>
                        <MenuItem value="ASC">A-Z</MenuItem>
                        <MenuItem value="DESC">Z-A</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Box>
    );
};
