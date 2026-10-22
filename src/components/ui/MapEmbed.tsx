import { site } from "@/data/site";

/** Яндекс.Карта через виджет-iframe (без ключа API). Метка — адрес из site.ts */
export function MapEmbed({ zoom = 11, className = "" }: { zoom?: number; className?: string }) {
  const [lon, lat] = site.mapCenter;
  const src = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=${zoom}&pt=${lon}%2C${lat}%2Cpm2rdm&lang=ru_RU`;
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-[#ebe4df] ${className}`}>
      <iframe
        src={src}
        title={`Карта: ${site.address}`}
        loading="lazy"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
