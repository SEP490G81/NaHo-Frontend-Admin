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
    const { users, totalCount, roleOptions, openDetail, openLockDialog } = useUserManagement();

    const getRoleLabel = (accountType: string) =>
        roleOptions.find((r) => r.code === accountType)?.name ?? accountType;

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("table.columns.fullName")}</TableCell>
                            <TableCell>{t("table.columns.email")}</TableCell>
                            <TableCell>{t("table.columns.role")}</TableCell>
                            <TableCell>{t("table.columns.streak")}</TableCell>
                            <TableCell>{t("table.columns.targetLevel")}</TableCell>
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
                                    roleLabel={getRoleLabel(user.accountType)}
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
