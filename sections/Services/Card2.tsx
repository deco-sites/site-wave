interface Props {
  /** @format rich-text */
  title: string;
  /** @format rich-text */
  description: string;
}

export default function Card2({ title, description }: Props) {
  return (
    <div class="container">
      <div class="flex flex-col items-center">
        {/* <div class="w-16 h-0.5 bg-[#0066E4] mb-5" /> */}
        {title &&
          (
            <h2 class="text-white text-lg font-bold text-center mb-5 md:mb-10">
              <span
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </h2>
          )}
        {description &&
          (
            <div
              class="w-full text-white text-xs lg:p-10 rounded-2xl bg-[#0a0a0a] services-list"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
      </div>
    </div>
  );
}
