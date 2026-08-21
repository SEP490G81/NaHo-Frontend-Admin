import React from "react";
import { LearningPathNodeListItemResponse } from "@/types/responses/node.response";
import { useTranslations } from "next-intl";
import { Edit2 } from "lucide-react";

interface NodeTableProps {
    nodes: LearningPathNodeListItemResponse[];
    isLoading: boolean;
    onEdit: (node: LearningPathNodeListItemResponse) => void;
}

export const NodeTable: React.FC<NodeTableProps> = ({ nodes, isLoading, onEdit }) => {
    const t = useTranslations("objectiveManagement");

    const renderNodeType = (nodeType: string) => {
        switch (nodeType) {
            case "SPEAKING_QUESTION":
                return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Luyện nói</span>;
            case "VOCABULARY_QUESTION":
                return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Từ vựng</span>;
            case "CHEST":
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Rương thưởng</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{nodeType}</span>;
        }
    };

    return (
        <div className="w-full overflow-hidden flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-lg border border-bdc-primary custom-scrollbar">
                <table className="w-full table-auto text-left">
                    <thead className="bg-bgc-app sticky top-0 z-10">
                        <tr className="border-bdc-primary border-b">
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Loại Câu Hỏi (Node Type)</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Vị trí (Order)</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted text-center w-32">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nodes.length > 0 ? (
                            nodes.map((node) => (
                                <tr key={node.id} className="border-bdc-primary border-b hover:bg-hbgc-app transition-colors group">
                                    <td className="p-4 text-sm">
                                        {renderNodeType(node.nodeType)}
                                    </td>
                                    <td className="p-4 text-sm text-text-muted">{node.orderIndex}</td>
                                    <td className="p-4 flex items-center justify-center gap-2">
                                        {node.nodeType !== "CHEST" && (
                                            <button
                                                onClick={() => onEdit(node)}
                                                className="p-1 text-text-muted hover:text-text-contrast hover:bg-hbgc-hover rounded transition-colors"
                                                title="Sửa nội dung"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-text-muted">
                                    {isLoading ? "Đang tải dữ liệu..." : "Chưa có nội dung (Node) nào trong mục tiêu này."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
