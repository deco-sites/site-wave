import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Props {
    title: HTML,
    description: HTML,
}

export default function Card4({ title, description }: Props) {
    return (
        <div class="flex flex-col items-start">
            <div class="w-16 h-0.5 bg-[#0066E4] mb-5" />
            <h2 
                class="services-title text-white text-2xl md:text-[40px] md:leading-[40px] font-bold mb-5"
                dangerouslySetInnerHTML={{ __html: title }} 
            />
            <div 
                class="text-white"
                dangerouslySetInnerHTML={{ __html: description }} 
            />
        </div>
    );
}