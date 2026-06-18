"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
} from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { parseCsv, ParsedCsv } from "../utils/csv.util";
import { useTopicManagement } from "../providers/topic.management.provider";

type ImportField = "title" | "level" | "description" | "ignore";

const detectField = (header: string): ImportField => {
    const s = header.toLowerCase();
    if (/tên|name|title|chủ đề/.test(s)) return "title";
    if (/cấp|level|jlpt/.test(s)) return "level";
    if (/mô tả|desc/.test(s)) return "description";
    return "ignore";
};

const TopicImportModal = () => {
    const t = useTranslations("topicManagement.import");
    const { isImportOpen, closeImport } = useTopicManagement();
    const [fileName, setFileName] = useState("");
    const [isXlsx, setIsXlsx] = useState(false);
    const [parsed, setParsed] = useState<ParsedCsv | null>(null);
    const [mapping, setMapping] = useState<ImportField[]>([]);

    const reset = () => {
        setFileName("");
        setIsXlsx(false);
        setParsed(null);
        setMapping([]);
    };

    const handleClose = () => {
        reset();
        closeImport();
    };

    const onFile = (file?: File) => {
        if (!file) return;
        setFileName(file.name);
        const isExcel = /\.xlsx$/i.test(file.name);
        setIsXlsx(isExcel);
        if (isExcel) {
            setParsed(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const result = parseCsv(String(reader.result ?? ""));
                setParsed(result);
                setMapping(result.headers.map(detectField));
            } catch {
                toast.error(t("parseError"));
            }
        };
        reader.readAsText(file);
    };

    const onSubmit = () => {
        const count = parsed?.rows.length ?? 0;
        toast.success(t("success", { count }));
        handleClose();
    };

    const rowCount = parsed?.rows.length ?? 0;

    return (
        <Dialog open={isImportOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {t("title")}
                <p className="text-text-muted mt-1 text-sm font-normal">
                    {t("description")}
                </p>
            </DialogTitle>
            <DialogContent className="space-y-4">
                <label className="border-bdc-muted hover:border-bgc-highlight flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors">
                    <UploadFileOutlinedIcon fontSize="small" />
                    {fileName || t("pick")}
                    <input
                        type="file"
                        accept=".csv,.xlsx"
                        className="hidden"
                        onChange={(e) => onFile(e.target.files?.[0])}
                    />
                </label>
                <p className="text-text-muted text-xs">{t("support")}</p>

                {isXlsx && (
                    <p className="rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-700">
                        {t("xlsxNote")}
                    </p>
                )}

                {parsed && parsed.headers.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{t("previewTitle")}</h3>
                            <span className="text-text-muted text-sm">
                                {t("rowsCount", { count: rowCount })}
                            </span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {parsed.headers.map((header, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                        {header}
                                    </span>
                                    <Select
                                        size="small"
                                        value={mapping[i] ?? "ignore"}
                                        onChange={(e) =>
                                            setMapping((prev) =>
                                                prev.map((m, idx) =>
                                                    idx === i
                                                        ? (e.target.value as ImportField)
                                                        : m,
                                                ),
                                            )
                                        }
                                        sx={{ minWidth: 150 }}
                                    >
                                        <MenuItem value="title">{t("fieldTitle")}</MenuItem>
                                        <MenuItem value="level">{t("fieldLevel")}</MenuItem>
                                        <MenuItem value="description">
                                            {t("fieldDescription")}
                                        </MenuItem>
                                        <MenuItem value="ignore">{t("ignore")}</MenuItem>
                                    </Select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 border-t pt-4">
                    <Button variant="outlined" onClick={handleClose} sx={{ color: "text.primary" }}>
                        {t("cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        disabled={rowCount === 0}
                        onClick={onSubmit}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-contrast)",
                        }}
                    >
                        {t("submit", { count: rowCount })}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TopicImportModal;
