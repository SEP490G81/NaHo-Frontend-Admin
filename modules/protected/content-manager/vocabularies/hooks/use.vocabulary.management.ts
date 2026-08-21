import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { searchVocabularies, createVocabulary, updateVocabulary, deleteVocabulary } from "@/services/client/vocabulary.service";
import { CreateVocabularyRequest, UpdateVocabularyRequest } from "@/types/requests/vocabulary.request";
import { toast } from "react-toastify";

export function useVocabularyManagement() {
    const queryClient = useQueryClient();

    const [queryParams, setQueryParams] = useState({
        keyword: "",
        page: 0,
        size: 10,
    });

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [selectedVocabularyId, setSelectedVocabularyId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [vocabularyToDelete, setVocabularyToDelete] = useState<number | null>(null);

    // Fetch vocabularies with pagination from backend
    const { data: vocabulariesResponse, isLoading: isFetchingVocabularies } = useQuery({
        queryKey: ["vocabularies", queryParams],
        queryFn: () => searchVocabularies(queryParams.keyword, queryParams.page, queryParams.size),
    });

    const createMutation = useMutation({
        mutationFn: (request: CreateVocabularyRequest) => createVocabulary(request),
        onSuccess: () => {
            toast.success("Tạo từ vựng thành công!");
            queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
            setIsFormModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.detail || "Tạo từ vựng thất bại!");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, request }: { id: number; request: UpdateVocabularyRequest }) => updateVocabulary(id, request),
        onSuccess: () => {
            toast.success("Cập nhật từ vựng thành công!");
            queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
            setIsFormModalOpen(false);
            setSelectedVocabularyId(null);
        },
        onError: (error: any) => {
            toast.error(error?.detail || "Cập nhật từ vựng thất bại!");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteVocabulary(id),
        onSuccess: () => {
            toast.success("Xóa từ vựng thành công!");
            queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
            setIsDeleteModalOpen(false);
            setVocabularyToDelete(null);
        },
        onError: (error: any) => {
            toast.error(error?.detail || "Xóa từ vựng thất bại!");
        },
    });

    const handleSearch = (keyword: string) => {
        setQueryParams((prev) => ({ ...prev, keyword, page: 0 }));
    };

    const handlePageChange = (newPage: number) => {
        setQueryParams((prev) => ({ ...prev, page: newPage }));
    };

    const openCreateModal = () => {
        setSelectedVocabularyId(null);
        setIsFormModalOpen(true);
    };

    const openUpdateModal = (id: number) => {
        setSelectedVocabularyId(id);
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setSelectedVocabularyId(null);
    };

    const openDeleteModal = (id: number) => {
        setVocabularyToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setVocabularyToDelete(null);
    };

    return {
        queryParams,
        handleSearch,
        handlePageChange,
        vocabularies: vocabulariesResponse?.data || [],
        pageMeta: vocabulariesResponse?.meta?.pageMeta,
        isFetchingVocabularies,
        createMutation,
        updateMutation,
        deleteMutation,
        isFormModalOpen,
        openCreateModal,
        openUpdateModal,
        closeFormModal,
        selectedVocabularyId,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        vocabularyToDelete,
    };
}
