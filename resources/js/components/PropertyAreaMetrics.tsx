import { Ruler, Square } from 'lucide-react';

type Props = {
  builtArea?: string | null;
  area?: string | null;
  className?: string;
};

export default function PropertyAreaMetrics({ builtArea, area, className = '' }: Props) {
  const hasBuilt = (builtArea || '').toString().trim().length > 0;
  const hasArea = (area || '').toString().trim().length > 0;
  if (!hasBuilt && !hasArea) return null;

  return (
    <>
      {hasBuilt && (
        <div className={`flex flex-col items-start gap-2 ${className}`} title={'\u00C1rea constru\u00EDda'}>
          <span className="mb-1 text-[10px] leading-none text-gray-500">{'\u00C1rea constru\u00EDda'}</span>
          <span className="flex items-center">
            <Ruler className="mr-1 h-4 w-4" />
            <span>{builtArea}</span>
          </span>
        </div>
      )}
      {hasArea && (
        <div className={`flex flex-col items-start gap-2 ${className}`} title="Metragem total do terreno">
          <span className="mb-1 text-[10px] leading-none text-gray-500">Metragem total</span>
          <span className="flex items-center">
            <Square className="mr-1 h-4 w-4" />
            <span>{area}</span>
          </span>
        </div>
      )}
    </>
  );
}
