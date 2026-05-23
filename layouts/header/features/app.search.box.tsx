import React from "react";
import { useTranslations } from "next-intl";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";

const AppSearchBox = () => {
    const t = useTranslations();

    return (
        <form>
            <TextFieldCustom
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary" />
                            </InputAdornment>
                        ),
                        sx: {
                            width: "400px",
                        },
                    },
                }}
                size="small"
                variant="outlined"
                placeholder={t("layout.header.appSearchBoxPlaceholder")}
            />
        </form>
    );
};

export default AppSearchBox;
