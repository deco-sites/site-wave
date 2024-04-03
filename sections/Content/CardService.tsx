import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "deco-sites/site-wave/components/ui/Button.tsx";

interface Card {
  content?: string;
  label?: string;
  link?: string;
  image?: ImageWidget;
  isEmptyBrand?: boolean;
}

interface Props {
  cards: Card[];
}

const CardService = ({ cards }: Props) => {
  return (
    <div className="bg-black ">
      <div class="px-6 flex flex-col lg:flex-row gap-6 lg:grid lg:grid-cols-3 container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#0A0A0A] rounded-lg flex py-[40px] mb-5 lg:justify-between lg:max-w-[522px]"
          >
            <div className="ml-10 flex flex-col w-full justify-between">
              {card.isEmptyBrand && (
                <span className="visual-brand my-3 w-[61px]"></span>
              )}
              <p className="text-[26px] text-white my-5 lg:my-0 leading-[35px] font-bold">
                {card.content}
              </p>
              <Button
                style={`width:fit-content;`}
                href={card.link}
              >
                {card.label}
              </Button>
            </div>
            <div class="mr-10">
              <img
                class="max-w-[160px] h-[160px]"
                src={card.image}
                alt="Card Image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardService;
