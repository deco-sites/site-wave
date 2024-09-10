import Icon from "deco-sites/site-wave/components/ui/Icon.tsx";
import type { ServiceOption } from "../../apps/site.ts";

export interface SelectorProps {
  options: ServiceOption[];
}

export default function Selector({
  options = [{
    icon: "DigitalPerformance",
    text: "Digital Performance",
    url: "/services/digital-performance",
  }, {
    icon: "DigitalPerformance",
    text: "Digital Performance",
    url: "/services/digital-performance",
  }],
}: SelectorProps) {
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-3 rounded-full py-2 px-5 text-[#717171] border border-[#717171] mb-2"
      >
        Todas as soluções
        <Icon id="ChevronDown" size={16} class="text-[#717171]" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-neutral-800 rounded-box w-64"
      >
        {options.map((option) => (
          <li>
            <a
              class="flex items-center gap-3 !text-white !bg-transparent hover:!bg-neutral-700"
              href={option.url}
            >
              <Icon id={option.icon} size={20} />
              {option.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
