import { CefrLevel } from "../enums/book.enum";
import { JlptLevel } from "../enums/user.enum";

export interface FileResponse {
    readonly id: number;
    readonly url: string;
    readonly name?: string;
}

export interface BookResponse {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly jlptLevel: JlptLevel;
    readonly cefrLevel: CefrLevel;
    readonly orderIndex: number;
    readonly firstNodeGlobalOrderIndex: number;
    readonly lastNodeGlobalOrderIndex: number;
    readonly coverImage?: FileResponse | null;
}
