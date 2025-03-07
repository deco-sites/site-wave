import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import { CTA, Logo } from "../../components/header/Header.tsx";
import Button from "site/components/ui/Button.tsx";
import NavItem, { type INavItem } from "site/components/header/NavItem.tsx";

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
            <a
              class=" flex py-[5px] px-3 gap-1 items-center bg-[#0066E4] rounded-[30px] group border-2 border-[#0066e4] hover:bg-transparent text-white transition duration-350 ease-in hover:ease-out "
              href={cta?.link}
            >
              {cta?.label}
              <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
    >
      <path
        d="M14.8534 5.35373L10.3535 9.85348C10.2597 9.9473 10.1324 10 9.99976 10C9.86709 10 9.73984 9.9473 9.64602 9.85348C9.55221 9.75967 9.4995 9.63242 9.4995 9.49975C9.4995 9.36707 9.55221 9.23983 9.64602 9.14602L13.2928 5.49997H0.5C0.367396 5.49997 0.240223 5.4473 0.146458 5.35353C0.0526932 5.25977 1.63615e-05 5.1326 1.63615e-05 5C1.63615e-05 4.8674 0.0526932 4.74023 0.146458 4.64647C0.240223 4.5527 0.367396 4.50003 0.5 4.50003H13.2928L9.64602 0.85398C9.55221 0.760165 9.4995 0.632925 9.4995 0.50025C9.4995 0.367576 9.55221 0.240335 9.64602 0.14652C9.73984 0.0527047 9.86709 0 9.99976 0C10.1324 0 10.2597 0.0527047 10.3535 0.14652L14.8534 4.64627C14.8998 4.6927 14.9367 4.74784 14.9619 4.80854C14.987 4.86924 15 4.9343 15 5C15 5.0657 14.987 5.13076 14.9619 5.19146C14.9367 5.25215 14.8998 5.3073 14.8534 5.35373Z"
        fill="white"
      />
    </svg>
            </a>
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
        <a
          class=" flex py-[5px] px-3 gap-1 items-center bg-[#0066E4] rounded-[30px] group border-2 border-[#0066e4] hover:bg-transparent text-white transition duration-350 ease-in hover:ease-out "
          href={cta?.link}
        >
          {cta?.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="10"
            viewBox="0 0 15 10"
            fill="none"
          >
            <path
              d="M14.8534 5.35373L10.3535 9.85348C10.2597 9.9473 10.1324 10 9.99976 10C9.86709 10 9.73984 9.9473 9.64602 9.85348C9.55221 9.75967 9.4995 9.63242 9.4995 9.49975C9.4995 9.36707 9.55221 9.23983 9.64602 9.14602L13.2928 5.49997H0.5C0.367396 5.49997 0.240223 5.4473 0.146458 5.35353C0.0526932 5.25977 1.63615e-05 5.1326 1.63615e-05 5C1.63615e-05 4.8674 0.0526932 4.74023 0.146458 4.64647C0.240223 4.5527 0.367396 4.50003 0.5 4.50003H13.2928L9.64602 0.85398C9.55221 0.760165 9.4995 0.632925 9.4995 0.50025C9.4995 0.367576 9.55221 0.240335 9.64602 0.14652C9.73984 0.0527047 9.86709 0 9.99976 0C10.1324 0 10.2597 0.0527047 10.3535 0.14652L14.8534 4.64627C14.8998 4.6927 14.9367 4.74784 14.9619 4.80854C14.987 4.86924 15 4.9343 15 5C15 5.0657 14.987 5.13076 14.9619 5.19146C14.9367 5.25215 14.8998 5.3073 14.8534 5.35373Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
