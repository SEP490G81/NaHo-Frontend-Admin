"use client";

import { useTranslations } from "next-intl";
import { BookQueryRequest } from "@/types/requests/book.request";
import { CefrLevel } from "@/types/enums/book.enum";
import { SortDirection } from "@/types/enums/user.enum";
import { Search, XCircle } from "lucide-react";
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
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full">
            <div className="flex-1 min-w-[250px] w-full flex items-center relative">
                <Search className="absolute left-3 text-text-muted" size={18} />
                <input
                    type="text"
                    placeholder={t("searchByTitle")}
                    className="w-full bg-bgc-app border border-bdc-primary rounded-lg pl-10 pr-4 py-2 text-sm text-text-contrast focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <select
                className="bg-bgc-app border border-bdc-primary rounded-lg px-4 py-2 text-sm text-text-contrast focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all min-w-[150px] appearance-none cursor-pointer"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value as SortDirection)}
                style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
            >
                <option value={SortDirection.ASC}>{t("asc")}</option>
                <option value={SortDirection.DESC}>{t("desc")}</option>
            </select>

            <select
                className="bg-bgc-app border border-bdc-primary rounded-lg px-4 py-2 text-sm text-text-contrast focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all min-w-[150px] appearance-none cursor-pointer"
                value={cefrLevel}
                onChange={(e) => setCefrLevel(e.target.value as CefrLevel | "ALL")}
                style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
            >
                <option value="ALL">{t("all")}</option>
                {Object.values(CefrLevel).map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>

            <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted border border-bdc-primary rounded-lg hover:bg-hbgc-app hover:text-text-contrast transition-all"
            >
                <XCircle size={16} />
                {t("clearAll")}
            </button>
        </div>
    );
}
