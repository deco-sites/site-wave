import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import type { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

/**
 * @titleBy text
 */
interface CTA {
  href: string;
  /** @format rich-text */
  text: string;
}

/**
 * @titleBy title
 */
interface Props {
  /**
   * @title Título de Seção
   * @format rich-text
   */
  title?: string;
  /**
   * @title Botão de Ação
   */
  cta?: CTA;
  /**
   * @title Seções
   * @description Escolha as seções dentro de Services: Card1, Card2 ou Card3.
   */
  sections: Section[];
}

export default function Cards({
  title = "",
  cta,
  sections = [],
}: Props) {
  return (
    <div class="container px-5 lg:px-0 py-10">
      {title &&
        (
          <h2
            dangerouslySetInnerHTML={{ __html: title }}
            class="services-title text-white text-center text-2xl md:text-[40px] md:leading-[40px] font-bold mb-10 max-w-[950px] mx-auto"
          />
        )}
      <div class="grid md:grid-cols-2 items-start gap-8 w-full">
        {sections && sections.map(renderSection)}
      </div>
      {cta && cta.href && cta.text && (
        <a
          href={cta.href}
          class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        >
          <span dangerouslySetInnerHTML={{ __html: cta.text }} />
        </a>
      )}
    </div>
  );
}
