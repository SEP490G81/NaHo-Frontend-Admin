import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { searchGrammars, createGrammar, updateGrammar, deleteGrammar } from "@/services/client/grammar.service";
import { CreateGrammarRequest, UpdateGrammarRequest } from "@/types/requests/grammar.request";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useGrammarManagement() {
    const queryClient = useQueryClient();
    const t = useTranslations("common.errors");

    const [queryParams, setQueryParams] = useState({
        keyword: "",
        page: 0,
        size: 10,
    });

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [selectedGrammarId, setSelectedGrammarId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [grammarToDelete, setGrammarToDelete] = useState<number | null>(null);

    // Fetch grammars with pagination from backend
    const { data: grammarsResponse, isLoading: isFetchingGrammars } = useQuery({
        queryKey: ["grammars", queryParams],
        queryFn: () => searchGrammars(queryParams.keyword, queryParams.page, queryParams.size),
    });

    const createMutation = useMutation({
        mutationFn: (request: CreateGrammarRequest) => createGrammar(request),
        onSuccess: () => {
            toast.success("Tạo ngữ pháp thành công!");
            queryClient.invalidateQueries({ queryKey: ["grammars"] });
            setIsFormModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.detail || "Tạo ngữ pháp thất bại!");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, request }: { id: number; request: UpdateGrammarRequest }) => updateGrammar(id, request),
        onSuccess: () => {
            toast.success("Cập nhật ngữ pháp thành công!");
            queryClient.invalidateQueries({ queryKey: ["grammars"] });
            setIsFormModalOpen(false);
            setSelectedGrammarId(null);
        },
        onError: (error: any) => {
            toast.error(error?.detail || "Cập nhật ngữ pháp thất bại!");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteGrammar(id),
        onSuccess: () => {
            toast.success("Xóa ngữ pháp thành công!");
            queryClient.invalidateQueries({ queryKey: ["grammars"] });
            setIsDeleteModalOpen(false);
            setGrammarToDelete(null);
        },
        onError: (error: any) => {
            const errorCode = error?.code;
            const fallbackMessage = error?.detail && error.detail !== "grammar.in_use.detail" 
                ? error.detail 
                : "Xóa ngữ pháp thất bại!";
            
            try {
                toast.error(errorCode && t.has(errorCode as any) ? t(errorCode as any) : fallbackMessage);
            } catch (e) {
                toast.error(fallbackMessage);
            }
            setIsDeleteModalOpen(false);
            setGrammarToDelete(null);
        },
    });

    const handleSearch = (keyword: string) => {
        setQueryParams((prev) => ({ ...prev, keyword, page: 0 }));
    };

    const handlePageChange = (newPage: number) => {
        setQueryParams((prev) => ({ ...prev, page: newPage }));
    };

    const openCreateModal = () => {
        setSelectedGrammarId(null);
        setIsFormModalOpen(true);
    };

    const openUpdateModal = (id: number) => {
        setSelectedGrammarId(id);
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setSelectedGrammarId(null);
    };

    const openDeleteModal = (id: number) => {
        setGrammarToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setGrammarToDelete(null);
    };

    return {
        queryParams,
        handleSearch,
        handlePageChange,
        grammars: grammarsResponse?.data || [],
        pageMeta: grammarsResponse?.meta?.pageMeta,
        isFetchingGrammars,
        createMutation,
        updateMutation,
        deleteMutation,
        isFormModalOpen,
        openCreateModal,
        openUpdateModal,
        closeFormModal,
        selectedGrammarId,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        grammarToDelete,
    };
}
