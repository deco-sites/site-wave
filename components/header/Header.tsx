import { AppContext } from "../../apps/site.ts";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import type { INavItem } from "site/components/header/NavItem.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface CTA {
  label?: string;
  link?: string;
}

export interface Props {
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: INavItem[];

  cta: CTA;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";
}


function Header({
  navItems = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  cta,
  logoPosition = "center",

  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items }}
          platform={platform}
        >
          <div class="bg-black fixed w-full z-50">
            <Navbar
              device={device}
              items={items}
              logo={logo}
              logoPosition={logoPosition}
              cta={cta}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
