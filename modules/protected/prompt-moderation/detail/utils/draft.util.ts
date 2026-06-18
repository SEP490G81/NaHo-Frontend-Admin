import {
    GrammarItem,
    VocabularyItem,
} from "@/types/responses/custom.question.response";

let counter = 0;
const newId = (prefix: string) => `${prefix}-new-${Date.now()}-${counter++}`;

export const createVocabItem = (): VocabularyItem => ({
    id: newId("v"),
    japaneseWord: "",
    furiganaMarkup: "",
    vietnameseMeaning: "",
    englishMeaning: "",
});

export const createGrammarItem = (): GrammarItem => ({
    id: newId("g"),
    japanesePattern: "",
    furiganaMarkup: "",
    vietnameseMeaning: "",
    englishMeaning: "",
    explanation: "",
});
