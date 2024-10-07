import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Partners from "site/components/ui/Partners.tsx";

interface Banner {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  isEmptyBrand?: boolean;
  action?: {
    href: string;
    title: string;
    subTitle: string;
    label?: HTMLWidget;
  };
  icon?: ImageWidget[];
  label?: string;
}

export default function BannerHero({
  image: {
    alt,
    mobile,
    desktop,
    action,
    icon,
    label,
    isEmptyBrand,
  },
  lcp,
  id,
}: {
  image: Banner;
  lcp?: boolean;
  id: string;
}) {
  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative overflow-y-hidden w-full"
    >
      {action && (
        <div class="absolute top-[274px] lg:top-0 md:bottom-0 bottom-1/2 lg:left-[138px] left-0 right-0 sm:right-auto lg:max-w-[612px] flex flex-col justify-center gap-4 pl-8">
          {isEmptyBrand && <span class="visual-brand w-[70px]" />}
          <span
            class="text-[25px] lg:text-[50px] font-bold text-white max-w-[220px] lg:max-w-[580px] leading-[30px] lg:leading-[53px] lg:mt-6"
            dangerouslySetInnerHTML={{ __html: action.title }}
          />
          <span
            class="text-base text-white max-w-[252px] lg:max-w-[375px]"
            dangerouslySetInnerHTML={{ __html: action.subTitle }}
          />
          <span class="text-white text-xs mt-[60px]">
            <b>{label}</b>
          </span>
          <div class="flex items-center">
            <ul class="lg:max-w-[600px] overflow-hidden">
              <li
                class="animation-right items gap-2"
                style={{ "--animation-time": "5000s" }}
              >
                <Partners
                  rowImages={[
                    {
                      colImages: Array.from({ length: 20 }, (_, i) => icon[i % icon.length]),
                    },
                  ]}
                />
              </li>
            </ul>
          </div>
        </div>
      )}
      <img
        class="object-cover w-full h-full hidden lg:block"
        loading={lcp ? "eager" : "lazy"}
        src={desktop}
        alt={alt}
      />
      <img
        class="object-cover lg:hidden"
        loading={lcp ? "eager" : "lazy"}
        src={mobile}
        alt={alt}
      />
    </a>
  );
}
