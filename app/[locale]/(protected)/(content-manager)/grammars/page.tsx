"use client";

import { useGrammarManagement } from "@/modules/protected/content-manager/grammars/hooks/use.grammar.management";
import GrammarTable from "@/modules/protected/content-manager/grammars/features/grammar.table";
import GrammarFormModal from "@/modules/protected/content-manager/grammars/features/grammar.form.modal";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Typography } from "@mui/material";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function GrammarsPage() {
    const {
        queryParams,
        handleSearch,
        handlePageChange,
        grammars,
        pageMeta,
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
    } = useGrammarManagement();

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
        if (selectedGrammarId) {
            updateMutation.mutate({ id: selectedGrammarId, request: data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleDeleteConfirm = () => {
        if (grammarToDelete) {
            deleteMutation.mutate(grammarToDelete);
        }
    };

    const selectedGrammar = selectedGrammarId
        ? grammars.find((g) => g.id === selectedGrammarId) || null
        : null;

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-contrast">Quản lý Ngữ pháp</h1>
                    <p className="text-text-muted mt-1 text-sm">
                        Thêm, sửa, xóa và tìm kiếm ngữ pháp trong hệ thống
                    </p>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Plus size={18} />}
                    onClick={openCreateModal}
                    className="shadow-sm"
                >
                    Thêm Ngữ pháp
                </Button>
            </div>

            <div className="bg-bgc-panel border border-bdc-primary rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <form onSubmit={onSearchSubmit} className="flex-1 w-full max-w-md flex items-center relative">
                    <Search className="absolute left-3 text-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm ngữ pháp..."
                        className="w-full bg-bgc-app border border-bdc-primary rounded-lg pl-10 pr-4 py-2 text-sm text-text-contrast focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="hidden">Search</button>
                </form>
            </div>

            <div className="bg-bgc-panel border border-bdc-primary rounded-xl p-4 overflow-hidden shadow-sm">
                <GrammarTable
                    grammars={grammars}
                    pageMeta={pageMeta}
                    isLoading={isFetchingGrammars}
                    onPageChange={handlePageChange}
                    onUpdateClick={openUpdateModal}
                    onDeleteClick={openDeleteModal}
                />
            </div>

            {/* Form Modal */}
            <GrammarFormModal
                open={isFormModalOpen}
                onClose={closeFormModal}
                onSubmit={handleFormSubmit}
                grammar={selectedGrammar}
                isSubmitting={createMutation.isPending || updateMutation.isPending}
            />

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="xs" fullWidth>
                <DialogTitle className="text-text-contrast font-bold bg-bgc-app border-b border-bdc-primary">
                    Xác nhận xóa
                </DialogTitle>
                <DialogContent className="bg-bgc-app py-6">
                    <DialogContentText className="text-text-muted mt-2">
                        Bạn có chắc chắn muốn xóa ngữ pháp này không? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="bg-bgc-app border-t border-bdc-primary px-4 py-3">
                    <Button onClick={closeDeleteModal} color="inherit" className="text-text-muted hover:bg-hbgc-app" disabled={deleteMutation.isPending}>
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={deleteMutation.isPending}>
                        {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
