import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const NAMESPACES = ["common", "user-management"] as const;

type Messages = Record<string, unknown>;

const deepMerge = (target: Messages, source: Messages): Messages => {
    for (const key of Object.keys(source)) {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (
            sourceValue &&
            typeof sourceValue === "object" &&
            !Array.isArray(sourceValue)
        ) {
            target[key] = deepMerge(
                (targetValue as Messages) ?? {},
                sourceValue as Messages,
            );
        } else {
            target[key] = sourceValue;
        }
    }
    return target;
};

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;

    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const modules = await Promise.all(
        NAMESPACES.map((ns) => import(`../messages/${locale}/${ns}.json`)),
    );
    const messages = modules.reduce<Messages>(
        (acc, mod) => deepMerge(acc, mod.default as Messages),
        {},
    );

    return { locale, messages };
});
