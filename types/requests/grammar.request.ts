export interface CreateGrammarRequest {
    japanese: string;
    reading: string;
    vietnameseMeaningText: string;
    englishMeaningText?: string;
}

export interface UpdateGrammarRequest {
    japanese: string;
    reading: string;
    vietnameseMeaningText: string;
    englishMeaningText?: string;
}
