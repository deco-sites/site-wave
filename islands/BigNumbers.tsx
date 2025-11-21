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
    <div class="w-full" ref={containerRef}>
      <div class="flex flex-col items-center text-center space-y-2 md:space-y-4">
        {/* Número com ícone */}
        <div class="flex items-center justify-center space-x-1 md:space-x-2">
          {iconPlus && (
            <span class="text-lg md:text-2xl lg:text-3xl text-white">
              {iconPlus}
            </span>
          )}
          <div class="flex items-baseline space-x-1">
            <span class="text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight">
              {currentNumber}
            </span>
            <span class="text-base md:text-lg lg:text-2xl font-semibold text-white uppercase">
              {title}
            </span>
          </div>
        </div>
        
        {/* Subtítulo */}
        <p class="text-sm md:text-base lg:text-lg text-gray-300 max-w-[200px] md:max-w-[250px] lg:max-w-[300px] leading-relaxed px-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default BigNumbers;
