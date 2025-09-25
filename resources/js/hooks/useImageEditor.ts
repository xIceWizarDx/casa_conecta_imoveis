import { useState } from 'react';

export function useImageEditor() {
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);

    return {
        brightness,
        setBrightness,
        contrast,
        setContrast,
        saturation,
        setSaturation,
    };
}

export type UseImageEditorReturn = ReturnType<typeof useImageEditor>;
