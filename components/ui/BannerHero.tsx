import type { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";

interface Banner {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  isEmptyBrand?: boolean;
  label?: string;
  action?: Content;
}

interface Content {
  href: string;
  /**
   * @title Titulo do banner
   * @format textarea
   */
  title: string;
  /**
   * @title Conteudo do banner
   * @format rich-text
   */
  content: string;

  label?: string;
}

export default function BannerHero({
  image: {
    mobile,
    desktop,
    action,
  },
}: { image: Banner; lcp?: boolean; id: string }) {
  const device = useDevice();
  return (
    <>
      <div
        className="relative"
        style={{
          backgroundImage: device === "desktop"
            ? `url(${desktop})`
            : `url(${mobile})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          padding: "50px 0",
          height: "729px",
        }}
      >
        {action && (
          <div className="content-wrapper container px-5 lg:px-0 mx-auto py-10 h-full justify-center">
            <div class="flex flex-col gap-4 max-w-[670px] h-full justify-center">
              <h1
                className="text-[24px] leading-none lg:text-[50px] font-bold text-white flex flex-col">
                {action.title}
              </h1>
              <div
                className="text-base text-white flex"
               dangerouslySetInnerHTML={{ __html: action.content }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
