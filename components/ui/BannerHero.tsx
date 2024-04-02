import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  isEmptyBrand?: boolean;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label?: string;
    /** @description Icon image */
    icon?: string;
  };
  /** @description Icon Label */
  icon?: ImageWidget[];
  label?: string;
}

export default function BannerHero(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
    icon,
    label,
    isEmptyBrand,
  } = image;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      className="relative overflow-y-hidden w-full"
    >
      {action && (
        <div className="absolute top-[236px] md:bottom-0 bottom-1/2 lg:left-[138px] left-0 right-0 sm:right-auto  lg:max-w-[612px] flex flex-col justify-center gap-4 pl-8 py-12">
          <span className={` ${isEmptyBrand ? "visual-brand w-[70px]" : ""}`}>
          </span>
          <span className="text-[21px] lg:text-[50px] font-bold text-white max-w-[260px] lg:max-w-[580px]">
            {action.title}
          </span>
          <span className="text-base font-light text-white max-w-[260px] mt- ">
            {action.subTitle}
          </span>
          <span className="text-white text-xs mt-[60px]">
            <b>{label}</b>
          </span>
          <div className="overflow-hidden">
            <div className="flex items-center track-slider">
              <span class="text-white">label 1</span>
              <span class="text-white">label 1</span>
              <span class="text-white">label 1</span>
              <span class="text-white">label 1</span>
              <span class="text-white">label 1</span>
              <span class="text-white">label 1</span>
              <span class="text-white">label 1</span>
            </div>
          </div>
        </div>
      )}
      <img
        className="object-cover w-full h-full hidden lg:block"
        loading={lcp ? "eager" : "lazy"}
        src={desktop}
        alt={alt}
      />
      <img
        className="object-cover lg:hidden"
        loading={lcp ? "eager" : "lazy"}
        src={mobile}
        alt={alt}
      />
    </a>
  );
}
