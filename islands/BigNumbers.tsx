import { useEffect, useState, useRef } from "preact/hooks";

export interface Props {
  title: string;
  subtitle: string;
  targetNumber: number;
  iconPlus: string;
}

const BigNumbers = ({ title, subtitle, targetNumber, iconPlus }: Props) => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [showTitle, setShowTitle] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const tempo_intervalo = 5;
    const tempo = 4000;
    const countTo = targetNumber;
    const intervalos = tempo / tempo_intervalo;
    const incremento = countTo / intervalos;

    let valor = 0;

    const interval = setInterval(() => {
      if (valor >= countTo) {
        setCurrentNumber(countTo.toLocaleString());
        setShowTitle(true);
        clearInterval(interval);
        return;
      }

      valor += incremento;
      setCurrentNumber(Math.ceil(valor).toLocaleString());
    }, tempo_intervalo);

    return () => clearInterval(interval);
  }, [targetNumber, hasStarted]);

  return (
    <div class="container" ref={containerRef}>
      <div class="flex flex-col items-start lg:items-start text-left lg:min-w-[300px] min-w-[128px] gap-1">
        <div class="font-bold text-2xl lg:text-5xl flex items-center  text-white">
          {iconPlus && <span>{iconPlus}</span>}
          <p>
            {currentNumber} <span class="">{title}</span>
          </p>
        </div>
        <p class="text-xs lg:text-base max-w-xs leading-relaxed text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default BigNumbers;
