import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
  title: HTML;
  description: HTML;
}

export default function Card3({ title, description }: Props) {
  return (
    <div class="container">
      <div className="p-10 rounded-2xl bg-[#0a0a0a]">
        {title &&
          (
            <h2
              class="text-white text-2xl font-bold mb-5"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        {description &&
          (
            <div
              class="services-list"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
      </div>
    </div>
  );
}
