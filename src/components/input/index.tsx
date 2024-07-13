import type { JSX } from "solid-js";

import { cx } from "@/utilities/classname";

export type InputProps = JSX.HTMLElementTags["input"];

export const Input = (props: InputProps) => (
  <input
    {...props}
    class={cx(
      "rounded-lg border-4 border-slate-900 bg-slate-900 px-3 py-1 text-sm font-medium outline-none transition placeholder:text-slate-400 placeholder:transition focus:bg-slate-950",
      props.class,
    )}
  />
);
