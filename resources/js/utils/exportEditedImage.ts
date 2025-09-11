export async function exportEditedImage(
    img: HTMLImageElement,
    container: HTMLDivElement,
    opts: { zoom: number; brightness: number; contrast: number; saturation: number }
): Promise<Blob> {
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    ctx.filter = `brightness(${opts.brightness}%) contrast(${opts.contrast}%) saturate(${opts.saturation}%)`;
    const scaledWidth = img.naturalWidth * opts.zoom;
    const scaledHeight = img.naturalHeight * opts.zoom;
    const dx = (canvas.width - scaledWidth) / 2;
    const dy = (canvas.height - scaledHeight) / 2;
    ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to export image'));
        }, 'image/png');
    });
}
