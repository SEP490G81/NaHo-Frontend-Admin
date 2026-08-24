import { BaseResponse } from "@/types/responses/base.response";
import { GrammarResponse } from "@/types/responses/vocabulary.response";
import { CreateGrammarRequest, UpdateGrammarRequest } from "@/types/requests/grammar.request";

export const searchGrammars = async (
    keyword: string,
    page: number = 0,
    size: number = 10
): Promise<BaseResponse<GrammarResponse[]>> => {
    const queryParams = new URLSearchParams({
        keyword,
        page: page.toString(),
        size: size.toString(),
    });
    const res = await fetch(`/api/admin/grammars?${queryParams.toString()}`);
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const getGrammarDetail = async (id: number): Promise<GrammarResponse> => {
    const res = await fetch(`/api/admin/grammars/${id}`);
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const createGrammar = async (request: CreateGrammarRequest): Promise<GrammarResponse> => {
    const res = await fetch(`/api/admin/grammars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const updateGrammar = async (id: number, request: UpdateGrammarRequest): Promise<GrammarResponse> => {
    const res = await fetch(`/api/admin/grammars/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const deleteGrammar = async (id: number): Promise<void> => {
    const res = await fetch(`/api/admin/grammars/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw await res.json();
    }
};
