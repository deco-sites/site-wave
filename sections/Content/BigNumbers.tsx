import BigNumbers from "../../islands/BigNumbers.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface BIGNumber {
  title?: string;
  subtitle: string;
  targetNumber: number;
  iconPlus?: string;
}

export interface Props {
  NewNumber?: BIGNumber[];
}

function NumberComponents({ NewNumber }: Props) {
  return (
    <div class="bg-black">
      <div class="container px-4 lg:px-0 grid grid-cols-3 lg:flex items-start justify-center lg:justify-between fit gap-5">
        {NewNumber &&
          NewNumber.map((number, index) => (
            <BigNumbers
              key={index}
              iconPlus={number.iconPlus || ""}
              title={number.title || ""}
              subtitle={number.subtitle}
              targetNumber={number.targetNumber}
            />
          ))}
      </div>
    </div>
  );
}
export default NumberComponents;
