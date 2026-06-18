import React from "react";

export interface FuriganaToken {
    text: string;
    reading?: string;
}

interface FuriganaTextProps {
    /** Full Japanese text (used when `tokens` is not provided) */
    jp: string;
    /** Whole-string reading shown as ruby above `jp` */
    furigana?: string;
    /**
     * Per-token readings (matches the BE `japanese_tokenizers` shape).
     * When provided, each token renders its own ruby; otherwise the whole
     * string gets a single ruby from `furigana`.
     */
    tokens?: FuriganaToken[];
    className?: string;
}

/**
 * Renders Japanese text with furigana ruby. Falls back to plain text when no
 * reading is available.
 */
const FuriganaText = ({ jp, furigana, tokens, className }: FuriganaTextProps) => {
    if (tokens && tokens.length > 0) {
        return (
            <span className={className}>
                {tokens.map((token, i) => (
                    <ruby key={i}>
                        {token.text}
                        {token.reading && (
                            <rt className="text-[0.6em]">{token.reading}</rt>
                        )}
                    </ruby>
                ))}
            </span>
        );
    }

    if (!furigana) {
        return <span className={className}>{jp}</span>;
    }

    return (
        <ruby className={className}>
            {jp}
            <rt className="text-[0.6em]">{furigana}</rt>
        </ruby>
    );
};

export default FuriganaText;
