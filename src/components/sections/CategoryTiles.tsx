import Image from "next/image";
import Link from "next/link";
import { categoryTiles } from "@/data/site";

export function CategoryTiles() {
  return (
    <section className="container-main pt-12 lg:pt-[90px]">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-6">
        {categoryTiles.map((tile) => (
          <Link
            key={tile.title}
            href={`/catalog/${tile.slug}`}
            className="group relative block h-[150px] overflow-hidden rounded-[14px] bg-ink lg:h-[173px]"
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-3 bottom-3 grid h-9 place-items-center rounded-full bg-white text-[14px] shadow-[0_2px_10px_rgb(0_0_0/0.08)] transition-colors group-hover:bg-accent group-hover:text-white lg:inset-x-[22px] lg:bottom-[21px]">
              {tile.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
