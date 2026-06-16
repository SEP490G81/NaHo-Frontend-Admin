"use client";
import { useTranslations } from "next-intl";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import UserRow from "../components/user.row";
import { useUserManagement } from "../providers/user.management.provider";

const UserTable = () => {
    const t = useTranslations("userManagement");
    const { users, totalCount, openDetail, openLockDialog } = useUserManagement();

    const translateRole = (code: string) => {
        if (code === "ADMIN") return t("roles.ADMIN");
        if (code === "LEARNER") return t("roles.LEARNER");
        if (code === "CONTENT_MANAGER") return t("roles.CONTENT_MANAGER");
        return code;
    };
    const getRoleLabels = (roleNames: string[]) => roleNames.map(translateRole);

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 56, padding: 0 }} />
                            <TableCell>{t("table.columns.fullName")}</TableCell>
                            <TableCell>{t("table.columns.email")}</TableCell>
                            <TableCell>{t("table.columns.role")}</TableCell>
                            <TableCell>{t("table.columns.jlptLevel")}</TableCell>
                            <TableCell>{t("table.columns.status")}</TableCell>
                            <TableCell>{t("table.columns.actions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" className="py-8 text-text-muted">
                                    {t("table.empty")}
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    roleLabels={getRoleLabels(user.roleNames)}
                                    viewLabel={t("actions.viewDetail")}
                                    lockLabel={t("actions.lock")}
                                    unlockLabel={t("actions.unlock")}
                                    onView={openDetail}
                                    onLock={openLockDialog}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <p className="mt-3 text-sm text-text-muted">
                {t("table.showing", { count: users.length, total: totalCount })}
            </p>
        </div>
    );
};

export default UserTable;
