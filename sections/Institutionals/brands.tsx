import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @title Titulo da pagina
   */
  label?: string;
  /**
   * @title subtitulo da pagina
   */
  title?: string;
  /**
   * @title Marcas ou parceiros
   */
  brands?: Brands[];
}

interface Brands {
  /**
   * @title Adicione uma marca
   */
  image?: ImageWidget;
  /**
   * @title Titulo alternativo para marca
   *  @description Preencher esse campo para leitura de tela
   */
  alt?: string;
}

const Brands = ({ label, title, brands }: Props) => {
  return (
    <div class="px-8">
      <div class="flex flex-col items-center mt-[48px]">
        <span class="visual-brand my-3 w-[78px]"></span>
        <p class="uppercase text-xs lg:text-base font-normal text-white">
          {label}
        </p>
        <h1 class="font-extrabold text-3xl lg:text-[40px] text-white text-center">
          {title}
        </h1>
      </div>
      {brands &&
        (
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-5 lg:gap-9 mt-14 lg:mt-[80px] lg:max-w-[919px] mx-auto w-full">
            {brands?.map((item, index) => (
              <div
                key={index}
                class={`flex justify-start lg:justify-center`}
              >
                <img
                  class="max-w-full h-auto"
                  src={item?.image}
                  alt={item?.alt}
                />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Brands;
