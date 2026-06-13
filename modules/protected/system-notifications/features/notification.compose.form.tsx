"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Select,
    Switch,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { NotificationAudience } from "@/types/enums/notification.enum";
import {
    AUDIENCE_KEY,
    NOTIFICATION_AUDIENCES,
} from "../constants/system.notifications.constant";
import { useSystemNotifications } from "../providers/system.notifications.provider";
import { validateSendNotificationForm } from "../actions/notification.send.action";
import { SendNotificationState } from "../types/system.notifications.type";

const CONTENT_MAX = 1000;

const initialState: SendNotificationState = {
    title: { value: "", error: false },
    content: { value: "", error: false },
};

const NotificationComposeForm = () => {
    const t = useTranslations("systemNotifications.compose");
    const tAudience = useTranslations("systemNotifications.audience");
    const { isSending, sendNotification } = useSystemNotifications();

    const [state, setState] = useState<SendNotificationState>(initialState);
    const [audience, setAudience] = useState<NotificationAudience>("ALL");
    const [contentLength, setContentLength] = useState(0);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduledAt, setScheduledAt] = useState("");
    const [confirmBroadcast, setConfirmBroadcast] = useState(false);
    const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

    const dispatchSend = async (formData: FormData) => {
        const ok = await sendNotification({
            title: (formData.get("title") as string).trim(),
            content: (formData.get("content") as string).trim(),
            audience,
            scheduledAt:
                isScheduled && scheduledAt
                    ? new Date(scheduledAt).toISOString()
                    : undefined,
        });
        if (ok) {
            setState(initialState);
            setContentLength(0);
            setIsScheduled(false);
            setScheduledAt("");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newState = validateSendNotificationForm(formData);
        setState(newState);
        if (newState.title.error || newState.content.error) return;

        // Phát cho TẤT CẢ là hành động diện rộng → xác nhận trước khi gửi.
        if (audience === "ALL") {
            setPendingFormData(formData);
            setConfirmBroadcast(true);
            return;
        }
        void dispatchSend(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                        {t("titleLabel")} <span className="text-bgc-error">*</span>
                    </label>
                    <TextFieldCustom
                        name="title"
                        id="title"
                        fullWidth
                        size="small"
                        placeholder={t("titlePlaceholder")}
                        defaultValue={state.title.value}
                        error={state.title.error}
                        helperText={state.title.error ? t("titleRequired") : ""}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">
                        {t("contentLabel")} <span className="text-bgc-error">*</span>
                    </label>
                    <TextFieldCustom
                        name="content"
                        id="content"
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder={t("contentPlaceholder")}
                        defaultValue={state.content.value}
                        error={state.content.error}
                        helperText={state.content.error ? t("contentRequired") : ""}
                        slotProps={{ htmlInput: { maxLength: CONTENT_MAX } }}
                        onChange={(e) => setContentLength(e.target.value.length)}
                    />
                    <p className="text-text-muted text-right text-xs">
                        {contentLength}/{CONTENT_MAX}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {t("audienceLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={audience}
                            onChange={(e) =>
                                setAudience(e.target.value as NotificationAudience)
                            }
                        >
                            {NOTIFICATION_AUDIENCES.map((a) => (
                                <MenuItem key={a} value={a}>
                                    {tAudience(AUDIENCE_KEY[a])}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isScheduled}
                                    onChange={(e) => setIsScheduled(e.target.checked)}
                                    sx={{
                                        "& .Mui-checked": {
                                            color: "var(--color-bgc-highlight)",
                                        },
                                        "& .Mui-checked + .MuiSwitch-track": {
                                            backgroundColor:
                                                "var(--color-bgc-highlight)",
                                        },
                                    }}
                                />
                            }
                            label={
                                <span className="text-sm font-medium">
                                    {t("scheduleLabel")}
                                </span>
                            }
                        />
                        {isScheduled && (
                            <TextFieldCustom
                                type="datetime-local"
                                fullWidth
                                size="small"
                                value={scheduledAt}
                                onChange={(e) => setScheduledAt(e.target.value)}
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-end border-t pt-5">
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        loading={isSending}
                        startIcon={<SendOutlinedIcon />}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-contrast)",
                        }}
                    >
                        {isScheduled ? t("scheduleSubmit") : t("submit")}
                    </Button>
                </div>
            </form>

            <Dialog
                open={confirmBroadcast}
                onClose={() => setConfirmBroadcast(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>{t("broadcastTitle")}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="text-text-muted text-sm">
                        {t("broadcastMessage")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => setConfirmBroadcast(false)}
                        sx={{ color: "text.primary" }}
                    >
                        {t("broadcastCancel")}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => {
                            setConfirmBroadcast(false);
                            if (pendingFormData) void dispatchSend(pendingFormData);
                            setPendingFormData(null);
                        }}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-contrast)",
                        }}
                    >
                        {t("broadcastConfirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NotificationComposeForm;
