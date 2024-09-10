import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from '../../components/ui/Button.tsx';

import { useDevice } from "deco/hooks/useDevice.ts";

interface Props {
    type?: 'first' | 'second';
    imageDesktop?: ImageWidget;
    imageMobile?: ImageWidget;
    title?: string;
    subtitle?: string;
    button?: CTA;
}

interface CTA {
    link?: string;
    label?: string;
}

const InfoCard = ({ imageDesktop, imageMobile, title = "Default Title", subtitle = "Default Subtitle", button, type }: Props) => {

    const device = useDevice();

    return (
        <div
            class={`${type === 'first' ? 'h-[390px] lg:h-[530px]' : 'h-[400px] lg:h-[400px]'}  bg-cover bg-center flex flex-col items-center pb-[60px] lg:pb-0 justify-end lg:justify-center`}
            style={{ backgroundImage: `url(${device === 'desktop' ? imageDesktop : imageMobile})` }}
        >
            <div class="flex flex-col items-center text-center space-y-2">
                <div class="flex flex-col justify-center items-center">
                    <span className="visual-brand my-3 w-[61px]"></span>
                    <p class="text-2xl font-extrabold text-white">{title}</p>
                </div>
                <p class="text-base text-white font-light max-w-[208px] lg:max-w-[238px]">{subtitle}</p>
                {button?.link && button?.label && (
                    <Button
                        primary={true}
                        class="mt-5 inline-block px-6 py-2  text-white transition rounded-full font-base gap-3"
                        href={button.link}>
                        {button.label}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default InfoCard;
