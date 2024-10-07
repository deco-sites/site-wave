import { RichText } from "apps/admin/widgets.ts";

interface Props {
    text?: RichText;
}

const Texts = ({ text }: Props) => {
    return (
        <div class='container'>
            <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}

export default Texts