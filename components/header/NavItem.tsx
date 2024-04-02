import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import Icon from "deco-sites/site-wave/components/ui/Icon.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;

  return (
    <li class="group flex items-center">
      <a href={url} class="py-6">
        <span class="text-base font-thin text-white flex items-center gap-1">
          {name}
          {children && children.length > 0 && (
            <Icon
              id="ChevronDown"
              size={20}
              class="text-white group-first:text-white group-hover:text-red group-hover:rotate-180 duration-300 hidden md:block"
            />
          )}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-black z-50 w-screen"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            <ul class="block items-start justify-start gap-6 container pb-[50px]">
              <p className="text-base py-6 uppercase font-extrabold text-[#B1B1B1] border-b border-[#B1B1B1]">
                {item?.identifier}
              </p>

              <div class="flex flex-wrap gap-[80px]">
                {children.map((node) => (
                  <li class="py-6">
                    <a class=" flex gap-3" href={node.url}>
                      <img src="" />
                      <div class="max-w-[300px]">
                        <p class="text-base text-white font-bold hover:text-[#0066e4]">
                          {node.name}
                        </p>
                        <p class="text-[#757575]">{node?.identifier}</p>
                      </div>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li>
                          <a class="hover:underline" href={leaf.url}>
                            <span class="text-xs">{leaf.name}</span>
                            <p>{leaf?.identifier}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
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
