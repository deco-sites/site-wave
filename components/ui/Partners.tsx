import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  title?: string;
  rowImages?: ColumnImages[];
  imageClass?: string;
}

export interface ColumnImages {
  colImages: Image[];
}

const IMAGES = [
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
  },
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
  },
];

function Partners(props: Props) {
  const { title = "", rowImages = [], imageClass } = props;

  const list = rowImages && rowImages.length > 0
    ? rowImages
    : [{ colImages: Array(20).fill(null).map((_, i) => IMAGES[i % 2]) }];

  const infiniteImages = useMemo(() => [...list, ...list], [list]);

  return (
    <div class="w-full bg-black">
      <div class="flex flex-col gap-10 lg:gap-16">
        {title && <p class="text-[18px] font-bold text-center">{title}</p>}

        <div class="w-full text-center items-center relative">
          <div class=" px-1">
            {/* Container de animação com rolagem infinita */}
            <div class="flex flex-row flex-nowrap animate-infinite-scroll gap-[1.25rem]">
              {infiniteImages[0].colImages.map((item: Image, idx) => (
                <img
                  class={imageClass}
                  key={idx}
                  src={item.image}
                  alt={item.altText || ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
