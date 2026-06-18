import { Chip, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { UserResponse } from "@/types/responses/user.response";
import UserAvatarChip from "./user.avatar.chip";
import UserStatusBadge from "./user.status.badge";

interface UserRowProps {
    user: UserResponse;
    roleLabels: string[];
    viewLabel: string;
    lockLabel: string;
    unlockLabel: string;
    onView: (user: UserResponse) => void;
    onLock: (user: UserResponse) => void;
}

const UserRow = ({
    user,
    roleLabels,
    viewLabel,
    lockLabel,
    unlockLabel,
    onView,
    onLock,
}: UserRowProps) => {
    const isUnactive = user.status === "UNACTIVE";

    return (
        <TableRow hover>
            <TableCell sx={{ width: 56, padding: 0 }}>
                <UserAvatarChip fullName={user.fullName} size={40} />
            </TableCell>
            <TableCell>
                <div className="leading-tight">
                    {user.fullName ? (
                        <>
                            <p className="text-sm font-medium">{user.fullName}</p>
                            <p className="text-text-muted text-xs">@{user.username}</p>
                        </>
                    ) : (
                        <p className="text-text-muted text-sm">@{user.username}</p>
                    )}
                </div>
            </TableCell>
            <TableCell className="text-text-muted">{user.email}</TableCell>
            <TableCell>
                {roleLabels.length === 0 ? (
                    <span className="text-text-muted">—</span>
                ) : (
                    <div className="flex flex-wrap gap-1">
                        {roleLabels.map((label) => (
                            <Chip key={label} label={label} size="small" variant="outlined" />
                        ))}
                    </div>
                )}
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
