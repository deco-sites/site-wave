import { RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy title
 */
interface Props {
  /**
   * @title Título do Card
   */
  title?: RichText;
  /**
   * @title Descrição do Card
   */
  description?: RichText;
}

export default function Card1({
  title = "Google Ads para E-commerce:",
  description =
    "As mídias pagas possibilitam diversos formatos de anúncios e campanhas. Porém, nem todos são ideais para o momento do seu E-commerce. Ao contratar os serviços de mídia paga, você garantirá <strong>economia de tempo e dinheiro ao assegurar que as campanhas sejam planejadas e executadas por profissionais da área</strong> de forma mais assertiva para o seu negócio.",
}: Props) {
  return (
    <div class="container">
      <div className="p-10 rounded-2xl bg-[#0a0a0a]">
        {title
          ? (
            <h2
              class="text-white text-2xl font-bold mb-5"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )
          : null}
        {description
          ? (
            <div
              class="text-white"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )
          : null}
      </div>
    </div>
  );
}
