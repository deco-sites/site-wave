import { renderSection } from "apps/website/pages/Page.tsx";
import type { Section } from "deco/blocks/section.ts";

interface Props {
  firstColumn: Section[];
  secondColumn: Section[];
}

const ContactGrid = ({ firstColumn, secondColumn }: Props) => {
  return (
    <div class="container px-6 lg:px-0 flex flex-col lg:flex-row lg:gap-7">
      <div class="w-full lg:w-3/5 flex flex-col gap-14">
        {firstColumn.map(renderSection)}
      </div>
      <div class="w-full lg:w-2/5">
        {secondColumn.map(renderSection)}
      </div>
    </div>
  );
};

export default ContactGrid;
