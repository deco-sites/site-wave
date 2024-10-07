//import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { RichText } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";

interface Title {


  /**
 * @title Icone
 */
  icon: IconProps;
  /**
* @title Depoimento
*/
  depoiments: DepoimentProps;


}
interface DepoimentProps {
  /**
 * @title Escreva aqui o depoimento
 */
  text: RichText;

  /**
   * @title Autor do depoimento
   */
  author: string;
  /**
   * @title Cargo do autor e empresa
   */
  office: string;
}

interface IconProps {
  /**
* @title Largura do icone?
*/
  width?: number;
  /**
* @title Altura do icone?
*/
  height?: number;

}


export default function Depoiment(
  { depoiments, icon }: Title,
) {
  return (
    <div class="bg-black ">
      <div class="container">
        <div class={`py-10 flex justify-center flex-col items-start lg:max-w-[543px]`}>
          {icon && (
            <Icon id={"doubleQuotes"} width={icon?.width} height={icon?.height} />
          )}

          <p
            dangerouslySetInnerHTML={{ __html: depoiments?.text }}
            class="text-xl lg:text-3xl font-bold text-[#717171] text-start mt-2"
          />

          <p class="font-bold text-white mt-2">{depoiments?.author}</p>
          <p class="text-[#717171]">{depoiments?.office}</p>
        </div>
      </div>
    </div>
  )
}
