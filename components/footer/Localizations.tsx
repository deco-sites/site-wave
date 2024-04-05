import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

interface Title {
    /**
    * @title Office
    */
    title: string;
    /**
     * @title content
     */
    content: HTMLWidget;
    /**
     * @title Icon
     */
    isIcon?: boolean;
   


}

export default function Localizations(
    { content, isIcon, title }: Title,
) {
    return (
        <div class="bg-black ">
            <div class="container">
                <div class="flex justify-center flex-col items-start max-w-[180px] ">
                    <p class="font-bold text-white my-1 flex items-center gap-2 text-base">
                        {isIcon && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                                <path d="M5 0C3.67438 0.00153607 2.40348 0.540107 1.46613 1.49756C0.528771 2.45501 0.00150383 3.75315 0 5.10719C0 9.47733 4.54545 12.7779 4.7392 12.916C4.81563 12.9707 4.90669 13 5 13C5.09331 13 5.18437 12.9707 5.2608 12.916C5.45455 12.7779 10 9.47733 10 5.10719C9.9985 3.75315 9.47123 2.45501 8.53387 1.49756C7.59652 0.540107 6.32562 0.00153607 5 0ZM5 3.25003C5.3596 3.25003 5.71113 3.35895 6.01013 3.56302C6.30913 3.76709 6.54217 4.05714 6.67978 4.39649C6.8174 4.73584 6.8534 5.10925 6.78325 5.46951C6.71309 5.82976 6.53993 6.16068 6.28565 6.42041C6.03137 6.68013 5.7074 6.85701 5.35471 6.92867C5.00202 7.00033 4.63644 6.96355 4.30421 6.82299C3.97198 6.68242 3.68802 6.44439 3.48824 6.13898C3.28845 5.83357 3.18182 5.47451 3.18182 5.10719C3.18182 4.61464 3.37338 4.14227 3.71435 3.79398C4.05533 3.4457 4.51779 3.25003 5 3.25003Z" fill="#0066E4" />
                            </svg>
                        )}
                        {title}</p>

                    <p
                        class="text-[#717171] text-start text-[10px] lg:text-sm "
                        dangerouslySetInnerHTML={{ __html: content }}
                    >
                    </p>
                </div>
            </div>
        </div>
    );
}
