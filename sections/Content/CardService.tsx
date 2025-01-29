import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "site/components/ui/Button.tsx";
import { useDevice } from "@deco/deco/hooks";
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
const CardItem = ({ card }: {
  card: Card;
}) => (<div class="flex justify-center w-full">
  <div class="bg-[#1b1b1be3] rounded-lg flex p-3 lg:p-6 w-full justify-between">
    <div class="flex flex-col justify-center gap-5">
      <span class="visual-brand w-[60px]"></span>
      <p class="text-sm lg:text-xl text-white font-bold">
        {card.content}
      </p>
      {card.button?.label && (<a class="w-fit mt-5 flex py-[5px] px-3 gap-1 items-center bg-[#0066E4] rounded-[30px] group border-2 border-[#0066e4] hover:bg-transparent text-white transition duration-350 ease-in hover:ease-out" href={card.button.link}>
        {card.button.label}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="none"
        >
          <path
            d="M14.8534 5.35373L10.3535 9.85348C10.2597 9.9473 10.1324 10 9.99976 10C9.86709 10 9.73984 9.9473 9.64602 9.85348C9.55221 9.75967 9.4995 9.63242 9.4995 9.49975C9.4995 9.36707 9.55221 9.23983 9.64602 9.14602L13.2928 5.49997H0.5C0.367396 5.49997 0.240223 5.4473 0.146458 5.35353C0.0526932 5.25977 1.63615e-05 5.1326 1.63615e-05 5C1.63615e-05 4.8674 0.0526932 4.74023 0.146458 4.64647C0.240223 4.5527 0.367396 4.50003 0.5 4.50003H13.2928L9.64602 0.85398C9.55221 0.760165 9.4995 0.632925 9.4995 0.50025C9.4995 0.367576 9.55221 0.240335 9.64602 0.14652C9.73984 0.0527047 9.86709 0 9.99976 0C10.1324 0 10.2597 0.0527047 10.3535 0.14652L14.8534 4.64627C14.8998 4.6927 14.9367 4.74784 14.9619 4.80854C14.987 4.86924 15 4.9343 15 5C15 5.0657 14.987 5.13076 14.9619 5.19146C14.9367 5.25215 14.8998 5.3073 14.8534 5.35373Z"
            fill="white"
          />
        </svg>
      </a>)}
    </div>
    {card.image && (
      <div class="">
        <img class="w-32 h-28 lg:w-40 lg:h-36" src={card.image} alt="Card Image" />
      </div>)}
  </div>
</div>);
const CardService = ({ cards, viewMoreButton }: Props) => {
  return (<div class="bg-black">
    <div class={`px-6 flex flex-col gap-6 container lg:grid lg:grid-cols-3 justify-center`}>
      {cards.map((card, index) => <CardItem key={index} card={card} />)}
    </div>

    {viewMoreButton?.label && (<div class="flex justify-center mt-8">
      <Button style="width:fit-content;" href={viewMoreButton.link}>
        {viewMoreButton.label}
      </Button>
    </div>)}
  </div>);
};
export default CardService;
