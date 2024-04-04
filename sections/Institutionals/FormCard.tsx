import { useSignal } from "@preact/signals";
import Form from "deco-sites/site-wave/components/ui/FormComponents.tsx";
import { invoke } from "deco-sites/site-wave/runtime.ts";
import { useEffect } from "preact/hooks";
import Loading from "deco-sites/site-wave/components/ui/Loading.tsx";
import Button from "deco-sites/site-wave/components/ui/Button.tsx";
import Depoiment from "deco-sites/site-wave/sections/Institutionals/Depoiment.tsx";


interface Subject {
  label: string;
}

interface FormCardProps {
  /**
   * @title Título
   */
  titleCard?: string;
  /**
   * @title Texto do botão
   */
  buttonCard: string;
  /**
   * @title Plataforma
   */
  plataform: Subject[];
  /**
  * @title Recomendação
  */
  recommendation: Subject[];
}

export default function FormCard(
  { titleCard, buttonCard, plataform, recommendation }: FormCardProps,
) {
  const plataformSignal = useSignal("");
  const recommendationSignal = useSignal("");
  const fileLabel = useSignal("Anexo");
  const errMessage = useSignal<string | null>(null);
  const loading = useSignal(false);

  useEffect(() => {
    const attachmentEl = document.querySelector<HTMLInputElement>(
      "[name=atendimento-attachment]",
    );

    attachmentEl?.addEventListener("change", (e) => {
      // @ts-ignore -
      const file = e.target.files?.[0];

      const overflowSize = file.size >= 5 * 1024 * 1024;

      if (overflowSize) {
        alert("Selecione um arquivo menor que 5MB");
        attachmentEl.value = "";
      } else {
        fileLabel.value = file.name;
      }
    });
  }, []);

  async function onSubmit() {
    function get<T extends HTMLElement>(s: string): T | never {
      const el = document.querySelector<T>(s);

      if (!el) throw new Error(`Element not found: ${s}`);

      return el;
    }

    const name = get<HTMLInputElement>("[name=atendimento-name]").value;
    const phone = get<HTMLInputElement>("[name=atendimento-tel]").value;
    const email = get<HTMLInputElement>("[name=atendimento-email]").value;
    const plataform = get<HTMLInputElement>("[name=atendimento-plataform]").value;
    const recommendation = get<HTMLInputElement>("[name=atendimento-recommendation]").value;



    const message =
      get<HTMLTextAreaElement>("[name=atendimento-message]").value;

    const receiveZap =
      get<HTMLInputElement>("[name=atendimento-receive-zapzap]").checked;
    const receiveEmail =
      get<HTMLInputElement>("[name=atendimento-receive-email]").checked;

    const attachmentEl = get<HTMLInputElement>(
      "[name=atendimento-attachment]",
    );

    const file = attachmentEl?.files?.[0];
    const fileName = (file?.name ?? "").replace(
      /[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,
      "-",
    );

    const data = {
      name,
      phone,
      email,
      plataform,
      recommendation,
      message,
    } as Record<string, unknown>;

    if (file) {
      data.fileName = fileName;

    }

    try {
      const r = await invoke.vtex.actions.masterdata.createDocument({
        acronym: "FC",
        data,
      }).then((r) => r)
        .catch((e) => null);

      if (!r) {
        throw new Error("Ocorreu um erro ao enviar o formulário");
      }

      if (file) {
        const fd = new FormData();
        fd.append(
          "file",
          attachmentEl.files?.[0] as File,
          fileName,
        );

        const attachmentR = await fetch(
          `/attachment?${new URLSearchParams({
            acronym: "FC",
            id: r.DocumentId ?? "",
            field: "file",
          })}`,
          {
            method: "POST",
            body: fd,
          },
        );

        if (!attachmentR.ok) {
          throw new Error("Ocorreu um erro ao enviar o anexo");
        }
      }

      errMessage.value = "";
    } catch (e) {
      console.error(e);
      errMessage.value = e.message;
    }
  }

  return (
    <div class="bg-black">
      <div class="lg:grid lg:grid-cols-2 container flex flex-col-reverse">
        <div class="pt-0 pb-5 px-5">
          <Depoiment
            depoiment="<p class='text-[#717171] my-2'>O grande diferencial da Wave é a visão de dono do negócio, fazendo parte da empresa e trabalhando em sinergia para obter <b class='text-white'>os melhores resultados.</b><p>"
            isIcon={true}
            author="Lúcia Fraga"
            office="Gerente E-commerce da Safira"
          />
          <Depoiment
            depoiment="<p class='text-[#717171] my-2'>O grande diferencial da Wave é a visão de dono do negócio, fazendo parte da empresa e trabalhando em sinergia para obter <b class='text-white'>os melhores resultados.</b><p>"
            isIcon={true}
            author="Lúcia Fraga"
            office="Gerente E-commerce da Safira"
          />
          <Depoiment
            depoiment="<p class='text-[#717171] my-2'>O grande diferencial da Wave é a visão de dono do negócio, fazendo parte da empresa e trabalhando em sinergia para obter <b class='text-white'>os melhores resultados.</b><p>"
            isIcon={true}
            author="Lúcia Fraga"
            office="Gerente E-commerce da Safira"
          />
        </div>
        <div class="px-3 lg:px-0">


          <form
            class="flex w-full flex-col gap-6 bg-[#0A0A0A] p-6 rounded-3xl"
            onSubmit={async (e) => {
              e.preventDefault();

              loading.value = true;
              await onSubmit();
              loading.value = false;
            }}
          >
            <h2 class="font-lemon justify-start text-[16px] font-bold text-[#3C3C3B]">
              {titleCard}
            </h2>

            <div class="flex flex-col lg:grid lg:grid-cols-2 w-full gap-6">
              <Form.Input.Container>
                <Form.Input.Input
                  type="text"
                  name="atendimento-name"
                  required
                />
                <Form.Input.Label>Nome*</Form.Input.Label>
              </Form.Input.Container>

              <Form.Input.Container class="">
                <Form.Input.Input
                  type="email"
                  name="atendimento-email"
                  pattern="^\S+@\S+\.\S+$"
                  required
                />
                <Form.Input.Label>E-mail Corporativo*</Form.Input.Label>
              </Form.Input.Container>


              <Form.Input.Container>
                <Form.Input.Input
                  type="tel"
                  name="atendimento-tel"
                  required
                  pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/\D/g, "")
                      .replace(
                        /^(\d?)(\d?)(\d{0,5})(\d{0,4})(.*)$/,
                        (all, $1, $2, $3, $4) => {
                          let s = "";

                          if ($1) s += `(${$1}${$2}`;
                          if ($3) s += `) ${$3}`;
                          if ($4) s += `-${$4}`;

                          return s;
                        },
                      );
                  }}
                />
                <Form.Input.Label>Telefone/Whatsapp*</Form.Input.Label>
              </Form.Input.Container>



              <Form.Input.Container class="">
                <Form.Input.Input
                  type="CompanyName"
                  name="CompanyName"
                  pattern="^\S+@\S+\.\S+$"
                  required
                />
                <Form.Input.Label>Nome da empresa*</Form.Input.Label>
              </Form.Input.Container>

              <Form.Input.Container class="">
                <Form.Input.Input
                  type="siteName"
                  name="siteName"
                  class="siteName"
                  pattern="^\S+@\S+\.\S+$"
                  required
                />
                <Form.Input.Label>Site*</Form.Input.Label>
              </Form.Input.Container>

              <Form.Input.Container class="">
                <Form.Input.Input
                  type="siteInvoicing"
                  name="siteInvoicing"
                  pattern="^\S+@\S+\.\S+$"
                  required
                />
                <Form.Input.Label>Qual o faturamento mensal da sua empresa?*</Form.Input.Label>
              </Form.Input.Container>

              <Form.Select
                placeholder="Qual plataforma você utiliza no seu e-commerce?*"
                items={plataform.map((s) => s.label)}
                name="atendimento-plataform"
                value={plataformSignal.value}
                onChange={(s) => {
                  plataformSignal.value = s;
                }}
              />

              <Form.Input.Container class="">
                <Form.Input.Input
                  type="office"
                  name="office"
                  pattern="^\S+@\S+\.\S+$"
                  required
                />
                <Form.Input.Label>Qual seu cargo?*</Form.Input.Label>
              </Form.Input.Container>

              <Form.Input.Container class="">
                <Form.Input.Input
                  type="numberOfEmployees"
                  name="numberOfEmployees"
                  pattern="[0-9]*"
                  required
                />
                <Form.Input.Label>Número de funcionarios*</Form.Input.Label>
              </Form.Input.Container>

              <Form.Select
                placeholder="Como você conheceu a Wave Commerce *"
                items={recommendation.map((s) => s.label)}
                name="atendimento-recommendation"
                value={recommendationSignal.value}
                onChange={(s) => {
                  recommendationSignal.value = s;
                }}
              />

              <Form.TextArea.Container class="col-span-2">
                <Form.TextArea.Input
                  type="text"
                  name="atendimento-message"
                  required
                />
                <Form.TextArea.Label>Como podemos ajudar? *</Form.TextArea.Label>
              </Form.TextArea.Container>
            </div>

            <Form.Checkbox.Container>
              <Form.Checkbox.Input required name="privacy" />
              <div class="text-sm font-medium text-dark leading-4">
                Gostaria de receber nossos e-mails com estratégias e materiais sobre marketing digital?*
                <a
                  href="/politicas/privacidade"
                  class="font-bold underline"
                >
                </a>{" "}
              </div>
            </Form.Checkbox.Container>


            <Button
              type="submit"
              class=" px-3.5 py-2.5 text-[13px] leading-auto tracking[-2] font-bold shadow-sm"
            >
              {loading.value ? <Loading /> : buttonCard}
            </Button>

            {errMessage.value === ""
              ? (
                <div class="text-sm font-medium text-green leading-4">
                  Mensagem enviada com sucesso!
                </div>
              )
              : (
                <div class="text-sm font-medium text-red leading-4">
                  {errMessage}
                </div>
              )}
          </form>
        </div>
      </div>
    </div>
  );
}