import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
    title: HTML,
    description: HTML;
}

export default function Card2({ title, description }: Props) {
    return (
        <div class="flex flex-col items-center">
            <div class="w-16 h-0.5 bg-[#0066E4] mb-5" />
            <h2 class="text-white text-2xl font-bold text-center mb-5 md:mb-10">
                <span 
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            </h2>
            <div 
                class="w-full text-white p-10 rounded-2xl bg-[#0a0a0a] services-list"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
}