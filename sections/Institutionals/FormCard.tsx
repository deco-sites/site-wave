import Depoiment from "site/sections/Institutionals/Depoiment.tsx";
import Partners from "site/components/ui/Partners.tsx";
import Form from "site/islands/Form.tsx";

interface Image {
  image: string;
  label?: string;
}

interface FormCardProps {
  title: string;
  hasImage?: Image[];
}

export default function FormCard({ hasImage, title }: FormCardProps) {
  const images = hasImage?.map((item, index) => ({
    image: item.image,
    altText: item.label || "",
  }));

  return (
    <div className="bg-black">
      <div className="lg:grid lg:grid-cols-2 container flex flex-col-reverse">
        <div className="pt-0 pb-5 px-5">
          <Depoiment
            depoiment="<p class='text-[#717171] my-2'>O grande diferencial da Wave é a visão de dono do negócio, fazendo parte da empresa e trabalhando em sinergia para obter <b class='text-white'>os melhores resultados.</b><p>"
            isIcon={true}
            author="Lúcia Fraga"
            office="Gerente E-commerce da Safira"
          />
          <div>
            <span className="visual-brand my-8 mx-auto w-[70px]"></span>
            <p
              className="text-30px font-bold text-white leading-[40px] text-center mb-8"
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </p>
            <div>
              <Partners rowImages={images ? [{ colImages: images }] : []} />
            </div>
            <div
              style={{
                "--animation-direction": "reverse",
                "--animation-time": "25s",
                marginTop: "1.25rem",
              }}
            >
              <Partners rowImages={images ? [{ colImages: images }] : []} />
            </div>
          </div>
        </div>

        <Form />
      </div>
    </div>
  );
}
