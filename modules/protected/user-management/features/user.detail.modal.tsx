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
import UserAvatarChip from "../components/user.avatar.chip";
import UserStatusBadge from "../components/user.status.badge";
import { useUserManagement } from "../providers/user.management.provider";

const UserDetailModal = () => {
    const t = useTranslations("userManagement");
    const { isDetailModalOpen, selectedUser, isDetailLoading, closeDetail } =
        useUserManagement();
    const user = selectedUser;
    const displayName = user?.fullName ?? user?.username ?? "";

    const translateRole = (code: string) => {
        if (code === "ADMIN") return t("roles.ADMIN");
        if (code === "LEARNER") return t("roles.LEARNER");
        if (code === "CONTENT_MANAGER") return t("roles.CONTENT_MANAGER");
        return code;
    };
    const roleLabel = user && user.roleNames.length > 0
        ? translateRole(user.roleNames.find((r) => r !== "ADMIN") ?? user.roleNames[0])
        : "—";

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
                            {t("detail.title", { name: displayName })}
                        </p>
                        <p className="mt-0.5 text-sm font-normal text-text-muted">
                            {t("detail.description")}
                        </p>
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 rounded-lg border border-bdc-primary p-3">
                                <UserAvatarChip fullName={user.fullName} size={44} />
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold">{displayName}</p>
                                    <p className="text-sm text-text-muted">{user.email}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Chip label={roleLabel} size="small" variant="outlined" />
                                    <Chip label={user.jlptLevel} size="small" variant="outlined" />
                                    <UserStatusBadge status={user.status} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <InfoBox label={t("detail.fields.username")} value={user.username ?? "—"} />
                                <InfoBox
                                    label={t("detail.fields.gender")}
                                    value={user.gender ? t(`detail.gender.${user.gender}`) : "—"}
                                />
                                <InfoBox label={t("detail.fields.dob")} value={user.dob ?? "—"} />
                                <InfoBox label={t("detail.fields.jlptLevel")} value={user.jlptLevel ?? "—"} />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={closeDetail} disableElevation>
                            {t("detail.close")}
                        </Button>
                    </DialogActions>
                </>
            ) : null}
        </Dialog>
    );
};

export default UserDetailModal;

const InfoBox = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="rounded-lg border border-bdc-primary p-3">
            <p className="text-xs text-text-muted">{label}</p>
            <p className="mt-1 text-sm font-medium">{value}</p>
        </div>
    );
};
