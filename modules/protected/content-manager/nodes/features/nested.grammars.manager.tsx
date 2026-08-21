import React, { useState, useEffect, useRef } from "react";
import { NestedGrammarUpsertRequest } from "@/types/requests/question.request";
import { GrammarResponse } from "@/types/responses/vocabulary.response";
import { Search, Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

import { searchGrammars } from "@/services/client/grammar.service";

interface NestedGrammarsManagerProps {
    grammars: NestedGrammarUpsertRequest[];
    onChange: (grammars: NestedGrammarUpsertRequest[]) => void;
}

export const NestedGrammarsManager: React.FC<NestedGrammarsManagerProps> = ({ grammars, onChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<GrammarResponse[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newGrammar, setNewGrammar] = useState({
        japanese: "",
        reading: "",
        vietnameseMeaningText: "",
        englishMeaningText: ""
    });

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (searchTerm.trim().length >= 1) {
                setIsSearching(true);
                try {
                    const res = await searchGrammars(searchTerm);
                    const addedIds = new Set(grammars.filter(g => g.id !== null).map(g => g.id));
                    setSearchResults(res.data?.filter(g => !addedIds.has(g.id)) || []);
                    setShowDropdown(true);
                } catch (error) {
                    console.error("Failed to search grammars", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, grammars]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectExisting = (grammar: GrammarResponse) => {
        onChange([...grammars, {
            id: grammar.id,
            japanese: grammar.japanese,
            reading: grammar.reading,
            vietnameseMeaningText: grammar.vietnameseMeaningText,
            englishMeaningText: grammar.englishMeaningText
        }]);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const handleCreateNew = () => {
        if (!newGrammar.japanese.trim()) return;
        onChange([...grammars, {
            id: null,
            ...newGrammar
        }]);
        setNewGrammar({ japanese: "", reading: "", vietnameseMeaningText: "", englishMeaningText: "" });
        setIsCreatingNew(false);
    };

    const handleRemove = (index: number) => {
        const updated = [...grammars];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="flex flex-col gap-4 mt-6">
            <h3 className="font-semibold text-text-contrast border-b border-bdc-primary pb-2">Ngữ pháp (Grammars)</h3>

            <div className="flex flex-col gap-2">
                {grammars.length === 0 ? (
                    <div className="text-sm text-text-muted italic py-2">Chưa có ngữ pháp nào được gán.</div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-bdc-primary">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-hbgc-app border-b border-bdc-primary text-text-muted">
                                    <th className="p-2 font-medium">Trạng thái</th>
                                    <th className="p-2 font-medium">Ngữ pháp (Japanese)</th>
                                    <th className="p-2 font-medium">Cách đọc (Reading)</th>
                                    <th className="p-2 font-medium">Nghĩa Tiếng Việt</th>
                                    <th className="p-2 font-medium text-center w-12">Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-bdc-primary">
                                {grammars.map((g, i) => (
                                    <tr key={g.id ? `existing-${g.id}` : `new-${i}`} className="bg-bgc-panel">
                                        <td className="p-2">
                                            {g.id === null ? (
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium border border-blue-200">Tạo mới</span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium border border-green-200">Đã có</span>
                                            )}
                                        </td>
                                        <td className="p-2 text-text-contrast">{g.japanese || "-"}</td>
                                        <td className="p-2 text-text-muted">{g.reading || "-"}</td>
                                        <td className="p-2 text-text-muted">{g.vietnameseMeaningText || "-"}</td>
                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(i)}
                                                className="p-1 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!isCreatingNew ? (
                <div className="flex gap-2">
                    <div className="relative flex-1" ref={dropdownRef}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm ngữ pháp có sẵn để gán..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2.5 pl-9 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-text-contrast"
                            />
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            {isSearching && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                </div>
                            )}
                        </div>
                        {showDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-bgc-app border border-bdc-primary rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    searchResults.map(result => (
                                        <button
                                            key={result.id}
                                            type="button"
                                            onClick={() => handleSelectExisting(result)}
                                            className="w-full text-left p-3 hover:bg-hbgc-app border-b border-bdc-primary last:border-0 transition-colors flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-text-contrast">{result.japanese} <span className="text-text-muted font-normal text-xs ml-1">({result.reading})</span></div>
                                                <div className="text-xs text-text-muted mt-0.5">{result.vietnameseMeaningText}</div>
                                            </div>
                                            <Plus size={16} className="text-primary" />
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-3 text-sm text-text-muted text-center italic">Không tìm thấy ngữ pháp nào. Bạn có muốn tạo mới không?</div>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsCreatingNew(true)}
                        className="px-4 py-2.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors border border-primary/20 whitespace-nowrap"
                    >
                        + Thêm NP mới
                    </button>
                </div>
            ) : (
                <div className="bg-bgc-panel p-4 rounded-lg border border-primary/30 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-primary">Tạo Ngữ pháp mới</h4>
                        <button type="button" onClick={() => setIsCreatingNew(false)} className="text-text-muted hover:text-text-contrast p-1">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                placeholder="Tiếng Nhật (Cấu trúc) *"
                                value={newGrammar.japanese}
                                onChange={e => setNewGrammar({ ...newGrammar, japanese: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Cách đọc (Reading)"
                                value={newGrammar.reading}
                                onChange={e => setNewGrammar({ ...newGrammar, reading: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Nghĩa Tiếng Việt"
                                value={newGrammar.vietnameseMeaningText}
                                onChange={e => setNewGrammar({ ...newGrammar, vietnameseMeaningText: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Nghĩa Tiếng Anh"
                                value={newGrammar.englishMeaningText}
                                onChange={e => setNewGrammar({ ...newGrammar, englishMeaningText: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        disabled={!newGrammar.japanese.trim()}
                        className="self-end px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover disabled:opacity-50 transition-colors"
                    >
                        Lưu ngữ pháp mới
                    </button>
                </div>
            )}
        </div>
    );
};
