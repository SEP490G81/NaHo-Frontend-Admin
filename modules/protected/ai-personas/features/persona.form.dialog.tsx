"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Autocomplete,
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
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { toast } from "react-toastify";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { JlptLevel } from "@/types/enums/user.enum";
import {
    AzureVoice,
    PersonaStatus,
    PolitenessStyle,
    SpeakingRate,
} from "@/types/enums/persona.enum";
import { PersonaResponse } from "@/types/responses/persona.response";
import { CreatePersonaRequest } from "@/types/requests/persona.request";
import { previewVoice } from "@/services/client/persona.service";
import { TopicOption } from "@/app/api/_mock/topic.options.data";
import {
    AVATAR_PRESETS,
    AZURE_VOICES,
    JLPT_LEVELS,
    PERSONA_PROMPT_MAX,
    POLITENESS_STYLES,
    RATE_KEY,
    SPEAKING_RATES,
    STYLE_KEY,
    VOICE_KEY,
} from "../constants/ai.personas.constant";
import { useAiPersonas } from "../providers/ai.personas.provider";
import { validatePersonaForm } from "../actions/persona.form.action";
import { PersonaFormState } from "../types/ai.personas.type";
import PersonaAvatar from "../components/persona.avatar";

interface PersonaFormBodyProps {
    persona: PersonaResponse | null;
    topicOptions: TopicOption[];
    isSaving: boolean;
    onClose: () => void;
    onCreate: (request: CreatePersonaRequest) => Promise<boolean>;
    onUpdate: (
        request: CreatePersonaRequest & { id: string },
    ) => Promise<boolean>;
}

const noError: PersonaFormState = {
    name: { value: "", error: false },
    role: { value: "", error: false },
    personaPrompt: { value: "", error: false },
};

/**
 * Form body. Mounted fresh each time the dialog opens (MUI Dialog unmounts
 * children on close) and keyed by persona id, so useState initialises
 * directly from props without a sync effect.
 */
const PersonaFormBody = ({
    persona,
    topicOptions,
    isSaving,
    onClose,
    onCreate,
    onUpdate,
}: PersonaFormBodyProps) => {
    const t = useTranslations("aiPersonas.form");
    const tStyle = useTranslations("aiPersonas.style");
    const tVoice = useTranslations("aiPersonas.voice");
    const tRate = useTranslations("aiPersonas.rate");

    const [errors, setErrors] = useState<PersonaFormState>(noError);
    const [name, setName] = useState(persona?.name ?? "");
    const [role, setRole] = useState(persona?.role ?? "");
    const [description, setDescription] = useState(persona?.description ?? "");
    const [jlptLevel, setJlptLevel] = useState<JlptLevel>(
        persona?.jlptLevel ?? "N3",
    );
    const [politenessStyle, setPolitenessStyle] = useState<PolitenessStyle>(
        persona?.politenessStyle ?? "CASUAL",
    );
    const [voice, setVoice] = useState<AzureVoice>(persona?.voice ?? "NANAMI");
    const [speakingRate, setSpeakingRate] = useState<SpeakingRate>(
        persona?.speakingRate ?? "NORMAL",
    );
    const [greeting, setGreeting] = useState(persona?.greeting ?? "");
    const [personaPrompt, setPersonaPrompt] = useState(
        persona?.personaPrompt ?? "",
    );
    const [status, setStatus] = useState<PersonaStatus>(
        persona?.status ?? "ACTIVE",
    );
    const [avatarPreset, setAvatarPreset] = useState(
        persona?.avatarPreset ?? "",
    );
    const [selectedTopics, setSelectedTopics] = useState<TopicOption[]>(
        topicOptions.filter((o) => persona?.topicIds.includes(o.id)),
    );
    const [isPreviewingVoice, setIsPreviewingVoice] = useState(false);

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
        const styleLabel = tStyle(STYLE_KEY[politenessStyle]);
        setPersonaPrompt(
            `Bạn là ${name || "[Tên]"}, đóng vai ${
                role || "[vai trò]"
            }. Hãy trò chuyện bằng tiếng Nhật trình độ JLPT ${jlptLevel} theo phong cách ${styleLabel}, giữ đúng tính cách nhân vật và khích lệ học viên luyện phản xạ hội thoại.`,
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const validation = validatePersonaForm(formData);
        setErrors(validation);
        if (
            validation.name.error ||
            validation.role.error ||
            validation.personaPrompt.error
        ) {
            return;
        }

        const payload: CreatePersonaRequest = {
            name: name.trim(),
            role: role.trim(),
            description: description.trim(),
            jlptLevel,
            politenessStyle,
            voice,
            speakingRate,
            greeting: greeting.trim(),
            personaPrompt: personaPrompt.trim(),
            topicIds: selectedTopics.map((o) => o.id),
            status,
            avatarPreset,
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

                {/* Ảnh đại diện (preset) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        {t("avatarLabel")}
                    </label>
                    <div className="flex items-center gap-3">
                        <PersonaAvatar
                            name={name}
                            avatarPreset={avatarPreset}
                            seed={persona?.id ?? name}
                            sizeClassName="h-14 w-14"
                            textClassName="text-2xl"
                        />
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setAvatarPreset("")}
                                className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                                    avatarPreset === ""
                                        ? "border-bgc-highlight bg-hbgc-app"
                                        : "border-bdc-muted"
                                }`}
                                title={t("avatarInitials")}
                            >
                                Aa
                            </button>
                            {AVATAR_PRESETS.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setAvatarPreset(emoji)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg transition-colors ${
                                        avatarPreset === emoji
                                            ? "border-bgc-highlight bg-hbgc-app"
                                            : "border-bdc-muted"
                                    }`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
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
                        <label htmlFor="role" className="text-sm font-medium">
                            {t("roleLabel")}{" "}
                            <span className="text-bgc-error">*</span>
                        </label>
                        <TextFieldCustom
                            name="role"
                            id="role"
                            fullWidth
                            size="small"
                            placeholder={t("rolePlaceholder")}
                            value={role}
                            error={errors.role.error}
                            helperText={
                                errors.role.error ? t("roleRequired") : ""
                            }
                            onChange={(e) => setRole(e.target.value)}
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

                {/* JLPT + Phong cách */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {t("jlptLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={jlptLevel}
                            onChange={(e) =>
                                setJlptLevel(e.target.value as JlptLevel)
                            }
                        >
                            {JLPT_LEVELS.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {t("styleLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={politenessStyle}
                            onChange={(e) =>
                                setPolitenessStyle(
                                    e.target.value as PolitenessStyle,
                                )
                            }
                        >
                            {POLITENESS_STYLES.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {tStyle(STYLE_KEY[s])}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Giọng đọc + Tốc độ nói */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
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
                            onChange={(e) =>
                                setVoice(e.target.value as AzureVoice)
                            }
                        >
                            {AZURE_VOICES.map((v) => (
                                <MenuItem key={v} value={v}>
                                    {tVoice(VOICE_KEY[v])}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            {t("rateLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={speakingRate}
                            onChange={(e) =>
                                setSpeakingRate(e.target.value as SpeakingRate)
                            }
                        >
                            {SPEAKING_RATES.map((r) => (
                                <MenuItem key={r} value={r}>
                                    {tRate(RATE_KEY[r])}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
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

                {/* Gắn chủ đề */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        {t("topicsLabel")}
                    </label>
                    <Autocomplete
                        multiple
                        size="small"
                        options={topicOptions}
                        value={selectedTopics}
                        onChange={(_, value) => setSelectedTopics(value)}
                        getOptionLabel={(option) =>
                            `${option.name} · ${option.jlptLevel}`
                        }
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextFieldCustom
                                {...params}
                                placeholder={
                                    selectedTopics.length === 0
                                        ? t("topicsPlaceholder")
                                        : ""
                                }
                            />
                        )}
                    />
                    <p className="text-text-muted text-xs">{t("topicsHint")}</p>
                </div>

                {/* Persona Prompt */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="personaPrompt"
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
                        name="personaPrompt"
                        id="personaPrompt"
                        fullWidth
                        multiline
                        minRows={5}
                        placeholder={t("promptPlaceholder")}
                        value={personaPrompt}
                        error={errors.personaPrompt.error}
                        helperText={
                            errors.personaPrompt.error
                                ? t("promptRequired")
                                : ""
                        }
                        slotProps={{
                            htmlInput: { maxLength: PERSONA_PROMPT_MAX },
                        }}
                        onChange={(e) => setPersonaPrompt(e.target.value)}
                    />
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-text-muted text-xs">
                            {t("promptHint")}
                        </p>
                        <p className="text-text-muted shrink-0 text-xs">
                            {personaPrompt.length}/{PERSONA_PROMPT_MAX}
                        </p>
                    </div>
                </div>

                <div className="border-bdc-primary flex justify-end gap-3 border-t pt-5">
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
            </form>
        </DialogContent>
    );
};

const PersonaFormDialog = () => {
    const {
        topicOptions,
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
                topicOptions={topicOptions}
                isSaving={isSaving}
                onClose={closeForm}
                onCreate={createPersona}
                onUpdate={updatePersona}
            />
        </Dialog>
    );
};

export default PersonaFormDialog;
