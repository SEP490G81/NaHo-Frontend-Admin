import React from "react";
import { getAvatarGradient, getPersonaInitials } from "../utils/persona.format";

interface PersonaAvatarProps {
    name: string;
    /** Image URL; empty falls back to initials on a gradient. */
    avatarUrl?: string;
    /** Seed for the gradient color; defaults to the name. */
    seed?: string;
    /** Tailwind size classes, e.g. "h-12 w-12". */
    sizeClassName?: string;
    textClassName?: string;
}

const PersonaAvatar = ({
    name,
    avatarUrl,
    seed,
    sizeClassName = "h-12 w-12",
    textClassName = "text-sm",
}: PersonaAvatarProps) => {
    if (avatarUrl) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={avatarUrl}
                alt={name}
                className={`${sizeClassName} shrink-0 rounded-full object-cover`}
            />
        );
    }

    return (
        <div
            className={`${sizeClassName} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(
                seed ?? name,
            )} font-bold text-white ${textClassName}`}
        >
            {getPersonaInitials(name)}
        </div>
    );
};

export default PersonaAvatar;
