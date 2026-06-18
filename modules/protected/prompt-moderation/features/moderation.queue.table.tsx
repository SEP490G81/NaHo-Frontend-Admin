"use client";
import { useTranslations } from "next-intl";
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import ModerationRow from "../components/moderation.row";
import { usePromptModeration } from "../providers/prompt.moderation.provider";

const ModerationQueueTable = () => {
    const t = useTranslations("promptModeration.table");
    const { questions, totalCount, isLoading, isFiltered } =
        usePromptModeration();

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("columns.submitter")}</TableCell>
                            <TableCell>{t("columns.question")}</TableCell>
                            <TableCell>{t("columns.hint")}</TableCell>
                            <TableCell>{t("columns.submittedAt")}</TableCell>
                            <TableCell>{t("columns.status")}</TableCell>
                            <TableCell>{t("columns.actions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" className="py-10">
                                    <CircularProgress
                                        size={26}
                                        sx={{ color: "var(--color-bgc-highlight)" }}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : questions.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    className="text-text-muted py-10"
                                >
                                    {isFiltered ? t("emptyFiltered") : t("empty")}
                                </TableCell>
                            </TableRow>
                        ) : (
                            questions.map((q) => (
                                <ModerationRow
                                    key={q.id}
                                    question={q}
                                    viewLabel={t("viewDetail")}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {!isLoading && questions.length > 0 && (
                <p className="text-text-muted mt-3 text-sm">
                    {t("showing", { count: questions.length, total: totalCount })}
                </p>
            )}
        </div>
    );
};

export default ModerationQueueTable;
