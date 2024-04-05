import {
  IconInstagram,
  IconLinkedin,
  IconYoutube,
} from "deco-sites/site-wave/components/ui/CustomIcons.tsx";
import type { JSX } from "preact";

// Definindo a interface SocialItem
export interface SocialItem {
  label: "Instagram" | "Youtube" | "Linkedin";
  link: string;
}

// Função Social
export default function Social(
  { content, vertical = false }: {
    content?: SocialItem[];
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content && content.length > 0 && (
        <div className="flex flex-col gap-4 items-center m-[auto 0] py-6 lg:py-0 lg:items-end">
          <ul
            className={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "items-center"
            }`}
          >
            {content.map((item) => {
              let iconComponent: JSX.Element | null = null;

              switch (item.label) {
                case "Instagram":
                  iconComponent = <IconInstagram />;
                  break;
                case "Linkedin":
                  iconComponent = <IconLinkedin />;
                  break;
                case "Youtube":
                  iconComponent = <IconYoutube />;
                  break;
                default:
                  iconComponent = null;
              }

              return (
                <li key={item.label}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    className="flex gap-2 items-center"
                  >
                    <span className="block p-1">
                      {iconComponent}
                    </span>
                    {vertical && (
                      <div className="text-sm hidden lg:block">
                        {item.label}
                      </div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
