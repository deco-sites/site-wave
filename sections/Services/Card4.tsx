interface Props {
  /**
* @format rich-text
* @default Click Oferecer produtos veganos no seu estabelecimento nunca foi tão fácil!
Com a linha Vida Veg Chef, você contará com:.
  */
  title: string;
  /**
* @format rich-text
* @default Click Oferecer produtos veganos no seu estabelecimento nunca foi tão fácil!
Com a linha Vida Veg Chef, você contará com:.
  */
  description: string;
}

export default function Card4({ title, description }: Props) {
  return (
    <div class="container px-4">
      <div class="flex flex-col items-start">
        {/* <div class="w-16 h-0.5 bg-[#0066E4] mb-5" /> */}
        {title &&
          (
            <h2
              class="services-title text-white text-lg  lg:text-[40px] lg:leading-[40px] font-bold mb-5"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        {description &&
          (
            <div
              class="text-white text-xs leading-normal"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
      </div>
    </div>
  );
}
