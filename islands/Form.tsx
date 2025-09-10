import { FormEvent, useState } from "preact/hooks";

// Definindo tipagens para o estado
interface FormErrors {
  name: string;
  email: string;
  telefone: string;
  nomeDaEmpresa: string;
  site: string;
  plataforma: boolean;
  cargo: boolean;
  comoNosConheceu: boolean;
  numeroFuncionarios: boolean;
  faturamentoMensal: boolean;
  message: boolean;
}

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: Event) => void;
}

interface CustomSelectProps {
  id: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: Event) => void;
  required: boolean;
  hasError: boolean;
}

const CustomCheckbox = (
  { id, label, checked, onChange }: CustomCheckboxProps,
) => {
  return (
    <label class="flex items-center space-x-2 cursor-pointer text-[#D9D9D9]">
      <div class="relative w-5 h-5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          class="hidden"
        />
        <div
          class={`w-5 h-5 border-2 flex items-center justify-center rounded-full ${
            checked ? "bg-[#0066e4] border-[#0066e4]" : "border-[#0066e4]"
          }`}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#0066e4"
              class="w-4 h-4"
            >
              <path d="M9 19l-5-5 1.41-1.41L9 16.17l9.59-9.59L20 8z" />
            </svg>
          )}
        </div>
      </div>
      <span>{label}</span>
    </label>
  );
};

const CustomSelect = ({
  id,
  name,
  options,
  value,
  onChange,
  required,
  hasError,
}: CustomSelectProps) => {
  return (
    <div class="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        class={`outline-0 w-full p-2 rounded-full bg-transparent border ${
          hasError ? "border-red-500" : "border-[#0066e4]"
        } text-[#D9D9D9] appearance-none`}
      >
        <option value="" disabled>
          Selecione
        </option>
        {options.map((option) => (
          <option class="bg-black" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div class="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 9.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </div>
  );
};

const FormularioComHtmx = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null,
  );
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [nomeDaEmpresa, setNomeDaEmpresa] = useState<string>("");
  const [plataforma, setPlataforma] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [comoNosConheceu, setComoNosConheceu] = useState<string>("");
  const [numeroFuncionarios, setNumeroFuncionarios] = useState<string>("");
  const [faturamentoMensal, setFaturamentoMensal] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    telefone: "",
    nomeDaEmpresa: "",
    site: "",
    plataforma: false,
    cargo: false,
    comoNosConheceu: false,
    numeroFuncionarios: false,
    faturamentoMensal: false,
    message: false,
  });

  const handleResponse = (event: CustomEvent) => {
    const response = event.detail?.xhr;
    if (response.status === 200) {
      setStatusType("success");
      setStatusMessage("Formulário enviado com sucesso!");
      resetForm();
    } else {
      setStatusType("error");
      setStatusMessage("Ocorreu um erro ao enviar o formulário.");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validando os campos
    const newErrors: FormErrors = {
      name: name === "",
      email: email === "",
      telefone: telefone === "",
      nomeDaEmpresa: nomeDaEmpresa === "",
      site: site === "",
      plataforma: plataforma === "",
      cargo: cargo === "",
      comoNosConheceu: comoNosConheceu === "",
      numeroFuncionarios: numeroFuncionarios === "",
      faturamentoMensal: faturamentoMensal === "",
      message: message === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      console.log({
        name,
        email,
        plataforma,
        cargo,
        site,
        comoNosConheceu,
        numeroFuncionarios,
        faturamentoMensal,
        message,
        newsletter,
      });

      setStatusMessage(null);
      setStatusType("success");
      setStatusMessage("Formulário enviado com sucesso!");
      resetForm();
    } else {
      setStatusMessage("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setTelefone("");
    setNomeDaEmpresa("");
    setSite("");
    setPlataforma("");
    setCargo("");
    setComoNosConheceu("");
    setNumeroFuncionarios("");
    setFaturamentoMensal("");
    setMessage("");
    setNewsletter(false);
    setErrors({
      name: "",
      email: "",
      telefone: "",
      nomeDaEmpresa: "",
      site: "",
      plataforma: false,
      cargo: false,
      comoNosConheceu: false,
      numeroFuncionarios: false,
      faturamentoMensal: false,
      message: false,
    });
  };

  return (
    <div class="container mx-auto p-6 rounded-lg bg-[#0a0a0a]">
      <form onSubmit={handleSubmit} class="space-y-4 flex flex-col gap-2">
        {/* Nome e Email */}
        <div class="flex items-center flex-col lg:flex-row gap-3 lg:items-end">
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="name"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Nome
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="w-full p-2 rounded-full bg-transparent border border-[#0066e4] text-[#D9D9D9] outline-0"
            />
          </div>
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="email"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              E-mail corporativo
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="w-full p-2 rounded-full bg-transparent border border-[#0066e4] text-[#D9D9D9] outline-0"
            />
          </div>
        </div>
        <div class="flex items-center flex-col lg:flex-row gap-3 lg:items-end">
          {/* Telefone */}
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="telefone"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Telefone/Whatsapp
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              class="w-full p-2 rounded-full bg-transparent border border-[#0066e4] text-[#D9D9D9] outline-0"
            />
          </div>

          {/* Nome da Empresa */}
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="nomeDaEmpresa"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Nome da empresa
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <input
              type="text"
              id="nomeDaEmpresa"
              name="nomeDaEmpresa"
              required
              value={nomeDaEmpresa}
              onChange={(e) => setNomeDaEmpresa(e.target.value)}
              class="w-full p-2 rounded-full bg-transparent border border-[#0066e4] text-[#D9D9D9] outline-0"
            />
          </div>
        </div>
        {/* Nome da Empresa */}
        <div>
          <label
            htmlFor="site"
            class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
          >
            Site
            <span class="text-[#0066e4] font-bold">*</span>
          </label>
          <input
            type="text"
            id="site"
            name="site"
            required
            value={site}
            onChange={(e) => setSite(e.target.value)}
            class="w-full p-2 rounded-full bg-transparent border border-[#0066e4] text-[#D9D9D9] outline-0"
          />
        </div>
        <div class="flex items-center flex-col lg:flex-row gap-3 lg:items-end">
          {/* Faturamento */}
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="faturamentoMensal"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Qual o faturamento mensal da sua empresa?
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <CustomSelect
              id="faturamento-mensal"
              name="faturamentoMensal"
              value={faturamentoMensal}
              onChange={(e) =>
                setFaturamentoMensal((e.target as HTMLSelectElement).value)}
              required
              hasError={errors.faturamentoMensal}
              options={[
                { label: "Até R$ 100.000", value: "Até R$ 100.000" },
                {
                  label: "R$ 100.000 - R$ 500.000",
                  value: "R$ 100.000 - R$ 500.000",
                },
                {
                  label: "R$ 500.000 - R$ 1.000.000",
                  value: "R$ R$ 500.000 - R$ 1.000.000",
                },
                {
                  label: "R$ 1.000.000 - R$ 7.999.000",
                  value: "R$ 1.000.000 - R$ 7.999.000",
                },
                {
                  label: "Acima de R$ 8.000.000",
                  value: "Acima de R$ 8.000.000",
                },
              ]}
            />
          </div>

          {/* Cargo */}
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="plataforma"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Qual plataforma você utiliza no seu e-commerce?
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <CustomSelect
              id="plataforma"
              name="plataforma"
              value={plataforma}
              options={[
                { label: "VTEX", value: "VTEX" },
                { label: "Shopify", value: "Shopify" },
                { label: "Wake", value: "Wake" },
                { label: "Magento", value: "Magento" },
                { label: "Linx", value: "Linx" },
                { label: "Outra", value: "Outra" },
              ]}
              onChange={(e) => setPlataforma(e.target.value)}
              required
              hasError={errors.plataforma}
            />
          </div>
        </div>
        <div class="flex items-center flex-col lg:flex-row gap-3 lg:items-end">
          {/* Como nos conheceu */}
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="cargo"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Qual o seu cargo?
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <CustomSelect
              id="cargo"
              name="cargo"
              value={cargo}
              onChange={(e) => setCargo((e.target as HTMLSelectElement).value)}
              required
              hasError={errors.cargo}
              options={[
                { label: "Proprietário", value: "Proprietário" },
                { label: "Diretor", value: "Diretor" },
                { label: "Gerente", value: "Gerente" },
                { label: "Coordenador", value: "Coordenador" },
                { label: "Analista", value: "Analista" },
                { label: "Assistente", value: "Assistente" },
              ]}
            />
          </div>

          {/* Número de Funcionários */}
          <div class="w-full lg:w-1/2">
            <label
              htmlFor="numeroFuncionarios"
              class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
            >
              Número de funcionários
              <span class="text-[#0066e4] font-bold">*</span>
            </label>
            <CustomSelect
              id="numeroFuncionarios"
              name="numeroFuncionarios"
              required
              value={numeroFuncionarios}
              onChange={(e) => setNumeroFuncionarios(e.target.value)}
              hasError={errors.numeroFuncionarios}
              options={[
                { label: "1-10", value: "1-10" },
                { label: "11-50", value: "11-50" },
                { label: "51-200", value: "51-200" },
                { label: "201+", value: "201+" },
              ]}
            />
          </div>
        </div>
        {/* Faturamento Mensal */}
        <div>
          <label
            htmlFor="comoNosConheceu"
            class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
          >
            Como você conheceu a Wave Commerce?
            <span class="text-[#0066e4] font-bold">*</span>
          </label>
          <CustomSelect
            id="comoNosConheceu"
            name="comoNosConheceu"
            value={comoNosConheceu}
            options={[
              { label: "Indicação", value: "indicacao" },
              { label: "Instagram", value: "instagram" },
              { label: "Linkedin", value: "linkedin" },
              { label: "Google", value: "google" },
              { label: "Outros", value: "outros" },
            ]}
            onChange={(e) => setComoNosConheceu(e.target.value)}
            required
            hasError={errors.comoNosConheceu}
          />
        </div>

        {/* Mensagem */}
        <div>
          <label
            htmlFor="message"
            class="block font-light text-[#D9D9D9] mb-1 lg:text-base"
          >
            Como podemos te ajudar?
            <span class="text-[#0066e4] font-bold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            class="w-full p-2 rounded-lg bg-transparent border border-[#0066e4] text-[#D9D9D9] outline-0 min-h-36"
          />
        </div>

        {/* Newsletter */}
        <div>
          <CustomCheckbox
            id="newsletter"
            label="Gostaria de receber nossos e-mails com estratégias e materiais sobre marketing digital?*"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
        </div>

        {/* Botão */}
        <div class="w-full">
          <button
            type="submit"
            class="w-full py-2 px-4 bg-[#0066e4] text-[#D9D9D9] rounded-full hover:bg-[#0056c7]"
          >
            Enviar
          </button>
        </div>
      </form>

      {statusMessage && (
        <div
          class={`mt-4 p-2 text-center rounded-lg ${
            statusType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default FormularioComHtmx;
