import Selector from "../Services/Selector.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import type { AppContext } from "../../apps/site.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { AvailableIcons } from "../../components/ui/Icon.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { type SectionProps } from "@deco/deco";
interface Image {
    src: ImageWidget;
    height: number;
}
interface Images {
    desktop: Image;
    mobile?: Image;
}
interface LabelBottom {
    /**
     * @title Título
     */
    titulo?: string;
    text: string;
}
interface CTA {
    label: string;
    url: string;
}
interface findOutMore {
    text?: string;
}
interface Props {
    /**
     * @title Imagem de Background
     */
    bgImage: Images;
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
    /**
     * @title conteudo saiba mais
     */
    findOutMore?: findOutMore;
}
export const loader = (props: Props, req: Request, ctx: AppContext) => {
    const { servicesSelector: options = [], device, } = ctx;
    const isMobile = device === "mobile";
    return { ...props, options, isMobile };
};
export default function Hero({ bgImage, title = "Sua marca em evidência.", subtitle = "Potencialize os resultados de vendas e aumente o faturamento do seu e-commerce com um time de profissionais qualificados e certificados nas maiores plataformas de mídia paga.", cta, labelBottom = {
    text: "",
    titulo: undefined,
}, options, isMobile, findOutMore, }: SectionProps<typeof loader>) {
    const { desktop: { src: srcDesktop = "", height: desktopHeight = 820, }, mobile: { src: srcMobile = "", height: mobileHeight = 0, }, } = bgImage;
    return (<div class="bg-cover bg-center bg-no-repeat relative flex items-center justify-start" style={{
            height: `${isMobile
                ? mobileHeight === 0 ? desktopHeight : mobileHeight
                : desktopHeight}px`,
            backgroundImage: `url(${isMobile ? (srcMobile === "" ? srcDesktop : srcMobile) : srcDesktop})`,
        }}>
      <div class="container px-5 lg:p-0 relative z-20 lg:w-full sm:w-2/3 m-auto">
        <Selector options={options}/>
        <h1 class="text-white text-[30px] leading-[30px] md:text-[50px] md:leading-[50px] mb-5 mt-10 font-bold">
          {title}
        </h1>
        <p class="text-white mb-10">{subtitle}</p>

        {labelBottom && (<div class="flex flex-col items-start gap-3">
            {labelBottom.titulo && (<p class="font-bold text-sm  uppercase text-blue-700 max-w-[148px]">
                {labelBottom.titulo}
              </p>)}
            <p class="text-[#717171] text-sm" dangerouslySetInnerHTML={{ __html: labelBottom.text }}>
            </p>
          </div>)}
        {findOutMore &&
            (<div class="flex items-center gap-2 pt-8">
              <Icon id={"ChevronUp"} width={20} class="rotate-180"/>
              <p class="text-[#717171]">{findOutMore?.text}</p>
            </div>)}
      </div>
    </div>);
}
