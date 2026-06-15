/** Phong cách lịch sự (politeness register) the AI persona speaks with. */
const PolitenessStyle = Object.freeze({
    CASUAL: "CASUAL",
    BUSINESS: "BUSINESS",
    KEIGO: "KEIGO",
});
export type PolitenessStyle =
    (typeof PolitenessStyle)[keyof typeof PolitenessStyle];

/**
 * Azure TTS neural voice used to read the persona's lines.
 * Values map to real Azure `ja-JP-*Neural` voice ids when wiring the real API.
 */
const AzureVoice = Object.freeze({
    NANAMI: "NANAMI",
    KEITA: "KEITA",
    AOI: "AOI",
    DAICHI: "DAICHI",
    SHIORI: "SHIORI",
    MAYU: "MAYU",
});
export type AzureVoice = (typeof AzureVoice)[keyof typeof AzureVoice];

/** Tốc độ đọc TTS, ánh xạ sang Azure `prosody rate` khi nối BE thật. */
const SpeakingRate = Object.freeze({
    SLOW: "SLOW",
    NORMAL: "NORMAL",
    FAST: "FAST",
});
export type SpeakingRate = (typeof SpeakingRate)[keyof typeof SpeakingRate];

/** Persona đang hoạt động (học viên thấy) hay còn nháp (ẩn). */
const PersonaStatus = Object.freeze({
    ACTIVE: "ACTIVE",
    DRAFT: "DRAFT",
});
export type PersonaStatus = (typeof PersonaStatus)[keyof typeof PersonaStatus];
