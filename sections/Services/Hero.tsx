import Selector from "./Selector.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

import type { SectionProps } from "deco/types.ts";
import type { AppContext } from "../../apps/site.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { AvailableIcons } from "../../components/ui/Icon.tsx";

interface CTA {
  text: HTML;
  href: string;
}

interface Image {
  src: ImageWidget;
  height: number;
}

interface Images {
  desktop: Image;
  mobile?: Image;
}

interface LabelTop {
  /**
   * @format icon-select
   * @options deco-sites/site-wave/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  text: string;
}

interface LabelBottom {
  /**
   * @format icon-select
   * @options deco-sites/site-wave/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  text: string;
}

interface Props {
  /**
   * @title Imagem de Background
   */
  bgImage: Images;
  labelTop?: LabelTop;
  /**
   * @title Título da Seção
   */
  title: string;
  /**
   * @title Subtítulo
   */
  subtitle?: string;
  cta?: CTA;
  labelBottom?: LabelBottom;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const {
    servicesSelector: options = [],
    device,
  } = ctx;

  const isMobile = device === "mobile";

  return { ...props, options, isMobile };
};

export default function Hero({
  bgImage,
  labelTop = {
    text: "",
  },
  title = "Sua marca em evidência.",
  subtitle =
    "Potencialize os resultados de vendas e aumente o faturamento do seu e-commerce com um time de profissionais qualificados e certificados nas maiores plataformas de mídia paga.",
  cta,
  labelBottom = {
    text: "",
  },
  options,
  isMobile,
}: SectionProps<typeof loader>) {
  const {
    desktop: {
      src: srcDesktop = "",
      height: desktopHeight = 820,
    },
    mobile: {
      src: srcMobile = "",
      height: mobileHeight = 0,
    },
  } = bgImage;

  return (
    <div
      class="bg-cover bg-center bg-no-repeat relative flex items-center justify-start"
      style={{
        height: `${
          isMobile
            ? mobileHeight === 0 ? desktopHeight : mobileHeight
            : desktopHeight
        }px`,
        backgroundImage: `url(${
          isMobile ? srcMobile === "" ? srcDesktop : srcMobile : srcDesktop
        })`,
      }}
    >
      <div
        class="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 50%, rgba(0,0,0,1) 100%)",
        }}
      />
      <div class="container px-5 md:px-16 lg:px-36 py-10 relative z-20 w-full sm:w-2/3 lg:w-1/2 ml-0 mr-auto">
        <Selector options={options} />
        {labelTop && (
          <div class="flex items-center gap-3 mt-10">
            {labelTop.icon && (
              <Icon id={labelTop.icon} size={20} class="text-white" />
            )}
            <p class="text-white font-bold">{labelTop.text}</p>
          </div>
        )}
        <h1 class="text-white text-[30px] leading-[30px] md:text-[50px] md:leading-[50px] mb-5 mt-10 font-bold">
          {title}
        </h1>
        <p class="text-white mb-10">{subtitle}</p>
        {cta && (
          <a
            class="block w-fit bg-[#0066E4] rounded-[30px] border-2 border-[#0066e4] text-white py-3 px-5 mb-10"
            href={cta.href}
          >
            <div dangerouslySetInnerHTML={{ __html: cta.text }} />
          </a>
        )}
        {labelBottom && (
          <div class="flex items-center gap-3">
            {labelBottom.icon && (
              <Icon id={labelBottom.icon} size={16} class="text-[#717171]" />
            )}
            <p class="text-[#717171] text-sm">{labelBottom.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
