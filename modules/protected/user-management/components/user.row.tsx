import React from "react";
import { Chip, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { UserResponse } from "@/types/responses/user.response";
import UserAvatarChip from "./user.avatar.chip";
import UserStatusBadge from "./user.status.badge";
import { getUserFullName } from "../utils/user.format";

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
    const isBanned = user.status === "BANNED";
    const fullName = getUserFullName(user);

    return (
        <TableRow hover>
            <TableCell>
                <div className="flex items-center gap-2">
                    <UserAvatarChip fullName={fullName} />
                    <span className="font-medium">{fullName}</span>
                </div>
            </TableCell>
            <TableCell className="text-text-muted">{user.email}</TableCell>
            <TableCell>
                <Chip label={roleLabel} size="small" variant="outlined" />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <LocalFireDepartmentIcon fontSize="small" sx={{ color: "var(--color-icon-fire)" }} />
                    <span>{user.currentStreak}</span>
                </div>
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
                    <Tooltip title={isBanned ? unlockLabel : lockLabel}>
                        <IconButton
                            size="small"
                            onClick={() => onLock(user)}
                            color={isBanned ? "success" : "error"}
                        >
                            {isBanned ? (
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
