interface Props {
  text: string;
  isHighlighted: string;
  columnReversed?: boolean;
}

const TitlePage = (
  { text = "titulo", isHighlighted = "Highlighted", columnReversed = false }:
    Props,
) => {
  return (
    <div class="bg-black">
      <p
        class={`text-[30px] text-white font-bold text-center px-[30px] py-[70px] ${
          columnReversed
            ? "flex flex-col-reverse lg:flex-row-reverse lg:justify-center"
            : ""
        }`}
      >
        <span>{text}</span>
        <span class="text-[#0066E4]">{isHighlighted}</span>
      </p>
    </div>
  );
};

export default TitlePage;
