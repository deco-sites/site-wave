import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Logo } from "../../components/header/Header.tsx";
import Button from "deco-sites/site-wave/components/ui/Button.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, logo, device }: {
    items: SiteNavigationElement[];
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
            <li class="flex">
              <a
                href="/contato"
                class="btn-brand w-full px-2 py-1 text-center text-sm"
              >
                Entre em <b>Contato</b>
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
        class={`flex gap-10  justify-start" 
          }`}
      >
        {items.map((item) => <NavItem item={item} />)}
      </ul>
      <ul>
        <li>
          <Button href="/contato">
            Entre em Contato
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
