import type { ImageWidget } from "apps/admin/widgets.ts";

export type Item = {
  label: string;
  href: string;
  icon: ImageWidget;
};

export default function ExtraLinks({ content }: { content?: Item[] }) {
  return (
    <>
      {content && content?.length > 0 && (
        <div class="flex flex-col md:flex-row gap-5 lg:gap-10">
          {content.map((item) => (
            <a class="link text-sm" href={item.href}>
              <img src={item.icon} /> {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
