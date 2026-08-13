"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);
    const t = useTranslations("userManagement.actions");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 360) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <div className="fixed right-6 bottom-6 z-50 transition-opacity duration-300">
            <Tooltip title={t("scrollToTop")} placement="left">
                <IconButton
                    onClick={scrollToTop}
                    size="medium"
                    aria-label="scroll to top"
                    sx={{
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#ffffff",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            filter: "brightness(1.1)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                    }}
                >
                    <ArrowUp className="h-5 w-5" />
                </IconButton>
            </Tooltip>
        </div>
    );
}
