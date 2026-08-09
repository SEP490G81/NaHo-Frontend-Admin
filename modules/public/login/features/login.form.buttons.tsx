import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const LoginFormButtons = ({ errorMessage }: { errorMessage: string }) => {
    const t = useTranslations();

    return (
        <div className="w-full">
            <Button type="submit" fullWidth color="primary" variant="contained">
                {t("login.form.loginButton")}
            </Button>

            {errorMessage.trim().length > 0 && (
                <p className="text-text-error mt-1 text-xs font-semibold">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default LoginFormButtons;
