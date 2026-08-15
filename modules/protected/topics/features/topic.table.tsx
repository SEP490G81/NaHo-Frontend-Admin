import React from "react";
import { useTranslations } from "next-intl";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Chip,
} from "@mui/material";
import { Edit2 } from "lucide-react";
import { TopicResponse } from "@/types/responses/topic.response";
import { TopicStatus } from "@/types/enums/topic.enum";

interface TopicTableProps {
    topics: TopicResponse[];
    onEdit: (topicId: number) => void;
}

export const TopicTable: React.FC<TopicTableProps> = ({ topics, onEdit }) => {
    const t = useTranslations("topicManagement");

    const getStatusChip = (status: TopicStatus) => {
        switch (status) {
            case TopicStatus.PUBLISHED:
                return <Chip label={t("statusPublished")} color="success" size="small" variant="outlined" />;
            case TopicStatus.DRAFT:
                return <Chip label={t("statusDraft")} color="warning" size="small" variant="outlined" />;
            case TopicStatus.ARCHIVE:
                return <Chip label={t("statusArchive")} color="default" size="small" variant="outlined" />;
            default:
                return <Chip label={status} size="small" variant="outlined" />;
        }
    };

    if (topics.length === 0) {
        return (
            <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl bg-card">
                {t("noData")}
            </div>
        );
    }

    return (
        <TableContainer component={Paper} className="shadow-sm border rounded-xl overflow-hidden">
            <Table size="medium">
                <TableHead className="bg-muted/50">
                    <TableRow>
                        <TableCell className="font-semibold text-muted-foreground w-16">ID</TableCell>
                        <TableCell className="font-semibold text-muted-foreground">{t("topicName")}</TableCell>
                        <TableCell className="font-semibold text-muted-foreground">{t("status")}</TableCell>
                        <TableCell align="right" className="font-semibold text-muted-foreground">{t("actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topics.map((topic) => (
                        <TableRow key={topic.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="text-muted-foreground">#{topic.id}</TableCell>
                            <TableCell>
                                <p className="font-medium">{topic.japaneseName}</p>
                                {topic.japaneseDescription && (
                                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                        {topic.japaneseDescription}
                                    </p>
                                )}
                            </TableCell>
                            <TableCell>{getStatusChip(topic.status)}</TableCell>
                            <TableCell align="right">
                                <Tooltip title={t("editTopic")}>
                                    <IconButton 
                                        onClick={() => onEdit(topic.id)} 
                                        size="small"
                                        color="primary"
                                        className="hover:bg-primary/10"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
