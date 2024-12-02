import { useEffect, useRef, useState } from "preact/hooks";
import Button from "../components/ui/Button.tsx";
import { RichText } from "apps/admin/widgets.ts";

export interface Job {
  title?: string;
  workModel: "Home Office" | "Hibrido" | "Presencial";
  area:
    | "Designer"
    | "Projetos"
    | "SEO"
    | "Conteúdo"
    | "Mídia Paga"
    | "Desenvolvimento"
    | "Atendimento"
    | "E-commerce"
    | "Marketplace"
    | "Social Media"
    | "Recursos Humanos"
    | "CRM";
  cta?: CTA;
}

interface CTA {
  href?: string;
}

export interface Props {
  filterOptions?: FilterOptions;
  jobs: Job[];
}

interface FilterOptions {
  title?: RichText;
}

const JobList = ({ jobs, filterOptions }: Props) => {
  const [selectedWorkModel, setSelectedWorkModel] = useState<
    string | undefined
  >();
  const [selectedArea, setSelectedArea] = useState<string | undefined>();
  const [workModelFilter, setWorkModelFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [isWorkModelDropdownOpen, setIsWorkModelDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  const workModelRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const workModelOptions = ["Home Office", "Hibrido", "Presencial"];
  const areaOptions = [
    "Designer",
    "Projetos",
    "SEO",
    "Tráfego Pago",
    "Desenvolvimento",
  ];

  const filteredWorkModelOptions = workModelOptions.filter((option) =>
    option.toLowerCase().includes(workModelFilter.toLowerCase())
  );

  const filteredAreaOptions = areaOptions.filter((option) =>
    option.toLowerCase().includes(areaFilter.toLowerCase())
  );

  const filteredJobs = jobs.filter((job) => {
    const workModelMatch = selectedWorkModel
      ? job.workModel === selectedWorkModel
      : true;
    const areaMatch = selectedArea ? job.area === selectedArea : true;
    return workModelMatch && areaMatch;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        workModelRef.current &&
        !workModelRef.current.contains(event.target as Node)
      ) {
        setIsWorkModelDropdownOpen(false);
      }
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setIsAreaDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div class="container px-4 lg:px-0 flex flex-col lg:flex-row justify-between">
      <div class="flex flex-col lg:w-1/4 justify-center lg:mr-10 lg:min-w-[240px] max-h-[240px] lg:sticky mb-8 lg:mb-0">
        <div class="text-white mb-5">
          <span class="visual-brand w-[70px] mb-5"></span>
          <div dangerouslySetInnerHTML={{ __html: filterOptions?.title }} />
        </div>

        {/* Dropdown de Modelo de Trabalho */}
        <div class="relative mb-5" ref={workModelRef}>
          <div
            class="appearance-none text-white text-base p-4 rounded-full bg-black border border-gray-600 w-full text-center cursor-pointer"
            onClick={() => {
              setIsWorkModelDropdownOpen(!isWorkModelDropdownOpen);
              setIsAreaDropdownOpen(false); // Fecha o dropdown de Área
            }}
          >
            {selectedWorkModel || "Modelo de Trabalho"}
          </div>

          {isWorkModelDropdownOpen && (
            <div class="absolute bg-black text-white border border-gray-600 w-full mt-2 rounded-lg z-10">
              <ul class="max-h-40 overflow-auto">
                {filteredWorkModelOptions.map((option) => (
                  <li
                    key={option}
                    class={`p-2 cursor-pointer hover:bg-blue-600 ${
                      selectedWorkModel === option ? "bg-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedWorkModel(option);
                      setIsWorkModelDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Dropdown de Áreas */}
        <div class="relative" ref={areaRef}>
          <div
            class="appearance-none text-white text-base p-4 rounded-full bg-black border border-gray-600 w-full text-center cursor-pointer"
            onClick={() => {
              setIsAreaDropdownOpen(!isAreaDropdownOpen);
              setIsWorkModelDropdownOpen(false);
            }}
          >
            {selectedArea || "Todas as Áreas"}
          </div>

          {isAreaDropdownOpen && (
            <div class="absolute bg-black text-white border border-gray-600 w-full mt-2 rounded-lg z-10">
              <ul class="max-h-40 overflow-auto">
                {filteredAreaOptions.map((option) => (
                  <li
                    key={option}
                    class={`p-2 cursor-pointer hover:bg-blue-600 ${
                      selectedArea === option ? "bg-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedArea(option);
                      setIsAreaDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div class="w-[2px] h-full bg-[#0f0f0f]" />
      {/* Lista de Vagas Filtradas */}
      <div class="lg:w-3/4 lg:ml-10 flex flex-col gap-3">
        {filteredJobs.length > 0
          ? (
            filteredJobs.map((job) => (
              <div
                class="container flex justify-between items-center py-8 px-4 lg:px-8 bg-[#0f0f0f] rounded-3xl"
                key={job.title}
              >
                <div>
                  <p class="text-white text-base font-extrabold">{job.title}</p>
                  <p class="text-[#0066E4] text-sm font-light mt-3">
                    {job.workModel}
                  </p>
                </div>
                <div>
                  <Button href={job?.cta?.href}>Saiba mais</Button>
                </div>
              </div>
            ))
          )
          : (
            <div class="text-white text-center p-8">
              <p>Não há vagas disponíveis com os filtros selecionados.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default JobList;
