import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "site/components/ui/Button.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

interface ButtonProps {
  label?: string;
  link?: string;
}

interface Card {
  content?: string;
  image?: ImageWidget;
  button?: ButtonProps;
}

interface Props {
  cards: Card[];
  viewMoreButton?: ButtonProps;
}

//const device = useDevice()

const CardItem = ({ card }: { card: Card }) => (
  <div class="flex justify-center w-full">
    <div class="bg-[#1b1b1be3] rounded-lg flex p-3 lg:p-6 lg:justify-between w-full">
      <div class="flex flex-col justify-center gap-5">
        <span class="visual-brand w-[60px]"></span>
        <p class="text-sm lg:text-xl text-white font-bold">
          {card.content}
        </p>
        {card.button?.label && (
          <Button class="text-xs lg:text-base" href={card.button.link}>
            {card.button.label}
          </Button>
        )}
      </div>
      {card.image && (
        <div class="">
          <img
            class="w-32 h-28 lg:w-40 lg:h-36"
            src={card.image}
            alt="Card Image"
          />
        </div>
      )}
    </div>
  </div>
);

const CardService = ({ cards, viewMoreButton }: Props) => {
  return (
    <div class="bg-black">
      <div
        class={`px-6 flex flex-col gap-6 container lg:grid lg:grid-cols-3 justify-center`}
      >
        {cards.map((card, index) => <CardItem key={index} card={card} />)}
      </div>

      {viewMoreButton?.label && (
        <div class="flex justify-center mt-8">
          <Button style="width:fit-content;" href={viewMoreButton.link}>
            {viewMoreButton.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardService;
