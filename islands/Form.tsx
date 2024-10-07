import { useState } from "preact/hooks";
import Loading from "site/components/ui/Loading.tsx";
import Button from "site/components/ui/Button.tsx";


interface ValoresFormulario {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  website: string;
  faturamento: number;
  plataforma: string;
  cargo: string;
  funcionarios: number;
  comoConheceu: string;
  comoPodemosAjudar: string;
  receberEmails: boolean;
}

interface PropsFormulario {
  botao: string;
  titulo: string;
}

export default function Formulario(
  { titulo, botao }: PropsFormulario,
) {
  const [valoresFormulario, setValoresFormulario] = useState<ValoresFormulario>(
    {
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      website: "",
      faturamento: 0,
      plataforma: "",
      cargo: "",
      funcionarios: 0,
      comoConheceu: "",
      comoPodemosAjudar: "",
      receberEmails: false,
    },
  );


  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState<
    { texto: string; tipo: "sucesso" | "erro" } | null
  >(
    null,
  );

  async function lidarSubmit(e: Event) {
    e.preventDefault();

    // Validar campos do formulário
    if (
      !valoresFormulario.nome || !valoresFormulario.email ||
      !valoresFormulario.telefone || !valoresFormulario.empresa ||
      !valoresFormulario.faturamento || !valoresFormulario.plataforma ||
      !valoresFormulario.cargo || !valoresFormulario.funcionarios ||
      !valoresFormulario.comoConheceu || !valoresFormulario.comoPodemosAjudar
    ) {
      setMensagem({
        tipo: "erro",
        texto: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    setCarregando(true);

    try {
      const opcoes = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: valoresFormulario.nome,
          email: valoresFormulario.email,
          telefone: valoresFormulario.telefone,
          empresa: valoresFormulario.empresa,
          website: valoresFormulario.website,
          faturamento: valoresFormulario.faturamento,
          plataforma: valoresFormulario.plataforma,
          cargo: valoresFormulario.cargo,
          funcionarios: valoresFormulario.funcionarios,
          comoConheceu: valoresFormulario.comoConheceu,
          comoPodemosAjudar: valoresFormulario.comoPodemosAjudar,
          receberEmails: valoresFormulario.receberEmails,
        }),
      };

      const resposta = await fetch(
        "https://api.sheetmonkey.io/form/pwrtDHsTzd1Bw2aH3fsj5y",
        opcoes,
      );
      const dados = await resposta.json();

      if (resposta.ok) {
        if (dados.success) {
          //  console.log("Formulário enviado:", valoresFormulario);
          setValoresFormulario({
            nome: "",
            email: "",
            telefone: "",
            empresa: "",
            website: "",
            faturamento: 0,
            plataforma: "",
            cargo: "",
            funcionarios: 0,
            comoConheceu: "",
            comoPodemosAjudar: "",
            receberEmails: false,
          });
          setMensagem({
            tipo: "sucesso",
            texto: "Formulário enviado com sucesso!",
          });
        } else {
          console.error(
            "Erro ao enviar o formulário:",
            dados.message || "Erro desconhecido",
          );
          setMensagem({ tipo: "erro", texto: "Erro ao enviar o formulário" });
        }
      } else {
        console.error("Erro ao enviar o formulário:", resposta.statusText);
        setMensagem({ tipo: "erro", texto: "Erro ao enviar o formulário" });
      }
    } catch (erro) {
      console.error("Erro ao enviar o formulário:", erro);
      setMensagem({ tipo: "erro", texto: "Erro ao enviar o formulário" });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <div>
        <form
          class="flex w-full flex-col gap-6 bg-transparent"
          onSubmit={lidarSubmit}
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
            <div class="flex flex-col">
              <label for="nome" class="text-white m-[10px]">
                Nome? <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={valoresFormulario.nome}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    nome: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4  rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="email" class="text-white m-[10px]">
                E-mail? <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={valoresFormulario.email}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    email: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="telefone" class="text-white m-[10px]">
                Telefone? <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={valoresFormulario.telefone}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    telefone: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="empresa" class="text-white m-[10px]">
                Nome da Empresa? <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={valoresFormulario.empresa}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    empresa: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="website" class="text-white m-[10px]">
                Site?
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={valoresFormulario.website}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    website: e.currentTarget.value,
                  })}
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="faturamento" class="text-white m-[10px]">
                Faturamento Mensal? <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="number"
                id="faturamento"
                name="faturamento"
                value={valoresFormulario.faturamento}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    faturamento: parseInt(e.currentTarget.value),
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="plataforma" class="text-white m-[10px]">
                Plataforma? <span class="text-[#0066E4]">*</span>
              </label>
              <select
                id="plataforma"
                name="plataforma"
                value={valoresFormulario.plataforma}
                onChange={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    plataforma: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-black text-white"
              >
                <option value="">Selecione a Plataforma</option>
                <option value="notHave">Não possuo</option>
                <option value="Vtex">Vtex</option>
                <option value="Shopify">Shopify</option>
                <option value="Outra">Outra</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="cargo" class="text-white m-[10px]">
                Cargo <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={valoresFormulario.cargo}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    cargo: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="funcionarios" class="text-white m-[10px]">
                Número de Funcionários? <span class="text-[#0066E4]">*</span>
              </label>
              <input
                type="number"
                id="funcionarios"
                name="funcionarios"
                value={valoresFormulario.funcionarios}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    funcionarios: parseInt(e.currentTarget.value),
                  })}
                required
                class="py-2 pl-4 rounded-[30px] border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="comoConheceu" class="text-white m-[10px]">
                Como nos conheceu? <span class="text-[#0066E4]">*</span>
              </label>
              <select
                id="comoConheceu"
                name="comoConheceu"
                value={valoresFormulario.comoConheceu}
                onChange={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    comoConheceu: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-xl border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-black text-white"
              >
                <option value="">Como nos conheceu</option>
                <option value="Google">Google</option>
                <option value="Linkedin">Linkedin</option>
                <option value="Instagram">Instagram</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-col">
              <label for="comoPodemosAjudar" class="text-white m-[10px]">
                Como podemos te ajudar? <span class="text-[#0066E4]">*</span>
              </label>
              <textarea
                id="comoPodemosAjudar"
                name="comoPodemosAjudar"
                value={valoresFormulario.comoPodemosAjudar}
                onInput={(e) =>
                  setValoresFormulario({
                    ...valoresFormulario,
                    comoPodemosAjudar: e.currentTarget.value,
                  })}
                required
                class="py-2 pl-4 rounded-xl border border-[#0066E4] focus:border-blue-500 focus:outline-none bg-transparent text-white"
                style={{ borderRadius: "10px" }}
              >
              </textarea>
            </div>
            <div class="flex flex-col">
              <label for="receberEmails" class="text-white ">
                Gostaria de receber nossos e-mails com estratégias e materiais
                sobre marketing digital?*
              </label>
              <div class="flex gap-3 my-2 items-center">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    id="receberEmails"
                    name="receberEmails"
                    checked={valoresFormulario.receberEmails}
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        // @ts-ignore e.target.checked is right
                        receberEmails: e.target.checked,
                      })}
                    class="hidden"
                  />
                  <span
                    class="checkbox-custom rounded-full border border-blue-500 w-6 h-6 flex items-center justify-center mr-2 cursor-pointer"
                    style={{
                      backgroundColor: valoresFormulario.receberEmails
                        ? "#0066E4"
                        : "black",
                    }}
                  >
                  </span>
                  <span class="text-white">Sim</span>
                </label>
                <label class="flex items-center text-white">
                  <input
                    type="checkbox"
                    id="nao"
                    name="receberEmails"
                    value="nao"
                    checked={!valoresFormulario.receberEmails}
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        // @ts-ignore e.target.checked is right
                        receberEmails: !e.target.checked,
                      })}
                    class="hidden"
                  />
                  <span
                    class="checkbox-custom rounded-full border border-blue-500 w-6 h-6 flex items-center justify-center mr-2 cursor-pointer"
                    style={{
                      backgroundColor: !valoresFormulario.receberEmails
                        ? "#0066E4"
                        : "black",
                    }}
                  >
                  </span>
                  Não
                </label>
              </div>
            </div>
            <div class="flex flex-row w-full mt-5">
              <Button class="w-full justify-center" type="submit">{botao}</Button>
              {carregando && <Loading />}
            </div>
          </div>
          {mensagem && (
            <div
              class={`text-sm font-medium ${
                mensagem.tipo === "sucesso" ? "text-green-500" : "text-red-500"
              } leading-4`}
            >
              {mensagem.texto}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
