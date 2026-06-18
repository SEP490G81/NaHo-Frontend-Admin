"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slider,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import {
    fetchStreakConfig,
    sendTestStreakEmail,
    updateStreakConfig,
} from "@/services/client/notification.service";
import { queryKeys } from "@/libs/query.keys";
import { StreakEmailConfigResponse } from "@/types/responses/notification.response";
import {
    PREVIEW_SAMPLE_NAME,
    STREAK_EMAIL_VARIABLES,
    STREAK_THRESHOLD_MAX,
    STREAK_THRESHOLD_MIN,
} from "../constants/system.notifications.constant";

const renderPreview = (html: string, days: number): string =>
    html
        .replaceAll("{{name}}", PREVIEW_SAMPLE_NAME)
        .replaceAll("{{days}}", String(days));

/**
 * Editable form, seeded from the loaded config via useState initializers
 * (mounted only once data is ready) — keeps server data out of effects.
 */
const StreakEmailForm = ({
    initialConfig,
}: {
    initialConfig: StreakEmailConfigResponse;
}) => {
    const t = useTranslations("systemNotifications.streak");
    const queryClient = useQueryClient();

    const [subject, setSubject] = useState(initialConfig.subject);
    const [threshold, setThreshold] = useState(initialConfig.inactivityThreshold);
    const [htmlBody, setHtmlBody] = useState(initialConfig.htmlBody);
    const [testOpen, setTestOpen] = useState(false);
    const [testEmail, setTestEmail] = useState("");
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);

    const saveMutation = useMutation({
        mutationFn: updateStreakConfig,
        onSuccess: (data) => {
            queryClient.setQueryData(
                queryKeys.systemNotifications.streakConfig,
                data,
            );
            toast.success(t("saveSuccess"));
        },
        onError: (error) =>
            toast.error(error instanceof Error ? error.message : t("saveError")),
    });

    const testMutation = useMutation({
        mutationFn: sendTestStreakEmail,
        onSuccess: () => {
            toast.success(t("testSuccess"));
            setTestOpen(false);
            setTestEmail("");
        },
        onError: (error) =>
            toast.error(error instanceof Error ? error.message : t("testError")),
    });

    const insertVariable = (variable: string) => {
        const el = bodyRef.current;
        if (!el) {
            setHtmlBody((prev) => prev + variable);
            return;
        }
        const start = el.selectionStart ?? htmlBody.length;
        const end = el.selectionEnd ?? htmlBody.length;
        const next = htmlBody.slice(0, start) + variable + htmlBody.slice(end);
        setHtmlBody(next);
        requestAnimationFrame(() => {
            el.focus();
            const caret = start + variable.length;
            el.setSelectionRange(caret, caret);
        });
    };

    const handleSave = () => {
        if (subject.trim().length === 0 || htmlBody.trim().length === 0) {
            toast.error(t("validationError"));
            return;
        }
        saveMutation.mutate({
            subject: subject.trim(),
            inactivityThreshold: threshold,
            htmlBody,
        });
    };

    const handleSendTest = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
            toast.error(t("testEmailInvalid"));
            return;
        }
        testMutation.mutate({ email: testEmail.trim() });
    };

    return (
        <div className="bg-bgc-app space-y-6 rounded-xl p-6">
            <div className="flex items-center gap-2">
                <EmailOutlinedIcon sx={{ color: "var(--color-bgc-highlight)" }} />
                <div>
                    <h2 className="text-xl font-bold">{t("title")}</h2>
                    <p className="text-text-muted text-sm">{t("description")}</p>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                    {t("subjectLabel")}
                </label>
                <TextFieldCustom
                    id="subject"
                    fullWidth
                    size="small"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t("subjectPlaceholder")}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                        {t("thresholdLabel")}
                    </label>
                    <span className="bg-bgc-highlight text-text-contrast rounded-full px-3 py-0.5 text-xs font-semibold">
                        {t("thresholdValue", { days: threshold })}
                    </span>
                </div>
                <Slider
                    value={threshold}
                    min={STREAK_THRESHOLD_MIN}
                    max={STREAK_THRESHOLD_MAX}
                    step={1}
                    marks
                    onChange={(_, value) => setThreshold(value as number)}
                    sx={{
                        color: "var(--color-bgc-highlight)",
                        "& .MuiSlider-markActive": { backgroundColor: "#fff" },
                    }}
                />
                <p className="text-text-muted text-xs">
                    {t("thresholdHint", { days: threshold })}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="htmlBody" className="text-sm font-medium">
                        {t("htmlLabel")}
                    </label>
                    <textarea
                        id="htmlBody"
                        ref={bodyRef}
                        value={htmlBody}
                        onChange={(e) => setHtmlBody(e.target.value)}
                        spellCheck={false}
                        className="border-bdc-muted bg-bgc-page h-96 w-full resize-y rounded-lg border p-3 font-mono text-xs leading-relaxed outline-none focus:border-[var(--color-bgc-highlight)]"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-text-muted text-xs">
                            {t("variablesLabel")}
                        </span>
                        {STREAK_EMAIL_VARIABLES.map((variable) => (
                            <button
                                key={variable}
                                type="button"
                                onClick={() => insertVariable(variable)}
                                className="border-bdc-muted text-bgc-highlight hover:bg-hbgc-app rounded-md border px-2 py-0.5 font-mono text-xs transition-colors"
                            >
                                {variable}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">{t("previewLabel")}</label>
                    <div className="border-bdc-muted h-96 overflow-y-auto rounded-lg border bg-white p-4">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: renderPreview(htmlBody, threshold),
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-end gap-3 border-t pt-5 sm:flex-row">
                <Button
                    variant="outlined"
                    startIcon={<SendOutlinedIcon />}
                    onClick={() => setTestOpen(true)}
                    sx={{ color: "text.primary" }}
                >
                    {t("testButton")}
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    loading={saveMutation.isPending}
                    startIcon={<SaveOutlinedIcon />}
                    onClick={handleSave}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("saveButton")}
                </Button>
            </div>

            <Dialog
                open={testOpen}
                onClose={() => setTestOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>{t("testDialogTitle")}</DialogTitle>
                <DialogContent>
                    <p className="text-text-muted mb-3 text-sm">
                        {t("testDialogMessage")}
                    </p>
                    <TextFieldCustom
                        type="email"
                        fullWidth
                        size="small"
                        autoFocus
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="email@example.com"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => setTestOpen(false)}
                        sx={{ color: "text.primary" }}
                    >
                        {t("testCancel")}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        loading={testMutation.isPending}
                        onClick={handleSendTest}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-contrast)",
                        }}
                    >
                        {t("testConfirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const StreakEmailConfig = () => {
    const t = useTranslations("systemNotifications.streak");

    const configQuery = useQuery({
        queryKey: queryKeys.systemNotifications.streakConfig,
        queryFn: fetchStreakConfig,
    });

    useEffect(() => {
        if (configQuery.isError) toast.error(t("loadError"));
    }, [configQuery.isError, t]);

    if (configQuery.isPending) {
        return (
            <div className="bg-bgc-app flex justify-center rounded-xl py-16">
                <CircularProgress
                    size={28}
                    sx={{ color: "var(--color-bgc-highlight)" }}
                />
            </div>
        );
    }

    const config: StreakEmailConfigResponse = configQuery.data ?? {
        subject: "",
        inactivityThreshold: STREAK_THRESHOLD_MIN,
        htmlBody: "",
    };

    return <StreakEmailForm initialConfig={config} />;
};

export default StreakEmailConfig;
