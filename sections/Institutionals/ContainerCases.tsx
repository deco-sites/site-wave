import { renderSection } from "apps/website/pages/Page.tsx";
import CardBrand from "../Institutionals/CardBrand.tsx";
import { Logo, Props as CardBrandProps, Service, Settings, } from "../Institutionals/CardBrand.tsx";
import { type Section } from "@deco/deco/blocks";
import { useDevice } from "@deco/deco/hooks";
interface ContainerCasesProps {
    firstColumn: Section[];
    brand?: Logo;
    services?: Service[];
    settings?: Settings;
}
const ContainerCases = ({ firstColumn, brand, services, settings }: ContainerCasesProps) => {
    const cardBrandProps: CardBrandProps = {
        brand,
        services,
        settings,
    };
    const device = useDevice();
    return (<div class="container px-6 lg:px-0 flex flex-row lg:gap-7">
      <div class="w-full lg:w-3/4">
        {firstColumn.map(renderSection)}
      </div>
      {device === "desktop" &&
            (<div class="flex w-1/4">
            <div class="mt-5">
              <CardBrand {...cardBrandProps}/>
            </div>
          </div>)}
    </div>);
};
export default ContainerCases;
