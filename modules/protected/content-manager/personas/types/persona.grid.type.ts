import {
    FormalityLevelFilter,
    PersonaStatusFilter,
} from "@/types/enums/persona.enum";

export interface PersonaFilterState {
    searchKeyword: string;
    formalityLevel: FormalityLevelFilter | string;
    status: PersonaStatusFilter | string;
}
