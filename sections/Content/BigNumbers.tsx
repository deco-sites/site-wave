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
      <div class="container grid grid-cols-2 lg:flex items-start lg:items-center justify-center lg:justify-between fit gap-10 lg:gap-0">
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
