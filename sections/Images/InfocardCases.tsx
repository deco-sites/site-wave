import type { ImageWidget } from "apps/admin/widgets.ts";
import { VideoWidget as Video } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
interface Banner {
    /**
   * @title Marque para exibir imagens
   */
    image?: boolean;
    /**
  * @title Marque para exibir videos
  */
    video?: boolean;
    /**
* @title Texto alternativo da midia
*/
    alt?: string;
    /**
* @title Upload da image
*/
    srcImage?: ImageWidget;
    /**
* @title Upload do video
*/
    srcVideo?: Video;
}
interface Props {
    /**
    * @title Titulo do card
    * @format rich-text
    */
    title?: string;
    /**
     * @title Descrição do card
     * @format rich-text
     */
    content?: string;
    image?: Banner;
}
const InfocardCases = ({ content, image }: Props) => {
    const device = useDevice();
    return (<div class="px-5 lg:px-0">
            <div class="container bg-[#1b1b1be3] rounded-lg">
                <div class="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 p-5">
                    {content && (<div class="text-sm text-white text-start flex m-auto " dangerouslySetInnerHTML={{ __html: content || '' }}/>)}
                    {image?.image && image.srcImage && (<Image class="flex mx-auto" src={image.srcImage} alt={image.alt || "Banner image"} width={device === "mobile" ? 332 : 488} height={device === "mobile" ? 197.84 : 290}/>)}
                    {image?.video && image.srcVideo && (<iframe width={device === "mobile" ? 332 : 488} height={device === "mobile" ? 197.84 : 290} class="rounded-lg" src={image?.srcVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>)}
                </div>

            </div>
        </div>);
};
export default InfocardCases;
