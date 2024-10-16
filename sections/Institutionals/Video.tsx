import { VideoWidget as Video } from "apps/admin/widgets.ts";
import { useDevice } from "deco/hooks/useDevice.ts";


export interface Props {
  video: Video;
}

const AppVideo = ({ video }: Props) => {
  const device = useDevice()
  return (
    <div
      class="container px-5 lg:px-0 justify-center lg:justify-start">
      {video &&
        <>
          {device === 'desktop' &&
            <iframe
              width={785}
              height={500}
              class="rounded-lg"
              src={video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          }
        </>
      }
      {video &&
        <>
          {device === 'mobile' && video &&
            <iframe
              width={350}
              height={219}
              class="rounded-lg"
              src={video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          }
        </>
      }

    </div>
  )
}

export default AppVideo