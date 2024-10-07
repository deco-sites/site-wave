import type { Section } from 'deco/blocks/section.ts'
import { renderSection } from 'apps/website/pages/Page.tsx'
import { useDevice } from "deco/hooks/useDevice.ts";

interface LayoutSettings {
  layoutType: "grid" | "flex"; 
  columnLayout: "primary" | "secondary"; 
}

interface Props {
  sections: Section[];
  layoutSettings: LayoutSettings; 
}

const getLayoutClasses = (layoutType: "grid" | "flex", columnLayout: "primary" ): string => {
  if (layoutType === "grid") {
    const gridClasses = {
      primary: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-center",
    };
    return gridClasses[columnLayout];
  } else if (layoutType === "flex") {
    const flexClasses = {
      primary: "flex flex-col md:flex-row md:space-x-4", 
      secondary: "flex flex-wrap md:space-x-4", 
    };
    return flexClasses[columnLayout];
  }
  return ""; 
};

export default function PageLayout({ sections, layoutSettings }: Props) {
  return (
    <div class={`container justify-center px-5 lg:px-0 ${getLayoutClasses(layoutSettings.layoutType, layoutSettings.columnLayout)}`}>
      {sections.map(renderSection)}
    </div>
  );
}
