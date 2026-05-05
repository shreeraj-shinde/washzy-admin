import Image from "next/image";
import { Card } from "@/shared/ui/Card";

type Props = { images: string[] };

export function CenterPhotosGallery({ images }: Props) {
  if (!images?.length) return null;

  return (
    <Card className="p-6">
      <h2 className="text-sm uppercase tracking-wider text-text-muted mb-4">
        Center Photos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-subtle"
          >
            <Image
              src={src}
              alt={`Center photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
