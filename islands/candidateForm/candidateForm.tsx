import { useState } from "preact/hooks";

function CandidateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    phone: "",
    area: "",
    cv: null,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [cvFileName, setCvFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setCvFileName(files[0] ? files[0].name : "");
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{11}$/;
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;

    if (!phoneRegex.test(formData.phone)) {
      setMessage("Por favor, insira um telefone válido (11 dígitos).");
      setMessageType("error");
      return;
    }

    if (!linkedinRegex.test(formData.linkedin)) {
      setMessage("Por favor, insira uma URL válida do LinkedIn.");
      setMessageType("error");
      return;
    }

    // Send data to backend
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(
        "https://api.sheetmonkey.io/form/fmMqLPc6rihq78pY1SNNAr",
        {
          method: "POST",
          body: formDataToSend,
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }

      setFormData({
        name: "",
        email: "",
        linkedin: "",
        phone: "",
        area: "",
        cv: null,
      });
      setCvFileName("");
      setMessage("Formulário enviado com sucesso!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div class="bg-black p-8 rounded-lg text-white max-w-lg mx-auto">
      <h2 class="text-3xl mb-6 font-bold">Candidate-se</h2>
      <form onSubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <label for="name" class="block mb-1">
              Nome<span class="text-blue-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full border border-blue-500 rounded-full p-2 bg-transparent"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div class="relative">
            <label for="email" class="block mb-1">
              E-mail<span class="text-blue-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full border border-blue-500 rounded-full p-2 bg-transparent"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="relative">
            <label for="linkedin" class="block mb-1">
              Linkedin<span class="text-blue-500">*</span>
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              class="w-full border border-blue-500 rounded-full p-2 bg-transparent"
              required
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
          <div class="relative">
            <label for="phone" class="block mb-1">
              Telefone<span class="text-blue-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              class="w-full border border-blue-500 rounded-full p-2 bg-transparent"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div class="mt-4">
          <p>
            Para qual área você está se
            candidatando?<span class="text-blue-500">*</span>
          </p>
          <div class="grid grid-cols-2 gap-4 mt-2">
            {/* Radio buttons for area selection */}
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="comercial"
                class="hidden"
                required
                checked={formData.area === "comercial"}
                onChange={handleChange}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">Comercial</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="desenvolvimento"
                class="hidden"
                checked={formData.area === "desenvolvimento"}
                onChange={handleChange}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">Desenvolvimento</span>
            </label>

            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="performance"
                class="hidden"
                checked={formData.area === "performance"}
                onChange={handleChange}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">Performance</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="midias-sociais"
                class="hidden"
                checked={formData.area === "midias-sociais"}
                onChange={handleChange}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">Mídias Sociais</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="design"
                class="hidden"
                checked={formData.area === "design"}
                onChange={handleChange}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">Design</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="recursos-humanos"
                class="hidden"
                checked={formData.area === "recursos-humanos"}
                onChange={handleChange}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">Recursos Humanos</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                name="area"
                value="seo"
                class="hidden"
                onChange={handleChange}
                checked={formData.area === "seo"}
              />
              <span class="radio-custom"></span>
              <span class="ml-2">SEO</span>
            </label>
          </div>
        </div>

        <div class="mt-6">
          <label class="block mb-2 text-sm font-medium text-white" for="cv">
            Anexar Currículo<span class="text-blue-500">*</span>
          </label>
          <div class="relative w-full border border-blue-500 rounded-full p-2 bg-transparent">
            <input
              type="file"
              id="cv"
              name="cv"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleChange}
              required
            />
            <div class="flex justify-between items-center text-white py-2 px-4 rounded-full">
              {cvFileName
                ? <p class="mt-2 text-sm text-green-400">{cvFileName}</p>
                : <span class="text-sm">Buscar</span>}
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Enviar
          </button>
        </div>
      </form>

      {message && (
        <div
          class={`mt-4 text-center ${
            messageType === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default CandidateForm;
