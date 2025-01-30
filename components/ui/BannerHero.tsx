import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Partners from "site/components/ui/Partners.tsx";
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
   * @format rich-text
   */
  title: string;
  /**
   * @format rich-text
   */
  content: string;
  /**
   * @format rich-text
   */
  subTitle: string;
  label?: string;
}

export default function BannerHero({
  image: {
    mobile,
    desktop,
    action,
  }
}: { image: Banner; lcp?: boolean; id: string; }) {

  const device  = useDevice();
  return (
    <>
        <div
        className="relative"
        style={{
          backgroundImage: device === "desktop" ? `url(${desktop})` : `url(${mobile})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          padding: "50px 0"
        }}
        >
          {action && (
            <div className="content-wrapper container px-5 lg:px-0 mx-auto py-10">
              <div class="flex flex-col">
                <span
                  className="text-[24px] leading-[24px] lg:text-[64px] lg:leading-[64px] text-white max-w-[170px] lg:max-w-[450px] flex flex-col"
                  dangerouslySetInnerHTML={{ __html: action.title }}
                  />
                <span
                  className="text-[24px] leading-[24px]  lg:text-[64px] lg:leading-[64px] text-white max-w-[200px] lg:max-w-[550px] flex"
                  dangerouslySetInnerHTML={{ __html: action.content }}
                  />
                <span
                  className="text-sm leading-[16px]  lg:text-base text-white max-w-[250px] lg:max-w-[425px] flex mt-6"
                  dangerouslySetInnerHTML={{ __html: action.subTitle }}
                  />
              </div>
            </div>
          )}
        </div>
    </>
  );
}

