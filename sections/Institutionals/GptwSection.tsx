import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
interface Props {
  /**
   * @title Titulo da Sessão
   */
  title?: RichText;
  /**
   * @title Imagem do selo GPTW
   */
  gptwImage?: ImageWidget;
  /**
   * @title Texto do selo GPTW
   */
  content?: RichText;
  /**
   * @title Imagem do time
   */
  src?: ImageWidget;
}
const GptwSection = ({ ...props }: Props) => {
  const device = useDevice();
  return (
    <div>
      <div class="container flex flex-col lg:flex-row justify-between px-5 lg:px-0">
        <div>
          <div class="mb-5 lg:mb-10">
            <span className={`visual-brand w-[70px] mb-5 lg:mb-7`} />
            <div dangerouslySetInnerHTML={{ __html: props?.title }} />
          </div>
          <div class="flex items-center gap-5 lg:gap-12 flex-row lg:flex-row mb-5 lg:mb-0">
            <img
              width={device === "mobile" ? 148 : 296}
              height={device === "mobile" ? 116 : 232}
              src={props?.gptwImage}
              alt={props?.title}
            />
            <div class="lg:max-w-[325px]">
              <p dangerouslySetInnerHTML={{ __html: props?.content }} />
            </div>
          </div>
        </div>
        <div>
          <img
            class="rounded-[20px]"
            src={props?.src}
            alt={props?.title}
            width={device === "mobile" ? 350 : 460}
            height={device === "mobile" ? 260 : 460}
          />
        </div>
      </div>
    </div>
  );
};
export default GptwSection;
