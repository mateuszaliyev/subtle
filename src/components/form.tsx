import { createSignal, Index, Show, type JSX } from "solid-js";

import { Input } from "@/components/input";
import { FileInput as TestFileInput } from "@/components/input/file";
import { Tab, Tabs } from "@/components/tabs";

import { cx } from "@/utilities/classname";
import { decrypt, encrypt } from "@/utilities/crypto";

type Action = (typeof ACTIONS)[number];

const ACTIONS = ["decrypt", "encrypt"] as const;

export const Form = () => {
  const [action, setAction] = createSignal<Action>("encrypt");
  const [error, setError] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (
    event,
  ) => {
    event.preventDefault();
    console.log(event);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file");
    const password = formData.get("password");

    console.log(file);

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!(file instanceof File)) {
      setError("File is of a wrong type.");
      return;
    }

    if (!password) {
      setError("No password selected.");
      return;
    }

    if (typeof password !== "string") {
      setError("Password is of a wrong type.");
      return;
    }

    setError("");

    const selectedAction = action();

    void file
      .arrayBuffer()
      .then((data) =>
        selectedAction === "decrypt"
          ? decrypt(new Uint8Array(data), password)
          : encrypt(new Uint8Array(data), password),
      )
      .then((data) => {
        const anchor = document.createElement("a");
        const newFile = new Blob([data]);

        anchor.href = URL.createObjectURL(newFile);
        anchor.download =
          selectedAction === "decrypt"
            ? file.name.slice(0, -8)
            : `${file.name}.subtle`;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(anchor.href);
      })
      .catch(() => setError("Wrong password."));
  };

  return (
    <form class="mt-8 flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <Tabs>
        <Index each={ACTIONS}>
          {(name) => (
            <Tab
              onClick={() => setAction(name())}
              selected={action() === name()}
            >
              {name()}
            </Tab>
          )}
        </Index>
      </Tabs>
      <Show
        fallback={<TestFileInput class="h-64" name="file" />}
        when={action() === "decrypt"}
      >
        <TestFileInput accept=".subtle" class="h-64" name="file" />
      </Show>
      <div class="flex gap-4">
        <div class="relative w-full">
          <Input
            class="w-full font-mono"
            name="password"
            placeholder="Password"
            type={showPassword() ? "text" : "password"}
          />
          <button
            class={cx(
              "absolute right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 outline-none transition hover:text-sky-50 focus-visible:text-sky-50",
              showPassword() ? "text-sky-500" : "text-slate-400",
            )}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            type="button"
          >
            <svg
              class="h-full w-full fill-current"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
            <span class="sr-only">
              <Show fallback="Show password" when={showPassword}>
                Hide password
              </Show>
            </span>
          </button>
        </div>
        <button class="h-8 w-8 shrink-0 cursor-pointer text-sky-500 outline-none transition hover:text-sky-50 focus-visible:text-sky-50">
          <svg
            aria-hidden
            class="h-full w-full fill-current"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M400.218 212.413v-42.195a144.218 144.218 0 1 0-288.436 0v42.195H90.61V486H421.39V212.413h-21.173zM216.342 407.97h-57.29v-22.354h57.29v22.354zm0-33.403h-57.29v-57.29h57.29v57.29zm0-68.28h-57.29v-22.354h57.29v22.32zm68.28 101.718h-57.29v-22.39h57.29v22.355zm0-33.403h-57.29v-57.29h57.29v57.29zm0-68.28h-57.29v-22.39h57.29v22.32zm68.28 101.718h-57.29v-22.424h57.29v22.354zm0-33.403h-57.29v-57.29h57.29v57.29zm0-68.28h-57.29v-22.424h57.29v22.32zm2.887-93.884H156.211v-42.254a99.789 99.789 0 1 1 199.578 0v42.195zM177.455 353.439c0 4.443 3.835 8.184 10.195 8.184 5.846 0 10.336-3.507 10.336-8.839 0-3.694-2.339-6.36-6.127-7.857v-.093c3.741-1.777 5.004-4.536 5.004-7.109 0-3.788-2.946-7.482-8.839-7.482-5.331 0-9.353 3.273-9.353 8.09 0 2.62 1.45 5.238 4.817 6.828v.14c-3.742 1.59-6.033 4.303-6.033 8.138zm5.05-15.386c0-2.62 1.871-4.864 5.285-4.864a4.677 4.677 0 0 1 5.145 4.957c0 2.76-2.011 4.677-4.677 5.519-3.46-.936-5.752-2.572-5.752-5.612zm4.677 8.558c4.116 1.17 6.688 2.946 6.688 6.64 0 3.134-2.338 5.426-6.08 5.426-3.881 0-6.22-2.713-6.08-5.846-.046-2.853 1.871-5.191 5.426-6.22zm67.275 15.059a15.445 15.445 0 0 1-7.904-2.058l1.17-3.18a13.738 13.738 0 0 0 6.734 1.918c5.284 0 6.921-3.368 6.874-5.846 0-4.256-3.881-6.08-7.856-6.08h-2.339v-3.087h2.339c2.993 0 6.78-1.543 6.78-5.144 0-2.432-1.543-4.583-5.33-4.583a11.166 11.166 0 0 0-6.08 2.01l-1.076-2.992a14.451 14.451 0 0 1 7.95-2.339c5.987 0 8.7 3.508 8.7 7.25 0 3.133-1.872 5.845-5.613 7.155v.093a7.915 7.915 0 0 1 6.781 7.81c-.093 4.817-3.881 9.073-11.177 9.073zm70.15 0c6.314 0 10.102-5.144 10.102-10.71 0-5.94-3.788-9.82-9.167-9.82a9.061 9.061 0 0 0-7.342 3.507h-.14a12.358 12.358 0 0 1 10.522-10.803 14.849 14.849 0 0 1 3.087-.187v-3.368a19.876 19.876 0 0 0-2.993.234 16.556 16.556 0 0 0-9.728 4.49 19.104 19.104 0 0 0-5.144 13.703c.047 7.88 4.303 12.93 10.803 12.93zm-6.22-13.703a6.77 6.77 0 0 1 5.846-3.741c3.788 0 6.267 2.619 6.267 7.015 0 4.396-2.339 7.296-5.94 7.296-4.302 0-6.594-3.695-6.687-8.7a3.508 3.508 0 0 1 .514-1.893z" />
          </svg>
          <span class="sr-only">Submit</span>
        </button>
      </div>
      <p
        aria-live="polite"
        class="-mt-3 min-h-5 px-4 text-sm font-medium text-sky-500"
      >
        {error()}
      </p>
    </form>
  );
};
