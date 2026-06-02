"use client";
import { useTranslations } from "next-intl";
import {
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import SkillBar from "../components/skill.bar";
import UserAvatarChip from "../components/user.avatar.chip";
import UserStatusBadge from "../components/user.status.badge";
import UserStreakCalendar from "../components/user.streak.calendar";
import { useUserManagement } from "../providers/user.management.provider";
import { getUserFullName } from "../utils/user.format";

const UserDetailModal = () => {
    const t = useTranslations("userManagement.detail");
    const { isDetailModalOpen, selectedUser, isDetailLoading, closeDetail, roleOptions } =
        useUserManagement();
    const user = selectedUser;
    const fullName = user ? getUserFullName(user) : "";
    const roleLabel = user
        ? (roleOptions.find((r) => r.code === user.accountType)?.name ?? user.accountType)
        : "";

    return (
        <Dialog open={isDetailModalOpen} onClose={closeDetail} maxWidth="sm" fullWidth>
            {isDetailLoading ? (
                <DialogContent sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress sx={{ color: "var(--color-bgc-highlight)" }} />
                </DialogContent>
            ) : user ? (
                <>
                    <DialogTitle component="div">
                        <p className="text-lg font-semibold">
                            {t("title", { name: fullName })}
                        </p>
                        <p className="mt-0.5 text-sm font-normal text-text-muted">
                            {t("description")}
                        </p>
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 rounded-lg border border-bdc-primary p-3">
                                <UserAvatarChip fullName={fullName} size={44} />
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold">{fullName}</p>
                                    <p className="text-sm text-text-muted">{user.email}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Chip label={roleLabel} size="small" variant="outlined" />
                                    <Chip label={user.jlptLevel} size="small" variant="outlined" />
                                    <UserStatusBadge status={user.status} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <StatBox
                                    label={t("stats.totalMinutes")}
                                    value={t("stats.minutes", { value: user.totalPracticeMinutes })}
                                />
                                <StatBox
                                    label={t("stats.currentStreak")}
                                    value={t("stats.days", { value: user.currentStreak })}
                                />
                                <StatBox
                                    label={t("stats.weekSessions")}
                                    value={String(user.sessionsThisWeek)}
                                />
                            </div>
                            <UserStreakCalendar
                                streakLogs={user.streakLogs}
                                title={t("streakLog")}
                            />
                            <div>
                                <p className="mb-3 text-sm font-semibold">{t("skills.title")}</p>
                                <div className="space-y-3">
                                    <SkillBar label={t("skills.pronunciation")} value={user.skills.pronunciation} />
                                    <SkillBar label={t("skills.vocabulary")} value={user.skills.vocabulary} />
                                    <SkillBar label={t("skills.grammar")} value={user.skills.grammar} />
                                    <SkillBar label={t("skills.naturalness")} value={user.skills.naturalness} />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={closeDetail} disableElevation>
                            {t("close")}
                        </Button>
                    </DialogActions>
                </>
            ) : null}
        </Dialog>
    );
};

export default UserDetailModal;

const StatBox = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="rounded-lg border border-bdc-primary p-3">
            <p className="text-xs text-text-muted">{label}</p>
            <p className="mt-1 text-lg font-bold">{value}</p>
        </div>
    );
};
