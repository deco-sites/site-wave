import type { ImageWidget } from "apps/admin/widgets.ts";

interface Card {
  title?: string;
  subtitle?: string;
  image?: ImageWidget;
  link?: string;
  isEmptyBrand?: boolean;
}

interface Props {
  cards: Card[];
}

const CardCases = ({ cards }: Props) => {
  return (
    <div className="bg-black">
      <div className="px-6 flex-row gap-4 grid grid-cols-2 lg:grid-cols-5 container">
        {cards.map((card, index) => (
          <a href={card.link} key={index} className="relative group m-auto">
            {card.image && (
              <img
                className="object-cover lg:block rounded-[20px]"
                src={card.image}
                alt={card.subtitle || ""}
              />
            )}
            <div className="absolute z-[1] bottom-[10px] lg:bottom-[20px] left-[15px] lg:left-[30px] right-0 transition-all ease-in-out duration-1000 transform group-hover:-translate-y-4">
              {card.isEmptyBrand && (
                <span className="visual-brand mb-2 lg:mb-4 w-9"></span>
              )}
              <p className="text-white font-bold text-lg">{card.title}</p>
              {card.subtitle && (
                <p className="text-white text-xs max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 transition-all duration-1000 ease-in-out max-w-[108px] lg:w-[170px]">
                  {card.subtitle}
                </p>
              )}
            </div>
            <div class="border-gradient h-[10rem] content absolute bottom-0 w-full">
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardCases;
