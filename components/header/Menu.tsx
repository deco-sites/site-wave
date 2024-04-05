import type { INavItem } from "./NavItem.tsx";
import Collapsable from "deco-sites/site-wave/components/ui/Collapsable.tsx";
import Icon from "deco-sites/site-wave/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  items: INavItem[];
}

function Menu({ items }: Props) {
  const itemsWithChildren = items.filter((item) =>
    item.children && item.children.length > 0
  );
  const itemsWithoutChildren = items.filter((item) =>
    !item.children || item.children.length === 0
  );

  return (
    <div class="overflow-y-scroll no-scrollbar">
      <div>
        {itemsWithChildren.map((navItem, index) => (
          <Collapsable
            title={
              <div class="flex items-center space-between px-5">
                <div class="bg-[#0a0a0a] flex items-center space-between px-5 rounded-[20px] w-full">
                  <span class="text-white py-2 ">{navItem.name}</span>
                  <Icon style="color: white;" id="ChevronRight" size={16} />
                </div>
              </div>
            }
          >
            <div class="py-2 px-5">
              <div class="flex space-between rounded-[20px] flex-col items-start gap-1">
                {!!navItem.children &&
                  navItem.children.map((children, itemIndex) => (
                    <div>
                      <a
                        class="text-white flex gap-2 py-2 w-full px-4 rounded-[20px] font-bold"
                        href={children.url}
                      >
                        <img
                          src={children.icon}
                          width={18}
                          height={11}
                          alt={children.name}
                        />
                        {children.name}
                      </a>
                      <p className="text-[#757575] px-4">
                        {children?.subtitle}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </Collapsable>
        ))}
        {itemsWithoutChildren.map((item) => (
          <div class="flex px-5 my-2">
            <a
              class="bg-[#0a0a0a] flex items-center space-between px-5 py-2 rounded-[20px] w-full text-white"
              href={item.url}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
