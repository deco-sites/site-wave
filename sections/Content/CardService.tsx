import type { ImageWidget } from "apps/admin/widgets.ts";

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
            <div className="ml-10 flex flex-col w-full">
              {card.isEmptyBrand && (
                <span className="visual-brand my-3 w-[61px]"></span>
              )}
              <p className="text-[26px] text-white my-5 lg:my-0 leading-[35px] font-bold">
                {card.content}
              </p>
              <a
                style={`width:fit-content;`}
                className="text-white btn-brand py-1 px-6 mt-5 text-sm lg:w-fit "
                href={card.link}
              >
                {card.label}
              </a>
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
