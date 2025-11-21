import type { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";
import VideoControls from "../../islands/VideoControls.tsx";

interface Banner {
  /** @description Content type */
  type?: "image" | "video";
  desktop: ImageWidget;
  mobile: ImageWidget;
  /** @description Video URL for desktop */
  desktopVideo?: string;
  /** @description Video URL for mobile */
  mobileVideo?: string;
  alt: string;
  isEmptyBrand?: boolean;
  label?: string;
  action?: Content;
  /** @description Show text content */
  showText?: boolean;
  /** @description Show sound controls for video */
  showSoundControls?: boolean;
}

interface Content {
  href: string;
  /**
   * @title Titulo do banner
   * @format textarea
   */
  title: string;
  /**
   * @title Conteudo do banner
   * @format rich-text
   */
  content: string;

  label?: string;
}

export default function BannerHero({
  image: {
    mobile,
    desktop,
    desktopVideo,
    mobileVideo,
    type = "image",
    action,
    showText = true,
    showSoundControls = false,
  },
}: { image: Banner; lcp?: boolean; id: string }) {
  const device = useDevice();
  const videoId = useId();

  return (
    <>
      <div className={`relative w-full h-[380px] ${type === "video" ? "lg:h-[1000px]" : "lg:h-[760px]"}`}>
        {type === "video" ? (
          <video
            id={videoId}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={device === "desktop" ? desktopVideo : mobileVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: device === "desktop"
                ? `url(${desktop})`
                : `url(${mobile})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Sound Control Button */}
        <VideoControls 
          videoId={videoId} 
          showControls={showSoundControls && type === "video"} 
        />
        
        {showText && action && (
          <div className="relative content-wrapper container px-5 lg:px-0 mx-auto py-10 h-full justify-center">
            <div class="flex flex-col gap-4 w-full lg:max-w-[670px] h-full justify-center">
              <h1
                className="text-[24px] leading-[24px] lg:leading-[50px] lg:text-[50px] font-bold text-white flex flex-col">
                {action.title}
              </h1>
              <div
                className="text-base text-white flex"
                dangerouslySetInnerHTML={{ __html: action.content }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
