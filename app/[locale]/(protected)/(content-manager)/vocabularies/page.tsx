"use client";

import { useVocabularyManagement } from "@/modules/protected/content-manager/vocabularies/hooks/use.vocabulary.management";
import VocabularyTable from "@/modules/protected/content-manager/vocabularies/features/vocabulary.table";
import VocabularyFormModal from "@/modules/protected/content-manager/vocabularies/features/vocabulary.form.modal";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import { NotebookPen, Plus, Search } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";

export default function VocabulariesPage() {
    const {
        queryParams,
        handleSearch,
        handlePageChange,
        vocabularies,
        pageMeta,
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
    } = useVocabularyManagement();

    const t = useTranslations("vocabularyManagement");

    const [searchInput, setSearchInput] = React.useState(queryParams.keyword);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch(searchInput);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchInput);
    };

    const handleFormSubmit = (data: any) => {
        if (selectedVocabularyId) {
            updateMutation.mutate({ id: selectedVocabularyId, request: data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleDeleteConfirm = () => {
        if (vocabularyToDelete) {
            deleteMutation.mutate(vocabularyToDelete);
        }
    };

    const selectedVocabulary = selectedVocabularyId
        ? vocabularies.find((v) => v.id === selectedVocabularyId) || null
        : null;

    return (
        <div className="flex w-full flex-col gap-y-4">
            <ContainerBox>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-8 w-8 items-center justify-center rounded-xl font-bold">
                                <NotebookPen className="h-4 w-4" />
                            </div>
                            <h1 className="text-text-contrast text-2xl font-bold">
                                {t("title")}
                            </h1>
                        </div>
                        <p className="text-text-muted mt-1 text-xs">
                            {t("subtitle")}
                        </p>
                    </div>

                    <Button
                        variant="contained"
                        startIcon={<Plus className="h-4 w-4" />}
                        onClick={openCreateModal}
                        sx={{
                            borderRadius: "12px",
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            px: 2.5,
                            "&:hover": {
                                backgroundColor: "var(--color-bgc-highlight)",
                                opacity: 0.9,
                            },
                        }}
                    >
                        {t("addVocabulary")}
                    </Button>
                </div>
            </ContainerBox>

            <ContainerBox>
                <form onSubmit={onSearchSubmit} className="w-full max-w-md flex items-center relative">
                    <Search className="absolute left-3 text-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        className="w-full bg-bgc-app border border-bdc-primary rounded-lg pl-10 pr-4 py-2 text-sm text-text-contrast focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="hidden">Search</button>
                </form>
            </ContainerBox>

            <ContainerBox>
                <VocabularyTable
                    vocabularies={vocabularies}
                    pageMeta={pageMeta}
                    isLoading={isFetchingVocabularies}
                    onPageChange={handlePageChange}
                    onUpdateClick={openUpdateModal}
                    onDeleteClick={openDeleteModal}
                />
            </ContainerBox>

            {/* Form Modal */}
            <VocabularyFormModal
                open={isFormModalOpen}
                onClose={closeFormModal}
                onSubmit={handleFormSubmit}
                vocabulary={selectedVocabulary}
                isSubmitting={createMutation.isPending || updateMutation.isPending}
            />

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="xs" fullWidth>
                <DialogTitle className="text-text-contrast font-bold bg-bgc-app border-b border-bdc-primary">
                    {t("deleteConfirmTitle")}
                </DialogTitle>
                <DialogContent className="bg-bgc-app py-6">
                    <DialogContentText className="text-text-muted mt-2">
                        {t("deleteConfirmMessage")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="bg-bgc-app border-t border-bdc-primary px-4 py-3">
                    <Button onClick={closeDeleteModal} color="inherit" className="text-text-muted hover:bg-hbgc-app" disabled={deleteMutation.isPending}>
                        {t("cancel")}
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={deleteMutation.isPending}>
                        {deleteMutation.isPending ? t("deleting") : t("delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
