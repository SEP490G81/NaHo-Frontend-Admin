export interface NestedVocabularyUpsertRequest {
    id: number | null;
    reading?: string;
    japanese?: string;
    vietnameseMeaningText?: string;
    englishMeaningText?: string;
}

export interface NestedGrammarUpsertRequest {
    id: number | null;
    reading?: string;
    japanese?: string;
    vietnameseMeaningText?: string;
    englishMeaningText?: string;
}

export interface UpdateSpeakingQuestionRequest {
    japaneseName?: string;
    vietnameseName?: string;
    description?: string;
    japaneseSampleAnswer?: string;
    vietnameseSampleAnswer?: string;
    englishSampleAnswer?: string;
    vocabularies?: NestedVocabularyUpsertRequest[];
    grammars?: NestedGrammarUpsertRequest[];
}

export interface UpdateVocabularyQuestionRequest {
    vocabularies?: NestedVocabularyUpsertRequest[];
}
