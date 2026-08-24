import { VocabularyResponse, GrammarResponse } from "./vocabulary.response";

export interface SpeakingQuestionResponse {
    id: number;
    japaneseName?: string;
    japaneseNameMarkup?: string;
    vietnameseName?: string;
    description?: string;
    descriptionMarkup?: string;
    japaneseSampleAnswer?: string;
    japaneseSampleAnswerMarkup?: string;
    vietnameseSampleAnswer?: string;
    englishSampleAnswer?: string;
    vocabularies?: VocabularyResponse[];
    grammars?: GrammarResponse[];
}

export interface VocabularyQuestionResponse {
    id: number;
    vocabularies?: VocabularyResponse[];
}
