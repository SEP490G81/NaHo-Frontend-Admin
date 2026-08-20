"use client";

import { useTranslations } from "next-intl";
import { BookQueryRequest } from "@/types/requests/book.request";
import { CefrLevel } from "@/types/enums/book.enum";
import { SortDirection } from "@/types/enums/user.enum";
import {
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import { XCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface BookSearchFilterProps {
    onSearch: (params: Partial<BookQueryRequest>) => void;
}

export default function BookSearchFilter({ onSearch }: Readonly<BookSearchFilterProps>) {
    const t = useTranslations("books");

    const [keyword, setKeyword] = useState("");
    const [cefrLevel, setCefrLevel] = useState<CefrLevel | "ALL">("ALL");
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC);

    // Debounce the keyword search
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch({
                keyword: keyword || undefined,
                cefrLevel: cefrLevel === "ALL" ? null : cefrLevel,
                sortDirection,
            });
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [keyword, cefrLevel, sortDirection, onSearch]);

    const handleClearAll = () => {
        setKeyword("");
        setCefrLevel("ALL");
        setSortDirection(SortDirection.ASC);
        // The useEffect will automatically pick this up and call onSearch
    };

    return (
        <Box className="mb-6 flex flex-wrap gap-4 items-center">
            <TextField
                label={t("searchByTitle") || "Search by title"}
                variant="outlined"
                size="small"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="min-w-[250px] flex-grow"
            />

            <FormControl size="small" className="min-w-[150px]">
                <InputLabel>{t("sort") || "Sort"}</InputLabel>
                <Select
                    value={sortDirection}
                    label={t("sort") || "Sort"}
                    onChange={(e) => setSortDirection(e.target.value as SortDirection)}
                >
                    <MenuItem value={SortDirection.ASC}>{t("asc") || "Ascending"}</MenuItem>
                    <MenuItem value={SortDirection.DESC}>{t("desc") || "Descending"}</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" className="min-w-[150px]">
                <InputLabel>{t("cefrLevel") || "CEFR Level"}</InputLabel>
                <Select
                    value={cefrLevel}
                    label={t("cefrLevel") || "CEFR Level"}
                    onChange={(e) => setCefrLevel(e.target.value as CefrLevel | "ALL")}
                >
                    <MenuItem value="ALL">{t("all") || "All"}</MenuItem>
                    {Object.values(CefrLevel).map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="outlined"
                color="secondary"
                startIcon={<XCircle size={18} />}
                onClick={handleClearAll}
                className="h-10 text-gray-500 border-gray-300 hover:bg-gray-50"
            >
                {t("clearAll") || "Clear All"}
            </Button>
        </Box>
    );
}
