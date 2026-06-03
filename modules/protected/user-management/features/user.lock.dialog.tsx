"use client";
import { useTranslations } from "next-intl";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useUserManagement } from "../providers/user.management.provider";
import { getUserFullName } from "../utils/user.format";

const UserLockDialog = () => {
    const t = useTranslations("userManagement.lockDialog");
    const { confirmUser, closeLockDialog, toggleLock } = useUserManagement();
    const user = confirmUser;
    const isUnlock = user?.status === "UNACTIVE";
    const fullName = user ? getUserFullName(user) : "";

    return (
        <Dialog open={!!user} onClose={closeLockDialog} maxWidth="xs" fullWidth>
            {user && (
                <>
                    <DialogTitle>{isUnlock ? t("unlockTitle") : t("lockTitle")}</DialogTitle>
                    <DialogContent>
                        <p className="text-sm text-text-muted">
                            {isUnlock
                                ? t("unlockMessage", { name: fullName })
                                : t("lockMessage", { name: fullName })}
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={closeLockDialog}>
                            {t("cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={toggleLock}
                            color={isUnlock ? "success" : "error"}
                        >
                            {isUnlock ? t("unlockAction") : t("lockAction")}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default UserLockDialog;
