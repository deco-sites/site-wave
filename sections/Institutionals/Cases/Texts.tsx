import { TextArea } from "apps/admin/widgets.ts";

interface Props {
    texts?: Texts[];
}

interface Texts {
    hasBg?: boolean;
    title?: string;
    content?: TextArea;
}

const Texts = ({ texts }: Props) => {
    return (
        <div class="container justify-center flex">
            <div class="flex items-center">
                {texts?.map((item) => {
                    <div class={`${item?.hasBg && 'p-8 bg-[#0A0A0A]'}`}>
                        <p>{item?.title}</p>
                        <p>{item?.content}</p>
                    </div>
                })}
            </div></div>
    )
}

export default Texts