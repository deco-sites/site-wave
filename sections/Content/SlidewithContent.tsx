import Partners from "site/components/ui/Partners.tsx";
import Props from "site/components/ui/Partners.tsx";
import Button from "site/components/ui/Button.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image?: ImageWidget;
  label?: string;
}

export interface Card {
  hasImage?: Image[];
  title?: string;
  subtitle?: string;
  isEmptyBrand?: boolean;
  cta: {
    href?: string;
    label?: string;
  };
}

export default function SlidewithContent(card: Card) {
  const {
    hasImage = [],
    title = "Conheça os nossos parceiros.",
    subtitle = "Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum.",
    isEmptyBrand = true,
    cta: { href = "#", label: ctaLabel = "Confira nossos Parceiros" },
  } = card;

  const images = hasImage.map((item, index) => ({
    image: item.image,
    altText: item.label || "",
  }));

  return (
    <div className="bg-black pt-[50px] pb-[20px] lg:py-0">
      <div className="container flex flex-col lg:flex-row pt-0 pb-[50px] lg:py-[89px]">
        <div class="flex items-center max-w-[758px] overflow-hidden wrapperTrack  w-full">
          {images.length > 0 && (
            <div>
              <div class="slide-rounded-bg lg:w-3/4">
                <div>
                  <Partners rowImages={[{ colImages: images }]} />
                </div>
                <div style="--animation-direction: reverse; --animation-time: 25s; margin-top:1.25rem;">
                  <Partners rowImages={[{ colImages: images }]} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="max-w-[320px] flex justify-center flex-col mt-[75px] mx-auto items-center lg:items-start lg:m-auto">
          {isEmptyBrand && <span className="visual-brand mb-8 w-[70px]"></span>}
          <h5 className="text-white lg:text-start text-[30px] font-bold leading-[35px] text-center">
            {title}
          </h5>
          <p className="lg:text-start text-white my-3 text-base text-center">
            {subtitle}
          </p>
          <div>
            <Button
              className="btn-brand px-5 py-2 text-white mt-4 text-center"
              href={href}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
