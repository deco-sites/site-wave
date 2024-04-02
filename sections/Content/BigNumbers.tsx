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
    <div class="flex justify-center gap-9 bg-black">
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
  );
}
export default NumberComponents;
