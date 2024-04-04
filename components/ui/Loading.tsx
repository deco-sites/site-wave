import type { JSX } from "preact";
import { clx } from "deco-sites/site-wave/sdk/clx.ts";

export default function (props: JSX.IntrinsicElements["span"]) {
  return (
    <span
      {...props}
      class={clx("loading loading-spinner", props.class as string)}
    />
  );
}
