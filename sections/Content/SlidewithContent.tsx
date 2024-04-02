import type { ImageWidget } from "apps/admin/widgets.ts";

interface Image {
  image?: ImageWidget;
  label?: string;
}

interface Card {
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

  const images = hasImage.map((item, index) => (
    <img
      key={index}
      className="w-[139px] h-[139px] bg-[#D9D9D9] rounded-lg object-contain px-3"
      src={item.image}
      alt={item.label || ""}
    />
  ));

  return (
    <div className="bg-black">
      <div className="container flex flex-col lg:flex-row py-[89px]">
        <div class="flex items-center max-w-[758px] overflow-hidden wrapperTrack ">
          {images.length > 0 && (
            <div>
              <div class="absolute slide-rounded-bg h-[200px] z-[1] -mt-7">
              </div>
              <div>
                <div
                  className="scroll-container"
                  style="--animation-direction: normal; --animation-time: 25s;"
                >
                  <ul class="scroll-items">
                    <li class="flex gap-3">{images}</li>
                  </ul>
                </div>
                <div
                  className="scroll-container"
                  style="--animation-direction: reverse; --animation-time: 25s; margin-top:5px;"
                >
                  <ul class="scroll-items">
                    <li class="flex gap-3">{images}</li>
                  </ul>
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
          <p className="lg:text-start text-white mt-3 text-base text-center">
            {subtitle}
          </p>
          <div>
            <button
              className="btn-brand px-5 py-2 text-white mt-4 text-center"
              href={href}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
