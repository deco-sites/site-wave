import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import { Logo, CTA } from "../../components/header/Header.tsx";
import Button from "site/components/ui/Button.tsx";
import NavItem, {
  type INavItem,
} from "site/components/header/NavItem.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island


export interface Props {
  items?: INavItem[];
  logo?: Logo;
  cta?: CTA;
  logoPosition?: "left" | "center";
  device: "mobile" | "desktop" | "tablet";
}

function Navbar({ items, logo, device, cta }: Props) {
  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden container flex items-center w-full px-4 justify-between"
      >
        <div class="w-1/12">
          <MenuButton />
        </div>
        <div class="w-8/12 flex">
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image
                class="justify-center"
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>

        <div class="w-3/12">
          <div>
            <Button
              class="text-xs"

              href={cta.link}>
              {cta?.label}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden container sm:flex items-center w-full space-between py-3">
      <div
        class={`flex justify-start max-w[200px]:
          }`}
      >
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="block"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
      </div>

      <ul
        class={`flex gap-5  justify-start`}
      >
        {items?.map((item) => (
          <>
            <NavItem item={item} />
            <li class="last:hidden list-none benefitdot" />
          </>
        ))}
      </ul>
      <div>
        <Button
          href={cta.link}>
          {cta?.label}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
