import { NextResponse } from "next/server";
import { MOCK_TOPICS } from "@/app/api/_mock/topic.data";
import { FuriganaTokenItem } from "@/types/responses/topic.response";

/**
 * Builds a reading dictionary (japanese text -> furigana) from the mock data:
 * full question sentences and target vocabulary. Mirrors what the BE
 * `japanese_tokenizers` table would provide.
 */
const buildReadingDictionary = (): Map<string, string> => {
    const dict = new Map<string, string>();
    for (const topic of MOCK_TOPICS) {
        for (const question of topic.questions) {
            if (question.jp && question.furigana) {
                dict.set(question.jp, question.furigana);
            }
            for (const vocab of question.vocab) {
                if (vocab.jp && vocab.furigana) dict.set(vocab.jp, vocab.furigana);
            }
        }
    }
    return dict;
};

const READING_DICT = buildReadingDictionary();

/** Greedy longest-match tokenizer over the known dictionary keys. */
const tokenize = (text: string): FuriganaTokenItem[] => {
    const keys = [...READING_DICT.keys()].sort((a, b) => b.length - a.length);
    const tokens: FuriganaTokenItem[] = [];
    let i = 0;
    while (i < text.length) {
        const match = keys.find((k) => text.startsWith(k, i));
        if (match) {
            tokens.push({ text: match, reading: READING_DICT.get(match) ?? match });
            i += match.length;
        } else {
            tokens.push({ text: text[i], reading: text[i] });
            i += 1;
        }
    }
    return tokens;
};

export const mockTokenizeResponse = (text: string) => {
    const full = READING_DICT.get(text);
    const tokens = full ? [{ text, reading: full }] : tokenize(text);
    const furigana = tokens.map((t) => t.reading).join("");
    return NextResponse.json({
        meta: { traceId: "mock", timestamp: new Date().toISOString() },
        message: "OK (mock)",
        data: { furigana, tokens },
    });
};
