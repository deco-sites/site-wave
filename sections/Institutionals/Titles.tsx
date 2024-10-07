import { RichText } from "apps/admin/widgets.ts";

interface Title {
  /**
   * @title Adicionar estilo
   */
  isLine?: boolean;
  /**
   * @title Título
   */
  contentTitle: RichText;
}

export default function Titles({
  contentTitle, 
  isLine = false, 
}: Title) {


  return (
    <div class="bg-black">
      <div class={`flex justify-center flex-col  container px-4 lg:px-0`}>
        {isLine && <span class="visual-brand w-[70px] mb-4"></span>}
        <div class={`font-bold text-base lg:text-2xl`} dangerouslySetInnerHTML={{__html: contentTitle}} />
      </div>
    </div>
  );
}
