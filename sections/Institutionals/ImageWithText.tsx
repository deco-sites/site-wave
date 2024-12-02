import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { useDevice } from "deco/hooks/useDevice.ts";

interface Props {
  reverse?: boolean;
  images?: ImageProps;
  text?: RichText;
}

interface ImageProps {
  ImageDesktop?: ImageWidget;
  ImageMobile?: ImageWidget;
  AlternativeText?: string;
}

const ImageWithText = ({ images, text, reverse }: Props) => {
  const device = useDevice();
  const { ImageDesktop, ImageMobile, AlternativeText } = images || {};
  const imageSrc = device === "mobile" ? ImageMobile : ImageDesktop;

  return (
    <div>
      <div
        class={`container px-4 lg:px-0 flex flex-col lg:flex-row ${
          reverse && "lg:flex-row-reverse flex-col-reverse justify-between"
        } items-center ${!reverse && "justify-around"}`}
      >
        <img
          src={imageSrc || ""}
          alt={AlternativeText || ""}
        />
        <div class="lg:max-w-[50%] w-full">
          {text &&
            (
              <>
                <span className={`visual-brand w-[70px] mb-5 lg:mb-7`} />
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;
