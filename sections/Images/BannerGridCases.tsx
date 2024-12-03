import type { ImageWidget } from "apps/admin/widgets.ts";
import { VideoWidget as Video } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import { useDevice } from "deco/hooks/useDevice.ts";

interface Banner {
    alt?: string;
    srcImage?: ImageWidget;
    srcVideo?: Video;
}

/**
 * @titleBy title
 */
interface Subsection {
    /**
   * @title Marque para adicionar imagens
   */
    image?: boolean;
    /**
     * @title Marque para adicionar Videos
     */
    video?: boolean;
    /**
   * @title Titulo da sessão
   * @format rich-text
   */
    title?: string;

    subsection?: Banner[];
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
    description?: string;
    /**
     * @title Clique no + para adicionar uma nova sessão de titulo e imagens
     */
    subsection?: Subsection[];
}

const BannerGridCases = ({ title, description, subsection }: Props) => {
    const device = useDevice();
    return (
        <div class="px-5 lg:px-0">
            <div class="container flex flex-col p-4 bg-[#1b1b1be3] gap-2 rounded-lg">
                {title && (
                    <div
                        class="flex justify-start text-white font-bold text-lg"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                )}
                {description && (
                    <div
                        class="flex justify-start text-white text-sm"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}

                {subsection?.map((sub, index) => (
                    <div key={index}>
                        {sub.title && (
                            <h3 class="flex justify-center text-white text-lg">
                                {sub.title}
                            </h3>
                        )}
                        <div class="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {sub.subsection?.map((banner, bannerIndex) => (
                               sub?.image ? (
                                    <Image
                                        class="flex justify-center mx-auto rounded-lg"
                                        key={bannerIndex}
                                        src={banner.srcImage || ""}
                                        alt={banner.alt || "Banner image"}
                                        width={device === "mobile" ? 274 : 450}
                                        height={device === "mobile" ? 152.22 : 240}
                                    />
                                ) :  sub?.video ? (
                                    <iframe
                                        width={device === "mobile" ? 274 : 450}
                                        height={device === "mobile" ? 152.22 : 240}
                                        class="rounded-lg"
                                        src={banner?.srcVideo}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerpolicy="strict-origin-when-cross-origin"
                                        allowfullscreen
                                    >
                                    </iframe>
                                ) : null
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerGridCases;
