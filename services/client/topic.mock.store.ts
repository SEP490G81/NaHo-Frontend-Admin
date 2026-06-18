import { MOCK_TOPICS } from "@/app/api/_mock/topic.data";
import {
    FuriganaTokenItem,
    QuestionResponse,
    TopicDetailResponse,
    TopicResponse,
} from "@/types/responses/topic.response";
import { JlptLevel } from "@/types/enums/user.enum";
import { TopicStatus } from "@/types/enums/topic.enum";

/**
 * Client-side mock persistence backed by localStorage.
 * TODO: replace these helpers with real API calls when BE is ready.
 */
const KEY = "naho_mock_topics_v2";
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const readAll = (): TopicDetailResponse[] => {
    if (typeof window === "undefined") return clone(MOCK_TOPICS);
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
        window.localStorage.setItem(KEY, JSON.stringify(MOCK_TOPICS));
        return clone(MOCK_TOPICS);
    }
    try {
        return JSON.parse(raw) as TopicDetailResponse[];
    } catch {
        return clone(MOCK_TOPICS);
    }
};

const writeAll = (list: TopicDetailResponse[]) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(KEY, JSON.stringify(list));
    }
};

const toListItem = ({
    questions,
    ...rest
}: TopicDetailResponse): TopicResponse => ({
    ...rest,
    questionCount: questions.length,
});

export const storeListTopics = (
    search?: string,
    level?: string,
    status?: string,
): TopicResponse[] =>
    readAll()
        .filter((topic) => {
            if (level && topic.jlptLevel !== level) return false;
            if (status && topic.status !== status) return false;
            if (search) {
                const haystack = `${topic.name} ${topic.description}`.toLowerCase();
                if (!haystack.includes(search.toLowerCase())) return false;
            }
            return true;
        })
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map(toListItem);

export const storeGetTopic = (id: string): TopicDetailResponse | undefined =>
    readAll().find((topic) => topic.id === id);

export const storeCreateTopic = (input: {
    name: string;
    jlptLevel: JlptLevel;
    status: TopicStatus;
    description: string;
    coverImageUrl?: string;
}): TopicDetailResponse => {
    const list = readAll();
    const topic: TopicDetailResponse = {
        id: `t-${Date.now()}`,
        name: input.name,
        jlptLevel: input.jlptLevel,
        status: input.status,
        description: input.description,
        coverImageUrl: input.coverImageUrl,
        orderIndex: list.length + 1,
        questionCount: 0,
        averageScore: 0,
        questions: [],
    };
    writeAll([...list, topic]);
    return topic;
};

export const storeUpdateTopic = (
    id: string,
    patch: Partial<TopicDetailResponse>,
) => {
    writeAll(
        readAll().map((topic) =>
            topic.id === id ? { ...topic, ...patch } : topic,
        ),
    );
};

export const storeDeleteTopic = (id: string) => {
    writeAll(readAll().filter((topic) => topic.id !== id));
};

export const storeReorder = (orderedIds: string[]) => {
    const list = readAll();
    const reordered = orderedIds
        .map((id, index) => {
            const found = list.find((topic) => topic.id === id);
            return found ? { ...found, orderIndex: index + 1 } : null;
        })
        .filter((topic): topic is TopicDetailResponse => topic !== null);
    if (reordered.length === list.length) writeAll(reordered);
};

export const storeSaveQuestion = (
    topicId: string,
    question: QuestionResponse,
) => {
    writeAll(
        readAll().map((topic) => {
            if (topic.id !== topicId) return topic;
            const exists = topic.questions.some((q) => q.id === question.id);
            const questions = exists
                ? topic.questions.map((q) =>
                      q.id === question.id ? question : q,
                  )
                : [...topic.questions, question];
            return { ...topic, questions, questionCount: questions.length };
        }),
    );
};

export const storeDeleteQuestion = (topicId: string, questionId: string) => {
    writeAll(
        readAll().map((topic) => {
            if (topic.id !== topicId) return topic;
            const questions = topic.questions.filter((q) => q.id !== questionId);
            return { ...topic, questions, questionCount: questions.length };
        }),
    );
};

export const storeReorderQuestions = (
    topicId: string,
    orderedIds: string[],
) => {
    writeAll(
        readAll().map((topic) => {
            if (topic.id !== topicId) return topic;
            const reordered = orderedIds
                .map((id) => topic.questions.find((q) => q.id === id))
                .filter((q): q is QuestionResponse => q !== undefined);
            if (reordered.length !== topic.questions.length) return topic;
            return { ...topic, questions: reordered };
        }),
    );
};

export const storeTokenize = (
    text: string,
): { furigana: string; tokens: FuriganaTokenItem[] } => {
    const dict = new Map<string, string>();
    for (const topic of readAll()) {
        for (const question of topic.questions) {
            if (question.jp && question.furigana)
                dict.set(question.jp, question.furigana);
            for (const vocab of question.vocab) {
                if (vocab.jp && vocab.furigana) dict.set(vocab.jp, vocab.furigana);
            }
        }
    }
    const full = dict.get(text);
    if (full) return { furigana: full, tokens: [{ text, reading: full }] };

    const keys = [...dict.keys()].sort((a, b) => b.length - a.length);
    const tokens: FuriganaTokenItem[] = [];
    let i = 0;
    while (i < text.length) {
        const match = keys.find((k) => text.startsWith(k, i));
        if (match) {
            tokens.push({ text: match, reading: dict.get(match) ?? match });
            i += match.length;
        } else {
            tokens.push({ text: text[i], reading: text[i] });
            i += 1;
        }
    }
    return { furigana: tokens.map((t) => t.reading).join(""), tokens };
};
