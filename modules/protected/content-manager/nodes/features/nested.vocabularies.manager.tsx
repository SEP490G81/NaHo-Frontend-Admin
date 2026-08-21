import React, { useState, useEffect, useRef } from "react";
import { NestedVocabularyUpsertRequest } from "@/types/requests/question.request";
import { searchVocabularies } from "@/services/client/vocabulary.service";
import { VocabularyResponse } from "@/types/responses/vocabulary.response";
import { Search, Plus, Trash2, X } from "lucide-react";

interface NestedVocabulariesManagerProps {
    vocabularies: NestedVocabularyUpsertRequest[];
    onChange: (vocabularies: NestedVocabularyUpsertRequest[]) => void;
}

export const NestedVocabulariesManager: React.FC<NestedVocabulariesManagerProps> = ({ vocabularies, onChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<VocabularyResponse[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Form states for creating a new vocabulary inline
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newVocab, setNewVocab] = useState({
        japanese: "",
        reading: "",
        vietnameseMeaningText: "",
        englishMeaningText: ""
    });

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(async () => {
            if (searchTerm.trim().length >= 1) {
                setIsSearching(true);
                try {
                    const res = await searchVocabularies(searchTerm);
                    // Exclude already added vocabularies
                    const addedIds = new Set(vocabularies.filter(v => v.id !== null).map(v => v.id));
                    setSearchResults(res.data?.filter(v => !addedIds.has(v.id)) || []);
                    setShowDropdown(true);
                } catch (error) {
                    console.error("Failed to search vocabularies", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, vocabularies]);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectExisting = (vocab: VocabularyResponse) => {
        onChange([...vocabularies, {
            id: vocab.id,
            japanese: vocab.japanese,
            reading: vocab.reading,
            vietnameseMeaningText: vocab.vietnameseMeaningText,
            englishMeaningText: vocab.englishMeaningText
        }]);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const handleCreateNew = () => {
        if (!newVocab.japanese.trim()) return;
        onChange([...vocabularies, {
            id: null, // Critical: id null means "Create New" on backend
            ...newVocab
        }]);
        setNewVocab({ japanese: "", reading: "", vietnameseMeaningText: "", englishMeaningText: "" });
        setIsCreatingNew(false);
    };

    const handleRemove = (index: number) => {
        const updated = [...vocabularies];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-text-contrast border-b border-bdc-primary pb-2">Từ vựng (Vocabularies)</h3>

            {/* List of currently assigned vocabularies */}
            <div className="flex flex-col gap-2">
                {vocabularies.length === 0 ? (
                    <div className="text-sm text-text-muted italic py-2">Chưa có từ vựng nào được gán.</div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-bdc-primary">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-hbgc-app border-b border-bdc-primary text-text-muted">
                                    <th className="p-2 font-medium">Trạng thái</th>
                                    <th className="p-2 font-medium">Từ (Japanese)</th>
                                    <th className="p-2 font-medium">Cách đọc (Reading)</th>
                                    <th className="p-2 font-medium">Nghĩa Tiếng Việt</th>
                                    <th className="p-2 font-medium text-center w-12">Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-bdc-primary">
                                {vocabularies.map((v, i) => (
                                    <tr key={v.id ? `existing-${v.id}` : `new-${i}`} className="bg-bgc-panel">
                                        <td className="p-2">
                                            {v.id === null ? (
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium border border-blue-200">Tạo mới</span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium border border-green-200">Đã có</span>
                                            )}
                                        </td>
                                        <td className="p-2 text-text-contrast">{v.japanese || "-"}</td>
                                        <td className="p-2 text-text-muted">{v.reading || "-"}</td>
                                        <td className="p-2 text-text-muted">{v.vietnameseMeaningText || "-"}</td>
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

            {/* Actions: Search existing or Create new */}
            {!isCreatingNew ? (
                <div className="flex gap-2">
                    <div className="relative flex-1" ref={dropdownRef}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm từ vựng có sẵn để gán..."
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
                                    <div className="p-3 text-sm text-text-muted text-center italic">Không tìm thấy từ vựng nào. Bạn có muốn tạo mới không?</div>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsCreatingNew(true)}
                        className="px-4 py-2.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors border border-primary/20 whitespace-nowrap"
                    >
                        + Thêm từ mới
                    </button>
                </div>
            ) : (
                <div className="bg-bgc-panel p-4 rounded-lg border border-primary/30 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-primary">Tạo Từ vựng mới</h4>
                        <button type="button" onClick={() => setIsCreatingNew(false)} className="text-text-muted hover:text-text-contrast p-1">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                placeholder="Tiếng Nhật (Kanji/Kana) *"
                                value={newVocab.japanese}
                                onChange={e => setNewVocab({ ...newVocab, japanese: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Cách đọc (Reading)"
                                value={newVocab.reading}
                                onChange={e => setNewVocab({ ...newVocab, reading: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Nghĩa Tiếng Việt"
                                value={newVocab.vietnameseMeaningText}
                                onChange={e => setNewVocab({ ...newVocab, vietnameseMeaningText: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Nghĩa Tiếng Anh"
                                value={newVocab.englishMeaningText}
                                onChange={e => setNewVocab({ ...newVocab, englishMeaningText: e.target.value })}
                                className="w-full p-2 text-sm bg-bgc-app border border-bdc-primary rounded focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        disabled={!newVocab.japanese.trim()}
                        className="self-end px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover disabled:opacity-50 transition-colors"
                    >
                        Lưu từ mới
                    </button>
                </div>
            )}
        </div>
    );
};
