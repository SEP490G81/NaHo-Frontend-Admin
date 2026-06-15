import React from "react";
import { getAvatarGradient, getPersonaInitials } from "../utils/persona.format";

interface PersonaAvatarProps {
    name: string;
    /** Emoji preset; empty falls back to initials. */
    avatarPreset?: string;
    /** Seed for the gradient color; defaults to the name. */
    seed?: string;
    /** Tailwind size classes, e.g. "h-12 w-12". */
    sizeClassName?: string;
    textClassName?: string;
}

const PersonaAvatar = ({
    name,
    avatarPreset,
    seed,
    sizeClassName = "h-12 w-12",
    textClassName = "text-sm",
}: PersonaAvatarProps) => {
    return (
        <div
            className={`${sizeClassName} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(
                seed ?? name,
            )} font-bold text-white ${textClassName}`}
        >
            {avatarPreset ? (
                <span className="leading-none">{avatarPreset}</span>
            ) : (
                getPersonaInitials(name)
            )}
        </div>
    );
};

export default PersonaAvatar;
