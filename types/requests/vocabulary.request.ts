export interface CreateVocabularyRequest {
    japanese: string;
    reading: string;
    vietnameseMeaningText: string;
    englishMeaningText?: string;
}

export interface UpdateVocabularyRequest {
    japanese: string;
    reading: string;
    vietnameseMeaningText: string;
    englishMeaningText?: string;
}
