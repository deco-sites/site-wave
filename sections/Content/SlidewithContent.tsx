import Partners from "site/components/ui/Partners.tsx";
import Button from "site/components/ui/Button.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { useSignal } from "@preact/signals";

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
  secondVariable: boolean;
}

export default function SlidewithContent(card: Props) {
  const {
    hasImage = [],
    title = "Conheça os nossos parceiros.",
    cta: { href = "#", label: ctaLabel = "Confira nossos Parceiros" },
  } = card;

  const isHovered = useSignal(false);

  const images = hasImage.map((item) => ({
    image: item.image,
    altText: item.label || "",
  }));

  const animationTime = isHovered.value ? "40s" : "20s";

  return (
    <div class="container">
      <div
        class={`flex flex-col-reverse gap-10 group  ${!card?.secondVariable && "lg:flex-row lg:gap-0"
          } justify-evenly ${card?.secondVariable && "flex-col"}`}
      >
        <div
          class="relative flex items-center overflow-hidden w-full lg:w-3/5"
          onMouseEnter={() => isHovered.value = true}
          onMouseLeave={() => isHovered.value = false}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10">
          </div>
          <div class="relative z-0">
            {images.length > 0 && (
              <div class="slide-rounded-bg">
                {/* Primeiro componente Partners - Direção normal */}
                <div
                  class="animation-right"
                  style={{ animationDuration: animationTime }}
                >
                  <Partners
                    imageClass="w-[115px] h-[115px] lg:w-[139px] lg:h-[139px] bg-[#D9D9D9] rounded-[20px] object-contain px-3"
                    rowImages={[{
                      colImages: Array(20).fill(null).map((_, i) =>
                        images[i % images.length]
                      ),
                    }]}
                  />
                </div>

                <div
                  class="animation-left mt-3 lg:mt-5"
                  style={{
                    animationDuration: animationTime,
                  }}
                >
                  <Partners
                    imageClass="w-[115px] h-[115px] lg:w-[139px] lg:h-[139px] bg-[#D9D9D9] rounded-[20px] object-contain px-3"
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
        <div
          class={`flex justify-center flex-col items-center lg:items-start ${!card?.secondVariable && "lg:w-1/4"
            } ${card?.secondVariable && "lg:w-full"}`}
        >
          {/* <span class="visual-brand mb-8 w-[70px]"></span> */}
          <div
            class="text-white text-center lg:text-start text-2xl font-bold leading-9"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <a
            href={href}
            class="mt-5 flex py-[5px] px-3 gap-1 items-center bg-[#0066E4] rounded-[30px]  border border-white group-hover:bg-transparent group-hover:scale-105 text-white transition duration-350 ease-in hover:ease-out "
          >
            {ctaLabel}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
            >
              <path
                d="M14.8534 5.35373L10.3535 9.85348C10.2597 9.9473 10.1324 10 9.99976 10C9.86709 10 9.73984 9.9473 9.64602 9.85348C9.55221 9.75967 9.4995 9.63242 9.4995 9.49975C9.4995 9.36707 9.55221 9.23983 9.64602 9.14602L13.2928 5.49997H0.5C0.367396 5.49997 0.240223 5.4473 0.146458 5.35353C0.0526932 5.25977 1.63615e-05 5.1326 1.63615e-05 5C1.63615e-05 4.8674 0.0526932 4.74023 0.146458 4.64647C0.240223 4.5527 0.367396 4.50003 0.5 4.50003H13.2928L9.64602 0.85398C9.55221 0.760165 9.4995 0.632925 9.4995 0.50025C9.4995 0.367576 9.55221 0.240335 9.64602 0.14652C9.73984 0.0527047 9.86709 0 9.99976 0C10.1324 0 10.2597 0.0527047 10.3535 0.14652L14.8534 4.64627C14.8998 4.6927 14.9367 4.74784 14.9619 4.80854C14.987 4.86924 15 4.9343 15 5C15 5.0657 14.987 5.13076 14.9619 5.19146C14.9367 5.25215 14.8998 5.3073 14.8534 5.35373Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
