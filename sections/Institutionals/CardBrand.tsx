import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
export interface Logo {
    logo?: ImageWidget;
    alt?: string;
}
export interface Service {
    icon?: ImageWidget;
    title?: string;
    paragraph?: string;
    titleColor?: "primary" | "secondary";
}
export interface Settings {
    hasBg?: boolean;
    hasLogo?: boolean;
    addTitle?: boolean;
    alignment?: "start" | "end" | "center";
    sticky?: boolean;
}
export interface Props {
    settings?: Settings;
    brand?: Logo;
    title?: string;
    services?: Service[];
}
export const getAlignment = (alignment: "start" | "end" | "center"): string => {
    const alignments: Record<typeof alignment, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
    };
    return alignments[alignment] || "";
};
export const getTitleColor = (color: "primary" | "secondary"): string => {
    const colors = {
        primary: "#0066E4",
        secondary: "#F71963",
    };
    return colors[color];
};
const CardBrand = ({ brand, services, settings }: Props) => {
    const device = useDevice();
    return (<div class={`container flex ${getAlignment(settings?.alignment)} ${settings?.sticky && "sticky top-[110px]"} `}>
      <div class={`rounded-[20px] h-fit flex flex-col gap-[25px] w-full 
                        ${settings?.hasBg
            ? "bg-[#0A0A0A] px-10 min-w-[358px]"
            : "lg:max-w-[666px]"} ${settings?.hasLogo ? "py-10" : "pb-10"}`}>
        <div class={`${settings?.hasLogo && "pb-5 border-b border-[#393939]"}`}>
          {settings?.hasLogo && brand?.logo && (<img width={175} height={61} src={brand.logo} alt={brand.alt}/>)}
        </div>
        {services?.map((service) => {
            const color = getTitleColor(service?.titleColor ?? "primary");
            return (<div class="flex flex-col items-start gap-[10px]">
              <div class={`bg-black rounded-[10px] ${settings?.hasLogo && "p-[15px]"} flex items-center justify-center`}>
                {service?.icon && (<Image src={service.icon} width={24} height={24}/>)}
              </div>
              <div class="flex items-center">
                <p class="uppercase text-base text-[#717171]">
                  {service?.title && (<span style={{ color }} class="mr-[5px] uppercase">
                      {service.title}
                    </span>)}
                  {service?.paragraph}
                </p>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
export default CardBrand;
