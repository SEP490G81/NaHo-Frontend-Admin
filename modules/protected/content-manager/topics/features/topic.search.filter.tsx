import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, XCircle } from "lucide-react";
import { TopicQueryRequest } from "@/types/requests/topic.request";

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
        setSortDirection("ASC");
        onSearch({ keyword: "", sortDirection: "ASC" });
    };

    return (
        <div className="bg-bgc-panel border border-bdc-primary rounded-xl p-4 flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full">
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
                onChange={(e) => {
                    const val = e.target.value as "ASC" | "DESC" | "";
                    setSortDirection(val);
                    onSearch({ sortDirection: val || undefined });
                }}
                style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
            >
                <option value="">{t("sortDefault") || "Mặc định"}</option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
            </select>



            <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted border border-bdc-primary rounded-lg hover:bg-hbgc-app hover:text-text-contrast transition-all"
            >
                <XCircle size={16} />
                {t("clearAll")}
            </button>
        </div>
    );
};
