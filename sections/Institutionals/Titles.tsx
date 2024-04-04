import type { HTMLWidget } from "apps/admin/widgets.ts";
import { JSX } from "preact/jsx-runtime";

interface Title {
    /**
     * @title Título
     */
    contentTitle: HTMLWidget;
    /**
     * @title Subtítulo
     */
    contentSubtitle: string;
    /**
     * @title Linha
     */
    isLine?: boolean;
}

export default function Titles(
    { contentTitle, contentSubtitle, isLine }: Title,
) {
    return (
        <div class="py-10 bg-black flex justify-center flex-col items-center">
            {isLine && <span class="visual-brand w-[70px] mb-4"></span>}
            <p class="text-[16px] font-medium uppercase text-white max-w-[550px] leading-[25px] mb-1">
                {contentSubtitle}
            </p>
            <h1 class="text-[40px] font-bold text-white leading-[40px] text-center"
                dangerouslySetInnerHTML={{ __html: contentTitle }}>
            </h1>
        </div>
    );
}
