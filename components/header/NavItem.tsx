import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import Icon from "deco-sites/site-wave/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy name */
export interface Children {
  title?: string;
  name: string;
  subtitle: string;
  url: string;
  icon: ImageWidget;
  isBold?: boolean;
}

/** @titleBy name */
export interface INavItem {
  /** @title Texto */
  name: string;
  /** @title Link */
  url: string;
  /** @title Filhos */
  children?: Children[];
  /** @title Imagem */
  image?: {
    src: ImageWidget;
    alt: string;
  };
}

interface Props {
  item: INavItem;
}

function NavItem({ item }: Props) {
  const { url, name, children } = item;

  return (
    <li className="group flex items-center">
      <a href={url} className="py-6">
        <span className="text-base font-thin text-white flex items-center gap-1">
          {name}
          {children && children.length > 0 && (
            <Icon
              id="ChevronDown"
              size={20}
              className="text-white group-first:text-white group-hover:text-red group-hover:rotate-180 duration-300 hidden md:block"
            />
          )}
        </span>
      </a>

      {children && children.length > 0 && (
        <div
          className="fixed hidden hover:flex group-hover:flex bg-black z-50 w-screen"
          style={{ top: "0px", left: "0px", marginTop: headerHeight }}
        >
          <ul className="block items-start justify-start gap-6 container pb-[50px]">
            <p className="text-base py-6 uppercase font-extrabold text-[#B1B1B1] border-b border-[#B1B1B1]">
              {children[0].title}
            </p>

            <div className="flex flex-wrap gap-5">
              {children.map((node, index) => (
                <li key={index} className="py-6">
                  <a className="flex gap-3" href={node.url}>
                    <div class="max-w-[300px]">
                      <div className="flex items-center gap-2">
                        <img src={node.icon} alt={node.name} />
                        <p className="text-base text-white font-bold hover:text-[#0066e4]">
                          {node.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-[#757575]">{node?.subtitle}</p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;
