"use client";

import { useTranslations } from "next-intl";
import { BookResponse } from "@/types/responses/book.response";
import { UpdateBookRequest } from "@/types/requests/book.request";
import { CefrLevel } from "@/types/enums/book.enum";
import { uploadCoverImage } from "@/services/client/book.service";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageCropperDialog from "@/components/ImageCropperDialog";

interface UpdateBookModalProps {
    open: boolean;
    onClose: () => void;
    book: BookResponse | null;
    onSave: (data: { id: number; request: UpdateBookRequest }) => void;
    isUpdating: boolean;
}

export default function UpdateBookModal({
    open,
    onClose,
    book,
    onSave,
    isUpdating,
}: Readonly<UpdateBookModalProps>) {
    const t = useTranslations("books");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cefrLevel, setCefrLevel] = useState<CefrLevel>(CefrLevel.A1);
    const [coverImageFileId, setCoverImageFileId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);

    const [errors, setErrors] = useState<{ title?: string; coverImage?: string }>({});

    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    // Reset form when book changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (book && open) {
            setTitle(book.title);
            setDescription(book.description || "");
            setCefrLevel(book.cefrLevel);
            setCoverImageFileId(book.coverImage?.id || null);
            setPreviewUrl(book.coverImage?.accessUrl || null);
            setSelectedFile(null);
            setErrors({});
            setIsUploading(false);
        }
    }, [book, open]);

    // Reset uploading state if parent update finishes (success or error)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (!isUpdating) {
            setIsUploading(false);
        }
    }, [isUpdating]);

    useEffect(() => {
        // Cleanup object URL
        return () => {
            if (selectedFile && previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [selectedFile, previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // Validate file
            if (!ALLOWED_TYPES.includes(file.type)) {
                setErrors((prev) => ({ ...prev, coverImage: t("invalidImageType") }));
                e.target.value = "";
                return;
            }
            if (file.size > MAX_SIZE) {
                setErrors((prev) => ({ ...prev, coverImage: t("invalidImageSize") }));
                e.target.value = "";
                return;
            }
            
            setErrors((prev) => ({ ...prev, coverImage: undefined }));
            
            const rawUrl = URL.createObjectURL(file);
            setRawImageSrc(rawUrl);
            setCropDialogOpen(true);
            
            // Reset input so the same file can be selected again
            e.target.value = "";
        }
    };

    const handleCropComplete = (croppedFile: File, newPreviewUrl: string) => {
        setSelectedFile(croppedFile);
        setPreviewUrl(newPreviewUrl);
        setCropDialogOpen(false);
        setRawImageSrc(null);
    };

    const handleCropClose = () => {
        setCropDialogOpen(false);
        if (rawImageSrc) {
            URL.revokeObjectURL(rawImageSrc);
            setRawImageSrc(null);
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setErrors({ title: t("titleRequired") });
            return;
        }

        if (!book) return;

        let finalImageId = coverImageFileId;

        // If a new file is selected, upload it first
        if (selectedFile) {
            try {
                setIsUploading(true);
                const res = await uploadCoverImage(selectedFile);
                if (res.data?.id) {
                    finalImageId = res.data.id;
                }
            } catch (error) {
                console.error("Failed to upload cover image", error);
                // Optionally show error toast here
                setIsUploading(false);
                return; // Stop save process if image upload fails
            }
        }

        onSave({
            id: book.id,
            request: {
                title,
                description,
                cefrLevel,
                jlptLevel: book.jlptLevel,
                coverImageFileId: finalImageId,
            },
        });
        
        // The parent will handle isUpdating state. The useEffect above will reset isUploading when isUpdating becomes false.
    };

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "var(--color-bgc-app)",
            color: "var(--color-text-contrast)",
            "& fieldset": { borderColor: "var(--color-bdc-primary)" },
            "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
            "&.Mui-focused fieldset": {
                borderColor: "var(--color-bgc-highlight)",
            },
        },
        "& .MuiInputLabel-root": {
            color: "var(--color-text-muted)",
            backgroundColor: "var(--color-bgc-modal)",
            padding: "0 4px",
            "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
        },
        "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            slotProps={{
                paper: {
                    className: "bg-bgc-modal text-text-contrast border border-bdc-primary rounded-xl",
                    sx: {
                        backgroundColor: "var(--color-bgc-modal)",
                        color: "var(--color-text-contrast)",
                        borderRadius: "16px",
                    },
                },
            }}
        >
            <DialogTitle className="font-bold border-b border-bdc-primary px-6 py-4">
                {t("updateBook")}
            </DialogTitle>
            <DialogContent className="flex flex-col gap-6 py-6 px-6">
                
                <Box className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text-muted w-full text-left">{t("coverImage")}</span>
                    <div className="flex flex-col items-center w-full bg-bgc-panel p-6 rounded-lg border border-bdc-primary border-dashed hover:bg-hbgc-app transition-colors">
                        {previewUrl ? (
                            <div className="relative w-40 h-56 rounded border border-bdc-primary overflow-hidden mb-4 shadow-sm bg-bgc-app">
                                <Image src={previewUrl} alt="Cover" fill className="object-contain" sizes="160px" />
                            </div>
                        ) : (
                            <div className="w-40 h-56 bg-bgc-app rounded border border-bdc-primary border-dashed flex items-center justify-center text-xs text-text-muted mb-4 text-center p-4">
                                {t("noData")}
                            </div>
                        )}
                        <Button 
                            variant="outlined" 
                            component="label" 
                            size="small" 
                            disabled={isUploading || isUpdating}
                            sx={{
                                color: "var(--color-text-contrast)",
                                borderColor: "var(--color-bdc-primary)",
                                "&:hover": {
                                    borderColor: "var(--color-text-contrast)",
                                    backgroundColor: "var(--color-hbgc-app)"
                                }
                            }}
                        >
                            {isUploading ? <CircularProgress size={16} className="mr-2" /> : null}
                            {t("selectImage")}
                            <input 
                                type="file" 
                                hidden 
                                accept="image/png, image/jpeg, image/webp" 
                                onChange={handleFileChange}
                            />
                        </Button>
                        {errors.coverImage && (
                            <Typography variant="caption" color="error" className="mt-2 text-center w-full">
                                {errors.coverImage}
                            </Typography>
                        )}
                    </div>
                </Box>

                <TextField
                    label={t("title")}
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: undefined }));
                    }}
                    error={!!errors.title}
                    helperText={errors.title}
                    sx={inputSx}
                />

                <TextField
                    label={t("description")}
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={inputSx}
                />

                <Box className="flex gap-4">
                    <FormControl fullWidth required sx={inputSx}>
                        <InputLabel>{t("cefrLevel")}</InputLabel>
                        <Select
                            value={cefrLevel}
                            label={t("cefrLevel")}
                            onChange={(e) => setCefrLevel(e.target.value as CefrLevel)}
                            MenuProps={{
                                slotProps: {
                                    paper: {
                                        sx: {
                                            backgroundColor: "var(--color-bgc-panel)",
                                            color: "var(--color-text-contrast)",
                                        },
                                    },
                                },
                            }}
                        >
                            {Object.values(CefrLevel).map((level) => (
                                <MenuItem key={level} value={level}>{level}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

            </DialogContent>
            <DialogActions className="px-6 py-4 border-t border-bdc-primary">
                <Button 
                    onClick={onClose} 
                    disabled={isUpdating}
                    sx={{ color: "var(--color-text-muted)" }}
                >
                    {t("cancel")}
                </Button>
                <Button 
                    onClick={handleSave} 
                    variant="contained" 
                    disabled={isUpdating}
                    startIcon={isUpdating ? <CircularProgress size={20} /> : null}
                    sx={{
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9
                        }
                    }}
                >
                    {t("save")}
                </Button>
            </DialogActions>

            <ImageCropperDialog
                open={cropDialogOpen}
                imageSrc={rawImageSrc}
                onClose={handleCropClose}
                onCropComplete={handleCropComplete}
                aspectRatio={1 / 1.414}
            />
        </Dialog>
    );
}
