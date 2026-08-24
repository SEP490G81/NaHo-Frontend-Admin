import { CefrLevel } from "../enums/book.enum";
import { JlptLevel } from "../enums/user.enum";
import { SortDirection } from "../enums/user.enum";

export interface UpdateBookRequest {
    readonly coverImageFileId?: number | null;
    readonly title: string;
    readonly description?: string;
    readonly jlptLevel: JlptLevel;
    readonly cefrLevel: CefrLevel;
}

export interface BookQueryRequest {
    readonly keyword?: string;
    readonly jlptLevel?: JlptLevel | null;
    readonly cefrLevel?: CefrLevel | null;
    readonly sortDirection?: SortDirection;
    readonly page?: number;
    readonly size?: number;
}
