import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  label?: string;
  title?: string;
  brands?: Brands[];
}

interface Brands {
  image?: ImageWidget;
  alt?: string;
}

const Brands = ({ label, title, brands }: Props) => {
  return (
    <div class="px-8">
      <div class="flex flex-col items-center mt-[48px]">
        <span class="visual-brand my-3 w-[78px]"></span>
        <h1 class="uppercase text-xs lg:text-base font-normal text-white">
          {label}
        </h1>
        <p class="font-extrabold text-3xl lg:text-[40px] text-white text-center">
          {title}
        </p>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-5 lg:gap-9 my-14 lg:my-[80px] lg:max-w-[919px] mx-auto w-full">
        {brands?.map((item, index) => (
          <div
            key={index}
            class={`flex justify-start lg:justify-center`}
          >
            <img class="max-w-full h-auto" src={item?.image} alt={item?.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
