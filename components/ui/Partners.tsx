import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  title?: string;
  rowImages?: ColumnImages[];
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
  const {
    title = "",
    rowImages = [],
  } = props;

  const list = rowImages && rowImages.length > 0
    ? rowImages
    : [{ colImages: Array(20).fill(null).map((_, i) => IMAGES[i % 2]) }];

  return (
    <div className="w-full bg-black">
      <div className="flex flex-col gap-10 lg:gap-16">
        {title && <p className="text-[18px] font-bold text-center">{title}</p>}

        <div className="w-full text-center items-center relative">
          <div className="overflow-hidden px-1">
            {list.map(({ colImages }, index) => (
              <div
                className={`flex flex-row flex-nowrap w-full animate-walk text-white ${
                  index > 0 && index < list.length - 1 ? "py-6" : ""
                } items-center gap-[1.25rem] scroll-items`}
                style={{ animationDelay: `${300 * index}ms` }}
                key={index}
              >
                {colImages.map((item: Image, idx) => (
                  <img
                    className="w-[139px] h-[139px] bg-[#D9D9D9] rounded-[20px] object-contain px-3"
                    key={idx}
                    src={item.image}
                    alt={item.altText || ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
