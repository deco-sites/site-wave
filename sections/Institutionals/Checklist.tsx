import Icon from "../../components/ui/Icon.tsx";

interface Props {
    title?: string;
    checklists: CheckListProps[];
}

interface CheckListProps {
    texts?: string;
}

const Checklist = ({ checklists, title }: Props) => {
    return (
        <div class="p-4 lg:p-8 bg-[#0A0A0A] flex flex-col gap-6 rounded-3xl">
            <p class="text-white text-2xl font-bold mb-2">{title}</p>
            {checklists.map((item) => (
                <p class="text-[#717171] flex items-center gap-1"><Icon class="ml-1" width={15} height={10} id={"checked"} /> {item?.texts}</p>
            ))}
        </div>
    );
}

export default Checklist;
