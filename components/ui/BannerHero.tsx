import type { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

interface Banner {
  /** @description Content type */
  type?: "image" | "video" | "youtube";
  desktop: ImageWidget;
  mobile: ImageWidget;
  /** @description Video URL for desktop */
  desktopVideo?: string;
  /** @description Video URL for mobile */
  mobileVideo?: string;
  /** @description YouTube video ID or URL */
  youtubeVideo?: string;
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
    youtubeVideo,
    type = "image",
    action,
    showText = true,
    showSoundControls = false,
  },
}: { image: Banner; lcp?: boolean; id: string }) {
  const device = useDevice();
  const isMuted = useSignal(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      isMuted.value = videoRef.current.muted;
    }
  };

  return (
    <>
      <div className="relative h-[380px] lg:h-[760px]">
        {type === "youtube" ? (
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeVideo || '')}?autoplay=1&mute=${isMuted.value ? 1 : 0}&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=${getYouTubeVideoId(youtubeVideo || '')}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : type === "video" ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted={isMuted.value}
            loop
            playsInline
            preload="auto"
          >
            <source src={device === "desktop" ? desktopVideo : mobileVideo} />
          </video>
        ) : (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: device === "desktop"
                ? `url(${desktop})`
                : `url(${mobile})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Sound Control Button */}
        {showSoundControls && (type === "video" || type === "youtube") && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label={isMuted.value ? "Ativar som" : "Desativar som"}
          >
            {isMuted.value ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        )}
        
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
