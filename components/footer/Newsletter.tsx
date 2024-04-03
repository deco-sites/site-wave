import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import Button from "deco-sites/site-wave/components/ui/Button.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4",
        tiled && "lg:w-full lg:justify-between",
      )}
    >
      <div class="flex flex-col gap-4">
        <span class="visual-brand mb-2 lg:mb-4 w-[70px]"></span>
        {content?.title && (
          <h4 class={tiled ? "text-2xl lg:text-3xl" : "text-lg"}>
            {content?.title}
          </h4>
        )}
        {content?.description && <div class="lg:max-w-[274px]">{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap border border-[#404040] lg:fit rounded-[33px]">
            <input
              name="email"
              class="flex-auto md:flex-none bg-transparent input-bordered md:w-80 text-base-content pl-8"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <Button
              type="submit"
              class="btn disabled:loading bg-blue-500 rounded-[33px] text-white border-0"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
