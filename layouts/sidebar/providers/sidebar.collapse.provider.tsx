"use client";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";
import { usePathname } from "@/intl/i18n/navigation";
import { AllRoute } from "@/intl/type";

interface ISidebarCollapseProviderProps {
    isCollapse: boolean;
    setIsCollapse: Dispatch<SetStateAction<boolean>>;
}

const SidebarCollapseContext = createContext<
    ISidebarCollapseProviderProps | undefined
>(undefined);

export const SidebarCollapseProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const collapseLinks: AllRoute[] = [];

    const initialState = collapseLinks.includes(pathname);

    const [isCollapse, setIsCollapse] = useState<boolean>(initialState);

    const value = useMemo(
        () => ({
            isCollapse,
            setIsCollapse,
        }),
        [isCollapse],
    );

    return (
        <SidebarCollapseContext.Provider value={value}>
            {children}
        </SidebarCollapseContext.Provider>
    );
};

export const useSidebarCollapse = () => {
    const context = useContext(SidebarCollapseContext);
    if (!context) {
        throw new Error("providers error");
    }
    return context;
};
