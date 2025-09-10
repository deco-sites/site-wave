import ServicesCards from "./servicesCards.tsx";
import type { Cards } from "./servicesCards.tsx";

interface Props {
  /**
   * @title Titulo da página
   */
  title?: string;
  /**
   * @title Subtulo da página
   */
  label?: string;
  /**
   * @title Clique para adicionar um novo serviço
   */
  cards?: Cards[];
}

const ServicePage = ({ title, label, cards }: Props) => {
  return (
    <div class="container px-4 mt-12 lg:mt-24">
      <span class="w-[70px] h-[4px] bg-primary block mx-auto mb-2 rounded-full">
      </span>
      <h1 class="text-white text-center mb-2 uppercase text-base">{title}</h1>
      <h2 class="text-white text-center text-4xl">{label}</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[50px] lg:mt-[100px]">
        {cards?.map((card, index) => <ServicesCards key={index} {...card} />)}
      </div>
    </div>
  );
};

export default ServicePage;
