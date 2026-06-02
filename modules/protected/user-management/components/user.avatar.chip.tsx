import { Avatar } from "@mui/material";

interface UserAvatarChipProps {
    fullName: string;
    size?: number;
}

const getInitial = (fullName: string): string => {
    const parts = fullName.trim().split(" ");
    return (parts[parts.length - 1]?.charAt(0) ?? "?").toUpperCase();
};

const UserAvatarChip = ({ fullName, size = 36 }: UserAvatarChipProps) => {
    return (
        <Avatar
            sx={{
                width: size,
                height: size,
                fontSize: size * 0.4,
                fontWeight: 600,
                bgcolor: "var(--color-bgc-highlight)",
            }}
        >
            {getInitial(fullName)}
        </Avatar>
    );
};

export default UserAvatarChip;
