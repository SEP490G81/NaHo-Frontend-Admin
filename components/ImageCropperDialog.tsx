import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, Box, Typography } from '@mui/material';
import getCroppedImg from '@/utils/cropImage';
import { useTranslations } from "next-intl";

interface ImageCropperDialogProps {
    open: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onCropComplete: (croppedFile: File, previewUrl: string) => void;
    aspectRatio?: number;
}

export default function ImageCropperDialog({
    open,
    imageSrc,
    onClose,
    onCropComplete,
    aspectRatio = 1 / 1.414, // A4 ratio is common for textbooks
}: Readonly<ImageCropperDialogProps>) {
    const t = useTranslations("books");
    
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);

    const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            setIsCropping(true);
            const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
            if (croppedFile) {
                const previewUrl = URL.createObjectURL(croppedFile);
                onCropComplete(croppedFile, previewUrl);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsCropping(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="font-bold border-b border-gray-100">
                {t("cropImage") || "Crop Image"}
            </DialogTitle>
            <DialogContent dividers className="p-0">
                <Box className="relative w-full h-[400px] bg-gray-900">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onCropComplete={onCropCompleteHandler}
                            onZoomChange={setZoom}
                        />
                    )}
                </Box>
                <Box className="px-6 py-4 flex items-center gap-4">
                    <Typography variant="body2" className="text-gray-600 font-medium whitespace-nowrap">
                        {t("zoom") || "Zoom"}
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => setZoom(Number(zoom))}
                        className="text-primary-main"
                    />
                </Box>
            </DialogContent>
            <DialogActions className="px-6 py-4 border-t border-gray-100">
                <Button onClick={onClose} color="inherit" disabled={isCropping}>
                    {t("cancel") || "Cancel"}
                </Button>
                <Button 
                    onClick={handleCrop} 
                    variant="contained" 
                    color="primary"
                    disabled={isCropping}
                >
                    {isCropping ? (t("cropping") || "Cropping...") : (t("confirmCrop") || "Confirm Crop")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
