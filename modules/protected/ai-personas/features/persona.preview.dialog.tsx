"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    IconButton,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { toast } from "react-toastify";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import {
    AzureVoice,
    ConversationRegister,
} from "@/types/enums/persona.enum";
import { previewVoice } from "@/services/client/persona.service";
import PersonaAvatar from "../components/persona.avatar";
import PersonaRegisterBadge from "../components/persona.register.badge";

export interface PersonaPreviewDraft {
    name: string;
    avatarUrl: string;
    greeting: string;
    defaultRegister: ConversationRegister;
    voice: AzureVoice;
}

interface PreviewMessage {
    sender: "AI" | "USER";
    jp: string;
    vi?: string;
}

/** Canned, register-appropriate AI replies (mock only — no real LLM). */
const MOCK_REPLIES: Record<ConversationRegister, { jp: string; vi: string }[]> =
    {
        CASUAL: [
            { jp: "へえ、いいね！それでどうなったの？", vi: "Ồ, hay đấy! Rồi sao nữa?" },
            { jp: "なるほど〜。私もそう思う！", vi: "Hiểu rồi~. Mình cũng nghĩ vậy đó!" },
            { jp: "そうなんだ！もっと聞かせて？", vi: "Thật à! Kể thêm cho mình nghe đi?" },
        ],
        OFFICE: [
            {
                jp: "なるほど、承知しました。もう少し詳しく教えていただけますか？",
                vi: "Tôi hiểu rồi. Bạn có thể nói rõ hơn một chút không?",
            },
            {
                jp: "ありがとうございます。その点を確認させてください。",
                vi: "Cảm ơn bạn. Cho phép tôi xác nhận lại điểm đó.",
            },
            {
                jp: "かしこまりました。では次に進みましょう。",
                vi: "Đã rõ. Vậy chúng ta tiếp tục nhé.",
            },
        ],
        INTERVIEW: [
            {
                jp: "なるほど。では、具体的な例を挙げていただけますか？",
                vi: "Tôi hiểu. Vậy bạn có thể nêu một ví dụ cụ thể không?",
            },
            {
                jp: "ありがとうございます。次の質問に移ります。",
                vi: "Cảm ơn bạn. Chúng ta chuyển sang câu hỏi tiếp theo.",
            },
            {
                jp: "その経験から何を学びましたか？",
                vi: "Bạn đã học được điều gì từ trải nghiệm đó?",
            },
        ],
    };

const DEFAULT_GREETING = {
    jp: "こんにちは！何について話しましょうか？",
    vi: "Xin chào! Chúng ta nói về chủ đề gì nhé?",
};

const PreviewBody = ({
    draft,
    onClose,
}: {
    draft: PersonaPreviewDraft;
    onClose: () => void;
}) => {
    const t = useTranslations("aiPersonas.preview");

    const firstMessage: PreviewMessage = draft.greeting
        ? { sender: "AI", jp: draft.greeting }
        : { sender: "AI", jp: DEFAULT_GREETING.jp, vi: DEFAULT_GREETING.vi };

    const [messages, setMessages] = useState<PreviewMessage[]>([firstMessage]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        const aiCount = messages.filter((m) => m.sender === "AI").length;
        const pool = MOCK_REPLIES[draft.defaultRegister];
        const reply = pool[(aiCount - 1 + pool.length) % pool.length] ?? pool[0];
        setMessages((prev) => [
            ...prev,
            { sender: "USER", jp: text },
            { sender: "AI", jp: reply.jp, vi: reply.vi },
        ]);
        setInput("");
    };

    const handlePlay = (text: string) => {
        if (!text) return;
        void previewVoice(draft.voice).then(() => toast.info(t("playAudio")));
    };

    const displayName = draft.name.trim() || "AI";

    return (
        <DialogContent className="bg-bgc-app">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <PersonaAvatar
                        name={displayName}
                        avatarUrl={draft.avatarUrl}
                    />
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-bold">
                            {displayName}
                            <PersonaRegisterBadge
                                register={draft.defaultRegister}
                            />
                        </h2>
                        <p className="text-text-muted text-xs">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </div>

            <div className="border-bdc-muted bg-bgc-page mt-4 max-h-80 space-y-3 overflow-y-auto rounded-lg border p-3">
                {messages.map((m, i) =>
                    m.sender === "AI" ? (
                        <div key={i} className="flex justify-start">
                            <div className="bg-bgc-app border-bdc-muted max-w-[80%] space-y-1 rounded-xl border px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">{m.jp}</p>
                                    <button
                                        type="button"
                                        onClick={() => handlePlay(m.jp)}
                                        className="text-bgc-highlight shrink-0"
                                        aria-label={t("playAudio")}
                                    >
                                        <VolumeUpOutlinedIcon fontSize="inherit" />
                                    </button>
                                </div>
                                {m.vi && (
                                    <p className="text-text-muted text-xs italic">
                                        {t("translatePrefix")}: {m.vi}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div key={i} className="flex justify-end">
                            <div className="bg-bgc-highlight text-text-contrast max-w-[80%] rounded-xl px-3 py-2 text-sm">
                                {m.jp}
                            </div>
                        </div>
                    ),
                )}
            </div>

            <p className="text-text-muted mt-2 text-xs">{t("disclaimer")}</p>

            <div className="mt-3">
                <TextFieldCustom
                    fullWidth
                    size="small"
                    placeholder={t("inputPlaceholder")}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleSend}
                                        size="small"
                                        sx={{ color: "var(--color-bgc-highlight)" }}
                                        aria-label={t("send")}
                                    >
                                        <SendOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>
        </DialogContent>
    );
};

const PersonaPreviewDialog = ({
    open,
    draft,
    onClose,
}: {
    open: boolean;
    draft: PersonaPreviewDraft;
    onClose: () => void;
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
        >
            <PreviewBody draft={draft} onClose={onClose} />
        </Dialog>
    );
};

export default PersonaPreviewDialog;
