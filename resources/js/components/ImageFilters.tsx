import { Dispatch, SetStateAction } from 'react';

interface ImageFiltersProps {
    brightness: number;
    contrast: number;
    saturation: number;
    setBrightness: Dispatch<SetStateAction<number>>;
    setContrast: Dispatch<SetStateAction<number>>;
    setSaturation: Dispatch<SetStateAction<number>>;
}

export default function ImageFilters({ brightness, contrast, saturation, setBrightness, setContrast, setSaturation }: ImageFiltersProps) {
    const presets = {
        dark: { brightness: 80, contrast: 110, saturation: 90, label: 'Escuro suave' },
    } as const;

    const resetFilters = () => {
        setBrightness(100);
        setContrast(100);
        setSaturation(100);
    };

    return (
        <div className="absolute bottom-4 left-4 rounded-md bg-black/50 p-4 text-white backdrop-blur-sm">
            <div className="mb-2 flex gap-2">
                {Object.values(presets).map((preset) => (
                    <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                            setBrightness(preset.brightness);
                            setContrast(preset.contrast);
                            setSaturation(preset.saturation);
                        }}
                        className="rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                    <span className="w-24 text-sm">Brilho</span>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="flex-1"
                    />
                </label>
                <label className="flex items-center gap-2">
                    <span className="w-24 text-sm">Contraste</span>
                    <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="flex-1" />
                </label>
                <label className="flex items-center gap-2">
                    <span className="w-24 text-sm">Saturação</span>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={saturation}
                        onChange={(e) => setSaturation(Number(e.target.value))}
                        className="flex-1"
                    />
                </label>
                <button type="button" onClick={resetFilters} className="mt-2 rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20">
                    Resetar
                </button>
            </div>
        </div>
    );
}
