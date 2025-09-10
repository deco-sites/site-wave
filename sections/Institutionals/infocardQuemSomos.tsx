import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
interface Props {
  Images?: Image;
  Text?: RichText;
}
interface Image {
  ImageDesktop?: ImageWidget;
  ImageMobile?: ImageWidget;
  AlternativeText?: string;
}
const infocardQuemSomos = ({ Images, Text }: Props) => {
  const device = useDevice();
  return (
    <div class={`${device === "mobile" ? "container" : ""}`}>
      <div
        style={{
          backgroundImage: `url(${
            device === "mobile" ? Images?.ImageMobile : Images?.ImageDesktop
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        class={`${
          device === "mobile" ? "min-h-[370px]" : "min-h-[400px]"
        } w-full h-full`}
      >
        <div
          class={`px-4 lg:px-0 flex justify-start items-end lg:items-center pb-4 lg:pb-0 h-full ${
            device === "mobile" ? "min-h-[370px]" : "min-h-[400px] container"
          }`}
          dangerouslySetInnerHTML={{ __html: Text }}
        />
      </div>
    </div>
  );
};
export default infocardQuemSomos;
