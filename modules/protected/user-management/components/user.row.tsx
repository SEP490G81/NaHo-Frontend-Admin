import { Chip, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { UserResponse } from "@/types/responses/user.response";
import UserAvatarChip from "./user.avatar.chip";
import UserStatusBadge from "./user.status.badge";

interface UserRowProps {
    user: UserResponse;
    roleLabel: string;
    viewLabel: string;
    lockLabel: string;
    unlockLabel: string;
    onView: (user: UserResponse) => void;
    onLock: (user: UserResponse) => void;
}

const UserRow = ({
    user,
    roleLabel,
    viewLabel,
    lockLabel,
    unlockLabel,
    onView,
    onLock,
}: UserRowProps) => {
    const isUnactive = user.status === "UNACTIVE";
    const hasFullName = !!user.fullName?.trim();

    return (
        <TableRow hover>
            <TableCell>
                <div className="flex items-center gap-3">
                    <UserAvatarChip fullName={user.fullName} size={40} />
                    <div className="min-w-0 leading-tight">
                        <p className="text-sm font-medium">
                            {hasFullName ? user.fullName : user.username}
                        </p>
                        {hasFullName && (
                            <p className="text-text-muted text-xs">@{user.username}</p>
                        )}
                    </div>
                </div>
            </TableCell>
            <TableCell className="text-text-muted">{user.email}</TableCell>
            <TableCell>
                <Chip label={roleLabel} size="small" variant="outlined" />
            </TableCell>
            <TableCell>
                <Chip label={user.jlptLevel} size="small" variant="outlined" />
            </TableCell>
            <TableCell>
                <UserStatusBadge status={user.status} />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <Tooltip title={viewLabel}>
                        <IconButton size="small" onClick={() => onView(user)}>
                            <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isUnactive ? unlockLabel : lockLabel}>
                        <IconButton
                            size="small"
                            onClick={() => onLock(user)}
                            color={isUnactive ? "success" : "error"}
                        >
                            {isUnactive ? (
                                <LockOpenOutlinedIcon fontSize="small" />
                            ) : (
                                <LockOutlinedIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default UserRow;
