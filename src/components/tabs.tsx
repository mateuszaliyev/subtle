import { splitProps, type JSX } from "solid-js";

import { cva, cx } from "@/utilities/classname";

export type TabProps = JSX.HTMLElementTags["button"] & {
  selected?: boolean;
};

export type TabsProps = JSX.HTMLElementTags["div"];

const tab = cva({
  base: "inline-flex w-full items-center justify-center truncate rounded-md px-3 py-1 capitalize outline-none transition hover:text-sky-50 focus-visible:ring-2 focus-visible:ring-sky-50 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-50",
  variants: {
    selected: {
      true: "bg-slate-950 text-sky-50",
    },
  },
});

export const Tab = (props: TabProps) => {
  const [localProps, buttonProps] = splitProps(props, [
    "class",
    "selected",
    "type",
  ]);

  return (
    <button
      class={tab({ class: localProps.class, selected: localProps.selected })}
      type={localProps.type ?? "button"}
      {...buttonProps}
    />
  );
};

export const Tabs = (props: TabsProps) => {
  const [localProps, divProps] = splitProps(props, ["class"]);

  return (
    <div
      class={cx(
        "inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-slate-900 p-1 text-sm font-medium text-slate-400",
        localProps.class,
      )}
      {...divProps}
    />
  );
};
