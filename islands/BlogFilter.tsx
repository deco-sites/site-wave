import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";

interface BlogFilterProps {
  categories: string[];
}

export default function BlogFilter({ categories }: BlogFilterProps) {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentSearch, setCurrentSearch] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Função para normalizar texto removendo acentos e convertendo para minúsculas
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
      .replace(/[^\w\s]/g, "") // Remove caracteres especiais
      .trim();
  };

  // Função para verificar similaridade simples (tolerância a erros)
  const isTextMatch = (searchTerm: string, targetText: string): boolean => {
    const normalizedSearch = normalizeText(searchTerm);
    const normalizedTarget = normalizeText(targetText);

    if (normalizedSearch === "") return true;
    if (normalizedTarget.includes(normalizedSearch)) return true;

    // Verifica se cada palavra da busca está presente no texto
    const searchWords = normalizedSearch.split(" ").filter((word) =>
      word.length > 0
    );
    return searchWords.every((word) =>
      normalizedTarget.includes(word) ||
      // Tolerância a erros simples (palavra com 1 caractere diferente)
      normalizedTarget.split(" ").some((targetWord) =>
        word.length > 2 && targetWord.length > 2 &&
        Math.abs(word.length - targetWord.length) <= 1 &&
        [...word].filter((char, i) => char !== targetWord[i]).length <= 1
      )
    );
  };

  const filterPosts = (search: string, category: string) => {
    const postCards = document.querySelectorAll(".post-card") as NodeListOf<
      HTMLElement
    >;

    postCards.forEach((card) => {
      const title = card.dataset.title || "";
      const content = card.dataset.content || "";
      const categories = card.dataset.categories || "";

      // Usar a busca inteligente que ignora acentos e erros
      const matchesSearch = search === "" ||
        isTextMatch(search, title) ||
        isTextMatch(search, content);

      const matchesCategory = category === "all" ||
        categories.split(",").includes(category);

      if (matchesSearch && matchesCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  useEffect(() => {
    // Só aplica filtros se o usuário interagiu
    if (hasInteracted) {
      filterPosts(currentSearch, currentCategory);
    }
  }, [currentSearch, currentCategory, hasInteracted]);

  const handleSearchChange = (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const target = e.target as HTMLInputElement;
    setCurrentSearch(target.value);
    setHasInteracted(true);
  };

  const handleCategoryChange = (
    e: JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => {
    const target = e.target as HTMLSelectElement;
    setCurrentCategory(target.value);
    setHasInteracted(true);
  };

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 max-w-[900px] mx-auto">
      {/* Barra de Pesquisa */}
      <div class="relative mx-auto w-full">
        <input
          type="text"
          placeholder="Pesquisar posts..."
          class="w-full px-4 py-3 pl-12 text-white bg-[#393939] rounded-full focus:outline-none"
          value={currentSearch}
          onInput={handleSearchChange}
        />
        <svg
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          >
          </path>
        </svg>
      </div>

      {/* Filtro por Categorias */}
      <div class="text-center relative">
        <div class="mx-auto w-full relative">
          <select
            class="w-full px-4 py-3 pr-10 text-[#717171] bg-transparent border border-[#717171] rounded-full focus:outline-none appearance-none cursor-pointer  transition-colors"
            value={currentCategory}
            onChange={handleCategoryChange}
            style={{
              backgroundImage:
                `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 12px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
            }}
          >
            <option class="bg-[#393939] text-[#717171] py-2" value="all">
              Todas as categorias
            </option>
            {categories.map((category) => (
              <option
                class="bg-[#393939] text-[#717171] py-2 hover:bg-primary"
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
