import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import { Logo } from "../../components/header/Header.tsx";
import Button from "site/components/ui/Button.tsx";
import NavItem, {
  type INavItem,
} from "site/components/header/NavItem.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island

export interface Props {
  items?: INavItem[];
  logo?: Logo;
  logoPosition?: "left" | "center";
}

function Navbar(
  { items, logo, device }: {
    items?: INavItem[];
    logo?: Logo;
    logoPosition?: "left" | "center";
    device: "mobile" | "desktop" | "tablet";
  },
) {
  const platform = usePlatform();

  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden container flex items-center w-full px-7 justify-between"
      >
        <div class="w-7">
          <MenuButton />
        </div>
        <div class="w-2/5 flex">
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

        <div class="w-2/5">
          <ul>
            <li class="flex justify-center">
              <a
                class=" bg-[#0066E4] rounded-[30px] group border-2 border-[#0066e4] hover:bg-transparent text-white px-[0.25rem] text-sm py-1"
                href="/contato"
              >
                Entre em Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden container sm:flex items-center w-full px-6 space-between py-3">
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
      <ul>
        <li>
          <a
            class=" bg-[#0066E4] rounded-[30px] group border-2 border-[#0066e4] hover:bg-transparent text-white px-5 py-1"
            href="/contato"
          >
            Entre em Contato
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
