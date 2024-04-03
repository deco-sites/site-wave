import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;

  return (
    <div class="collapse">
      <input type="checkbox" />
      <div class="collapse-title text-white flex flex-row justify-between items-center">
        {item.name}
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
      </div>

      <div class="collapse-content">
        <ul>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-blue-500">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
