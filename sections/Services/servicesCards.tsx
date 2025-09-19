import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy title
 */
export interface Cards {
  /**
   * @title Titulo do card
   */
  title: string;
  /**
   * @title descrição do card
   */
  description: string;
  /**
   * @title icone do card
   */
  image: ImageWidget;
  /**
   * @title texto alternativo do icone
   */
  alt?: string;
  /**
   * @title Link do botão
   */
  link: string;
}
const servicesCards = ({ ...cards }: Cards) => {
  return (
    <div class="flex flex-col gap-4 p-10 bg-[#0A0A0A] rounded-[20px]">
      <div class="flex gap-4">
        <img src={cards.image} alt={cards.alt} />
        <h2 class="text-white font-semibold text-2xl">{cards.title}</h2>
      </div>
      <p class="text-base text-[#717171]">{cards.description}</p>
      <a
        class="py-2 px-4 text-white text-center bg-[#0066E4] rounded-full text-base w-fit mt-2"
        href={cards.link}
      >
        Saiba Mais
      </a>
    </div>
  );
};

export default servicesCards;
