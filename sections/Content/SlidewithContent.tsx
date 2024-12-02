import Partners from "site/components/ui/Partners.tsx";
import Button from "site/components/ui/Button.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Image {
  image?: ImageWidget;
  label?: string;
}
interface CTA {
  href?: string;
  label?: string;
}

export interface Props {
  hasImage?: Image[];
  title?: RichText;
  cta: CTA;
}

export default function SlidewithContent(card: Props) {
  const {
    hasImage = [],
    title = "Conheça os nossos parceiros.",
    cta: { href = "#", label: ctaLabel = "Confira nossos Parceiros" },
  } = card;

  const images = hasImage.map((item) => ({
    image: item.image,
    altText: item.label || "",
  }));

  return (
    <div class="container">
      <div class="flex flex-col lg:flex-row justify-evenly">
        <div class="relative flex items-center overflow-hidden w-full lg:w-3/5">
          <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10">
          </div>
          <div class="relative z-0">
            {images.length > 0 && (
              <div class="slide-rounded-bg">
                {/* Primeiro componente Partners - Direção normal */}
                <div
                  class="animation-right"
                  style={{
                    "--animation-time": "5000s",
                  }}
                >
                  <Partners
                    imageClass="w-[139px] h-[139px] bg-[#D9D9D9] rounded-[20px] object-contain px-3"
                    rowImages={[{
                      colImages: Array(20).fill(null).map((_, i) =>
                        images[i % images.length]
                      ),
                    }]}
                  />
                </div>

                <div
                  class="animation-left mt-5"
                  style={{
                    "--animation-time": "5000s",
                  }}
                >
                  <Partners
                    imageClass="w-[139px] h-[139px] bg-[#D9D9D9] rounded-[20px] object-contain px-3"
                    rowImages={[{
                      colImages: Array(20).fill(null).map((_, i) =>
                        images[i % images.length]
                      ),
                    }]}
                  />
                </div>
              </div>
            )}
          </div>
          <div class="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-10">
          </div>
        </div>

        {/* Conteúdo textual à direita */}
        <div class="flex justify-center flex-col items-center lg:items-start lg:w-1/4">
          <span class="visual-brand mb-8 w-[70px]"></span>
          <div
            class="text-white text-center lg:text-start text-2xl font-bold leading-9"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <Button class="mt-5" href={href}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
