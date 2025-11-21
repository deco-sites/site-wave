import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

interface Props {
  videoId: string;
  showControls: boolean;
}

export default function VideoControls({ videoId, showControls }: Props) {
  const volume = useSignal(10); // Inicia em 50%
  const isPlaying = useSignal(true);
  const isHovered = useSignal(false);
  const showControlsState = useSignal(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    videoRef.current = document.getElementById(videoId) as HTMLVideoElement;
    if (videoRef.current) {
      videoRef.current.volume = 0.5; // Define volume inicial como 50%
      videoRef.current.muted = false; // Desmuta o vídeo
    }
  }, [videoId]);

  const handleVolumeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newVolume = parseInt(target.value);
    volume.value = newVolume;

    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying.value) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      isPlaying.value = !isPlaying.value;
    }
  };

  const handleMouseMove = () => {
    showControlsState.value = true;
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout to hide controls after 3 seconds
    timeoutRef.current = setTimeout(() => {
      showControlsState.value = false;
    }, 3000);
  };

  const handleMouseEnter = () => {
    isHovered.value = true;
    handleMouseMove();
  };

  const handleMouseLeave = () => {
    isHovered.value = false;
    showControlsState.value = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!showControls) return null;

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Controls Bar - appears on hover and mouse activity */}
      {showControlsState.value && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-black bg-opacity-70 backdrop-blur-md rounded-full px-4 md:px-8 py-2 md:py-4 shadow-2xl border border-white border-opacity-20">
            <div className="flex items-center justify-center gap-3 md:gap-6">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="bg-white bg-opacity-20 text-white p-2 md:p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
                aria-label={isPlaying.value ? "Pausar vídeo" : "Reproduzir vídeo"}
              >
                {isPlaying.value ? (
                  <svg width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7L8 5z"/>
                  </svg>
                )}
              </button>

              {/* Volume Icon */}
              <div className="text-white">
                {volume.value === 0 ? (
                  <svg width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : volume.value < 50 ? (
                  <svg width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm7 3c0-1.77-1.02-3.29-2.5-4.03v8.05C8.98 15.29 10 13.77 10 12z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </div>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume.value}
                onInput={handleVolumeChange}
                className="volume-slider w-16 md:w-24 h-1 bg-white bg-opacity-30 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume.value}%, rgba(255,255,255,0.3) ${volume.value}%, rgba(255,255,255,0.3) 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          .volume-slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
          }
          @media (min-width: 768px) {
            .volume-slider::-webkit-slider-thumb {
              width: 16px;
              height: 16px;
            }
          }
          .volume-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          .volume-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          .volume-slider::-webkit-slider-track {
            height: 4px;
            border-radius: 2px;
          }
          .volume-slider::-moz-range-track {
            height: 4px;
            border-radius: 2px;
            border: none;
          }
        `}
      </style>
    </div>
  );
}
