import { useEffect, useState } from "preact/hooks";

export interface Props {
  title: string;
  subtitle: string;
  targetNumber: number;
  iconPlus: string;
}

const BigNumbers = ({ title, subtitle, targetNumber, iconPlus }: Props) => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const tempo_intervalo = 5;
    const tempo = 4000;
    const countTo = targetNumber;

    const intervalos = tempo / tempo_intervalo;
    const incremento = countTo / intervalos;

    let valor = 0;

    const updateCount = () => {
      if (valor >= countTo) {
        valor = 0;
        setCurrentNumber(countTo.toLocaleString());
        setShowTitle(true);
        return;
      }

      const newNumber = Math.ceil(valor);
      setCurrentNumber(newNumber.toLocaleString());
      valor += incremento;

      if (newNumber === countTo) {
        setShowTitle(true);
      } else {
        setTimeout(updateCount, tempo_intervalo);
      }
    };

    updateCount();
  }, [targetNumber]);

  return (
    <div class="flex flex-col items-start text-start">
      <div class="font-bold text-[50px] flex items-center ml-4 custom-border text-white">
        <span>{iconPlus}</span>
        <p>
          {currentNumber} <span class="ml-1">{title}</span>
        </p>
      </div>
      <p class="text-base ml-[0.95rem] max-w-[140px] leading-normal text-white">
        {subtitle}
      </p>
    </div>
  );
};

export default BigNumbers;
