import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../../components/ui/Button.tsx";
import { useDevice } from "@deco/deco/hooks";
interface Props {
    /**
     * @title variação de componente
     */
    type?: "first" | "second";
    /**
     * @title Adicione uma imagem para desktop
     */
    imageDesktop?: ImageWidget;
    /**
     * @title Adicione uma imagem para mobile
     */
    imageMobile?: ImageWidget;
    /**
     * @title Adicione um titulo
     */
    title?: string;
    /**
     * @title Adicione um subtitulo
     */
    subtitle?: string;
    /**
     * @title CTA
     */
    button?: CTA;
}
interface CTA {
    /**
     * @title Link para onde direciona o botão
     */
    link?: string;
    /**
     * @title conteúdo do botão
     */
    label?: string;
}
const InfoCard = ({ imageDesktop, imageMobile, title, subtitle, button, type, }: Props) => {
    const device = useDevice();
    return (<a href={button?.link} class={`${type === "first" ? "h-[390px] lg:h-[530px]" : "h-[400px] lg:h-[400px]"}  bg-cover bg-center flex flex-col items-center pb-[60px] lg:pb-0 justify-end lg:justify-center`} style={{
            backgroundImage: `url(${device === "desktop" ? imageDesktop : imageMobile})`,
        }}>
      <div class={`flex flex-col items-center text-center space-y-2 ${type === "second" ? " gap-4" : ""}`}>
        <div class="flex flex-col justify-center items-center">
          {title &&
            (<>
                <span className="visual-brand my-3 w-[61px]"></span>
                <p class="text-2xl font-extrabold text-white">{title}</p>
              </>)}
        </div>
        {subtitle
            ? (<p class="text-base text-white font-light max-w-[208px] lg:max-w-[238px]">
              {subtitle}
            </p>)
            : null}
        {button?.link && button?.label && (<Button primary={true} class="mt-5 inline-block px-6 py-2  text-white transition rounded-full font-base gap-3" href={button.link} target="_blank">
            {button.label}
          </Button>)}
      </div>
    </a>);
};
export default InfoCard;
