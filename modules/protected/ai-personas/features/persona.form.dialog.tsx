"use client";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Dialog,
    DialogContent,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { toast } from "react-toastify";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import {
    AzureVoice,
    ConversationRegister,
    PersonaStatus,
    SuggestedLevel,
} from "@/types/enums/persona.enum";
import { PersonaResponse } from "@/types/responses/persona.response";
import { CreatePersonaRequest } from "@/types/requests/persona.request";
import { previewVoice } from "@/services/client/persona.service";
import {
    AVATAR_ACCEPT,
    AVATAR_MAX_BYTES,
    AZURE_VOICES,
    CONVERSATION_REGISTERS,
    REGISTER_KEY,
    SUGGESTED_LEVELS,
    SYSTEM_PROMPT_MAX,
    VOICE_KEY,
} from "../constants/ai.personas.constant";
import { useAiPersonas } from "../providers/ai.personas.provider";
import { validatePersonaForm } from "../actions/persona.form.action";
import { PersonaFormState } from "../types/ai.personas.type";
import PersonaAvatar from "../components/persona.avatar";
import PersonaPreviewDialog from "./persona.preview.dialog";

interface PersonaFormBodyProps {
    persona: PersonaResponse | null;
    isSaving: boolean;
    onClose: () => void;
    onCreate: (request: CreatePersonaRequest) => Promise<boolean>;
    onUpdate: (
        request: CreatePersonaRequest & { id: string },
    ) => Promise<boolean>;
}

const noError: PersonaFormState = {
    name: { value: "", error: false },
    roleStyle: { value: "", error: false },
    systemPrompt: { value: "", error: false },
};

/**
 * Form body. Mounted fresh each time the dialog opens (MUI Dialog unmounts
 * children on close) and keyed by persona id, so useState initialises
 * directly from props without a sync effect.
 */
const PersonaFormBody = ({
    persona,
    isSaving,
    onClose,
    onCreate,
    onUpdate,
}: PersonaFormBodyProps) => {
    const t = useTranslations("aiPersonas.form");
    const tRegister = useTranslations("aiPersonas.register");
    const tVoice = useTranslations("aiPersonas.voice");
    const tLevelAll = useTranslations("aiPersonas");

    const [errors, setErrors] = useState<PersonaFormState>(noError);
    const [name, setName] = useState(persona?.name ?? "");
    const [roleStyle, setRoleStyle] = useState(persona?.roleStyle ?? "");
    const [description, setDescription] = useState(persona?.description ?? "");
    const [suggestedLevel, setSuggestedLevel] = useState<SuggestedLevel>(
        persona?.suggestedLevel ?? "ALL",
    );
    const [defaultRegister, setDefaultRegister] = useState<ConversationRegister>(
        persona?.defaultRegister ?? "CASUAL",
    );
    const [voice, setVoice] = useState<AzureVoice>(persona?.voice ?? "NANAMI");
    const [greeting, setGreeting] = useState(persona?.greeting ?? "");
    const [systemPrompt, setSystemPrompt] = useState(
        persona?.systemPrompt ?? "",
    );
    const [status, setStatus] = useState<PersonaStatus>(
        persona?.status ?? "ACTIVE",
    );
    const [avatarUrl, setAvatarUrl] = useState(persona?.avatarUrl ?? "");
    const [isPreviewingVoice, setIsPreviewingVoice] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!AVATAR_ACCEPT.includes(file.type)) {
            toast.error(t("avatarTypeError"));
            return;
        }
        if (file.size > AVATAR_MAX_BYTES) {
            toast.error(t("avatarSizeError"));
            return;
        }
        // MOCK: đọc thành data URL để xem trước. TODO: upload lên S3 và lưu file id.
        const reader = new FileReader();
        reader.onload = () => setAvatarUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handlePreviewVoice = async () => {
        setIsPreviewingVoice(true);
        try {
            await previewVoice(voice);
            toast.info(t("voicePreviewPlaying"));
        } finally {
            setIsPreviewingVoice(false);
        }
    };

    const handleInsertTemplate = () => {
        const registerLabel = tRegister(REGISTER_KEY[defaultRegister]);
        setSystemPrompt(
            `Bạn là ${name || "[Tên]"}, đóng vai ${
                roleStyle || "[vai trò]"
            }. Hãy trò chuyện bằng tiếng Nhật theo phong cách ${registerLabel}, giữ đúng tính cách nhân vật và khích lệ học viên luyện phản xạ hội thoại.`,
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const validation = validatePersonaForm(formData);
        setErrors(validation);
        if (
            validation.name.error ||
            validation.roleStyle.error ||
            validation.systemPrompt.error
        ) {
            return;
        }

        const payload: CreatePersonaRequest = {
            name: name.trim(),
            roleStyle: roleStyle.trim(),
            description: description.trim(),
            suggestedLevel,
            defaultRegister,
            voice,
            greeting: greeting.trim(),
            systemPrompt: systemPrompt.trim(),
            status,
            avatarUrl,
        };

        const ok = persona
            ? await onUpdate({ id: persona.id, ...payload })
            : await onCreate(payload);
        if (ok) onClose();
    };

    return (
        <DialogContent className="bg-bgc-app">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold">
                        {persona ? t("editTitle") : t("addTitle")}
                    </h2>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("subtitle")}
                    </p>
                </div>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                {/* Trạng thái */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={status === "ACTIVE"}
                            onChange={(e) =>
                                setStatus(e.target.checked ? "ACTIVE" : "DRAFT")
                            }
                            sx={{
                                "& .Mui-checked": {
                                    color: "var(--color-bgc-highlight)",
                                },
                                "& .Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "var(--color-bgc-highlight)",
                                },
                            }}
                        />
                    }
                    label={
                        <span className="text-sm font-medium">
                            {status === "ACTIVE"
                                ? t("statusActiveHint")
                                : t("statusDraftHint")}
                        </span>
                    }
                />

                {/* Ảnh đại diện (upload) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        {t("avatarLabel")}
                    </label>
                    <div className="flex items-center gap-4">
                        <PersonaAvatar
                            name={name}
                            avatarUrl={avatarUrl}
                            seed={persona?.id ?? name}
                            sizeClassName="h-16 w-16"
                            textClassName="text-lg"
                        />
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outlined"
                                    startIcon={<FileUploadOutlinedIcon />}
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={{ color: "text.primary" }}
                                >
                                    {t("avatarUpload")}
                                </Button>
                                {avatarUrl && (
                                    <button
                                        type="button"
                                        onClick={() => setAvatarUrl("")}
                                        className="text-bgc-error text-xs font-medium"
                                    >
                                        {t("avatarRemove")}
                                    </button>
                                )}
                            </div>
                            <p className="text-text-muted text-xs">
                                {t("avatarHint")}
                            </p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={AVATAR_ACCEPT.join(",")}
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                {/* Tên + Vai trò */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            {t("nameLabel")}{" "}
                            <span className="text-bgc-error">*</span>
                        </label>
                        <TextFieldCustom
                            name="name"
                            id="name"
                            fullWidth
                            size="small"
                            placeholder={t("namePlaceholder")}
                            value={name}
                            error={errors.name.error}
                            helperText={
                                errors.name.error ? t("nameRequired") : ""
                            }
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="roleStyle"
                            className="text-sm font-medium"
                        >
                            {t("roleLabel")}{" "}
                            <span className="text-bgc-error">*</span>
                        </label>
                        <TextFieldCustom
                            name="roleStyle"
                            id="roleStyle"
                            fullWidth
                            size="small"
                            placeholder={t("rolePlaceholder")}
                            value={roleStyle}
                            error={errors.roleStyle.error}
                            helperText={
                                errors.roleStyle.error ? t("roleRequired") : ""
                            }
                            onChange={(e) => setRoleStyle(e.target.value)}
                        />
                    </div>
                </div>

                {/* Mô tả ngắn */}
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                        {t("descriptionLabel")}
                    </label>
                    <TextFieldCustom
                        name="description"
                        id="description"
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder={t("descriptionPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Trình độ + Chế độ mặc định */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {t("levelLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={suggestedLevel}
                            onChange={(e) =>
                                setSuggestedLevel(
                                    e.target.value as SuggestedLevel,
                                )
                            }
                        >
                            {SUGGESTED_LEVELS.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level === "ALL"
                                        ? tLevelAll("levelAll")
                                        : level}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {t("registerLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={defaultRegister}
                            onChange={(e) =>
                                setDefaultRegister(
                                    e.target.value as ConversationRegister,
                                )
                            }
                        >
                            {CONVERSATION_REGISTERS.map((r) => (
                                <MenuItem key={r} value={r}>
                                    {tRegister(REGISTER_KEY[r])}
                                </MenuItem>
                            ))}
                        </Select>
                        <p className="text-text-muted text-xs">
                            {t("registerHint")}
                        </p>
                    </div>
                </div>

                {/* Giọng đọc */}
                <div className="space-y-2 sm:max-w-xs">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                            {t("voiceLabel")}
                        </label>
                        <button
                            type="button"
                            onClick={handlePreviewVoice}
                            disabled={isPreviewingVoice}
                            className="text-bgc-highlight flex items-center gap-1 text-xs font-medium disabled:opacity-50"
                        >
                            <VolumeUpOutlinedIcon fontSize="inherit" />
                            {t("voicePreview")}
                        </button>
                    </div>
                    <Select
                        fullWidth
                        size="small"
                        value={voice}
                        onChange={(e) => setVoice(e.target.value as AzureVoice)}
                    >
                        {AZURE_VOICES.map((v) => (
                            <MenuItem key={v} value={v}>
                                {tVoice(VOICE_KEY[v])}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                {/* Câu chào mở đầu */}
                <div className="space-y-2">
                    <label htmlFor="greeting" className="text-sm font-medium">
                        {t("greetingLabel")}
                    </label>
                    <TextFieldCustom
                        name="greeting"
                        id="greeting"
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder={t("greetingPlaceholder")}
                        value={greeting}
                        onChange={(e) => setGreeting(e.target.value)}
                    />
                    <p className="text-text-muted text-xs">
                        {t("greetingHint")}
                    </p>
                </div>

                {/* System Prompt */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="systemPrompt"
                            className="text-sm font-medium"
                        >
                            {t("promptLabel")}{" "}
                            <span className="text-bgc-error">*</span>
                        </label>
                        <button
                            type="button"
                            onClick={handleInsertTemplate}
                            className="text-bgc-highlight flex items-center gap-1 text-xs font-medium"
                        >
                            <AutoFixHighOutlinedIcon fontSize="inherit" />
                            {t("promptTemplate")}
                        </button>
                    </div>
                    <TextFieldCustom
                        name="systemPrompt"
                        id="systemPrompt"
                        fullWidth
                        multiline
                        minRows={5}
                        placeholder={t("promptPlaceholder")}
                        value={systemPrompt}
                        error={errors.systemPrompt.error}
                        helperText={
                            errors.systemPrompt.error
                                ? t("promptRequired")
                                : ""
                        }
                        slotProps={{
                            htmlInput: { maxLength: SYSTEM_PROMPT_MAX },
                        }}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                    />
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-text-muted text-xs">
                            {t("promptHint")}
                        </p>
                        <p className="text-text-muted shrink-0 text-xs">
                            {systemPrompt.length}/{SYSTEM_PROMPT_MAX}
                        </p>
                    </div>
                </div>

                <div className="border-bdc-primary flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        variant="outlined"
                        startIcon={<ChatBubbleOutlineOutlinedIcon />}
                        onClick={() => setIsPreviewOpen(true)}
                        sx={{
                            color: "var(--color-bgc-highlight)",
                            borderColor: "var(--color-bgc-highlight)",
                        }}
                    >
                        {t("tryOut")}
                    </Button>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ color: "text.primary" }}
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation
                            loading={isSaving}
                            sx={{
                                bgcolor: "var(--color-bgc-highlight)",
                                color: "var(--color-text-contrast)",
                            }}
                        >
                            {t("save")}
                        </Button>
                    </div>
                </div>
            </form>

            <PersonaPreviewDialog
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                draft={{
                    name,
                    avatarUrl,
                    greeting: greeting.trim(),
                    defaultRegister,
                    voice,
                }}
            />
        </DialogContent>
    );
};

const PersonaFormDialog = () => {
    const {
        isFormOpen,
        editingPersona,
        isSaving,
        closeForm,
        createPersona,
        updatePersona,
    } = useAiPersonas();

    return (
        <Dialog
            open={isFormOpen}
            onClose={closeForm}
            maxWidth="md"
            fullWidth
            slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
        >
            <PersonaFormBody
                key={editingPersona?.id ?? "new"}
                persona={editingPersona}
                isSaving={isSaving}
                onClose={closeForm}
                onCreate={createPersona}
                onUpdate={updatePersona}
            />
        </Dialog>
    );
};

export default PersonaFormDialog;
