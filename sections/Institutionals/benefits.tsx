import Icon from "../../components/ui/Icon.tsx";

interface Props {
  title?: string;
  benefits: BenefitsProps;
}

interface BenefitsProps {
  remoteWork?: boolean;
  commercial?: boolean;
  mealVoucher?: boolean;
  healthPlan?: boolean;
  personalDevelopmentPlan?: boolean;
}

const Benefits = ({ benefits, title }: Props) => {
  return (
    <div class="p-4 lg:p-8  flex flex-col gap-6">
      {title && <p class="text-white text-2xl font-bold mb-2">{title}</p>}
      <div>
        <div class="grid grid-cols-2 gap-5">
          {benefits?.remoteWork && (
            <div>
              <div class="bg-[#0A0A0A] p-3 rounded-lg max-w-12 w-fit mb-1 flex items-center justify-center">
                <Icon height={22} width={22} id={"remoteWorking"} />
              </div>
              <p class="uppercase text-[#717171] flex flex-row items-center gap-3">
                HOME OFFICE (REMOTO)
              </p>
            </div>
          )}
          {benefits?.commercial && (
            <div>
              <div class="bg-[#0A0A0A] p-3 rounded-lg max-w-12 w-fit mb-1 flex items-center justify-center">
                <Icon
                  height={22}
                  width={22}
                  class="bg-[##0A0A0A]"
                  id={"commercialHours"}
                />
              </div>
              <p class="uppercase text-[#717171] flex flex-row items-center gap-3">
                DAS 09H ÀS 18H (1H DE INTERVALO)
              </p>
            </div>
          )}
          {benefits?.mealVoucher && (
            <div>
              <div class="bg-[#0A0A0A] p-3 rounded-lg max-w-12 w-fit mb-1 flex items-center justify-center">
                <Icon
                  height={22}
                  width={22}
                  class="bg-[##0A0A0A]"
                  id={"mealVouchers"}
                />
              </div>
              <p class="uppercase text-[#717171] flex flex-row items-center gap-3">
                va: cartão flash R$27/dia
              </p>
            </div>
          )}
          {benefits?.healthPlan && (
            <div>
              <div class="bg-[#0A0A0A] p-3 rounded-lg max-w-12 w-fit mb-1 flex items-center justify-center">
                <Icon
                  height={22}
                  width={22}
                  class="bg-[##0A0A0A]"
                  id={"healthPlaning"}
                />
              </div>
              <p class="uppercase text-[#717171] flex flex-row items-center gap-3">
                plano de saúde unimed (por tempo de casa)
              </p>
            </div>
          )}
          {benefits?.personalDevelopmentPlan && (
            <div>
              <p class="uppercase text-[#717171] flex flex-row items-center gap-3">
                pdi (plano de desenvolvimento individual) após 3 meses de
                empresa
              </p>
              <div class="bg-[#0A0A0A] p-3 rounded-lg max-w-12 w-fit mb-1 flex items-center justify-center">
                <Icon
                  height={22}
                  width={32}
                  class="bg-[##0A0A0A]"
                  id={"personalDevelopmentPlaning"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
