import { Dispatch, SetStateAction } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    title="Ajustes de imagem"
                    className="flex h-7 w-7 items-center justify-center rounded bg-black/60 text-white"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-3">
                <DropdownMenuLabel>Ajustes rápidos</DropdownMenuLabel>
                <div className="mb-2 flex flex-wrap gap-2">
                    {Object.values(presets).map((preset) => (
                        <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                                setBrightness(preset.brightness);
                                setContrast(preset.contrast);
                                setSaturation(preset.saturation);
                            }}
                            className="rounded border px-2 py-1 text-xs hover:bg-muted"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <div className="mt-2 flex flex-col gap-3">
                    <label className="flex items-center gap-2">
                        <span className="w-24 text-xs text-muted-foreground">Brilho</span>
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
                        <span className="w-24 text-xs text-muted-foreground">Contraste</span>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={contrast}
                            onChange={(e) => setContrast(Number(e.target.value))}
                            className="flex-1"
                        />
                    </label>
                    <label className="flex items-center gap-2">
                        <span className="w-24 text-xs text-muted-foreground">Saturação</span>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={saturation}
                            onChange={(e) => setSaturation(Number(e.target.value))}
                            className="flex-1"
                        />
                    </label>
                    <button type="button" onClick={resetFilters} className="mt-1 self-end rounded border px-2 py-1 text-xs hover:bg-muted">
                        Resetar
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
