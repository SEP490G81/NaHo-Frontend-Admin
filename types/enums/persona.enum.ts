/** Mức độ trang trọng của phong cách hội thoại (khớp org.naho.persona.type.FormalityLevel). */
export enum FormalityLevel {
    INFORMAL = "INFORMAL",
    NEUTRAL = "NEUTRAL",
    FORMAL = "FORMAL",
}

/** Cấp độ giáo trình Marugoto (khớp org.naho.persona.type.MarugotoLevel). */
export enum MarugotoLevel {
    STARTER_A1 = "STARTER_A1",
    ELEMENTARY_1_A2 = "ELEMENTARY_1_A2",
    ELEMENTARY_2_A2 = "ELEMENTARY_2_A2",
    PRE_INTERMEDIATE_A2_B1 = "PRE_INTERMEDIATE_A2_B1",
    INTERMEDIATE_1_B1 = "INTERMEDIATE_1_B1",
    INTERMEDIATE_2_B1 = "INTERMEDIATE_2_B1",
}

/** Trạng thái nhân vật (khớp org.naho.persona.type.PersonaStatus). */
export enum PersonaStatus {
    ACTIVE = "ACTIVE",
    UNACTIVE = "UNACTIVE",
}

/** Giá trị lọc theo mức trang trọng trên lưới nhân vật. */
export enum FormalityLevelFilter {
    ALL = "ALL",
    INFORMAL = "INFORMAL",
    NEUTRAL = "NEUTRAL",
    FORMAL = "FORMAL",
}

/** Giá trị lọc theo trạng thái trên lưới nhân vật. */
export enum PersonaStatusFilter {
    ALL = "ALL",
    ACTIVE = "ACTIVE",
    UNACTIVE = "UNACTIVE",
}
