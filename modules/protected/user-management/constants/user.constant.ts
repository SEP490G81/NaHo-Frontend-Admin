import { JlptLevel } from "@/types/enums/user.enum";
import { UserFilters } from "../types/user.type";

export const JLPT_LEVELS: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export const DEFAULT_FILTERS: UserFilters = {
    userNameOrEmail: "",
    role: "all",
    jlptLevel: "all",
    status: "all",
};
