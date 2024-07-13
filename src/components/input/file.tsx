import { For, Show, splitProps } from "solid-js";

import { FileUpload } from "@ark-ui/solid";

import { cva, cx } from "@/utilities/classname";

export type FileInputProps = Omit<FileUpload.RootProps, "maxFiles">;

const caption = cva({ base: "text-slate-400" });
const heading = cva({ base: "max-w-full truncate text-lg font-semibold" });

export const FileInput = (props: FileInputProps) => {
  const [localRootProps, rootProps] = splitProps(props, ["class"]);

  return (
    <FileUpload.Root
      class={cx("relative", localRootProps.class)}
      maxFiles={1}
      {...rootProps}
    >
      <FileUpload.Label class="sr-only">Upload a file</FileUpload.Label>
      <FileUpload.Dropzone class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg border-4 border-dashed border-sky-500 p-4 outline-none transition hover:border-sky-50 focus:border-sky-50">
        <FileUpload.Context>
          {(context) => (
            <Show when={!context().acceptedFiles.length}>
              <svg
                aria-hidden
                class="h-16 w-16 text-sky-500"
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M200.1 31.2A130.1 132.4 0 0 0 70.03 163.6a130.1 132.4 0 0 0 .55 11.3 80.98 73.47 0 0 0-52.21 68.6A80.98 73.47 0 0 0 99.35 317a80.98 73.47 0 0 0 37.25-8.3 189.3 80.97 0 0 0 70.4 15.6l49-49 49.2 49.2a189.3 80.97 0 0 0 31.3-4.8 91.09 67.8 0 0 0 66 21.1 91.09 67.8 0 0 0 91.1-67.8 91.09 67.8 0 0 0-58-63.1 70.1 81.72 20.61 0 0 2.6-6.2 70.1 81.72 20.61 0 0-36.8-101.2 70.1 81.72 20.61 0 0-76.9 22.8 130.1 132.4 0 0 0-124.4-94.1zM256 300.7L181.7 375H233v112h46V375h51.3L256 300.7z" />
              </svg>
              <span class={heading()}>Upload a file</span>
              <span class={caption()}>Drag and drop or click to select</span>
            </Show>
          )}
        </FileUpload.Context>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup class="h-full">
        <FileUpload.Context>
          {(context) => (
            <For each={context().acceptedFiles}>
              {(file) => (
                <FileUpload.Item
                  class="flex h-full flex-col items-center justify-center"
                  file={file}
                >
                  <FileUpload.ItemPreview>
                    <svg
                      aria-hidden
                      class="h-16 w-16 text-sky-500"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M146.217 28.218l-100.07 42.86 106.296 248.194 41.188-17.64-27.606-191.945-1.28-8.909 78.567-11.3-12.519-29.23c-16.682 3.773-28.871 3.449-47.402 21.062l-5.993 5.693-6.181-5.484c-18.118-16.072-20.828-36.566-25-53.301zm18.912.492c3.243 12.805 5.535 24.275 12.777 33.68 12.818-10.212 24.447-14.227 34.951-16.733-14.485-7.674-29.652-12.217-47.728-16.947zm127.746 71.826l-107.752 15.496 38.436 267.25 36.978-5.318 23.188-193.996 1.068-8.936 86.086 10.29-4.598-31.96c-17.092-.671-28.78-4.14-51.24 8.076l-7.26 3.95-4.552-6.899c-13.34-20.213-10.655-40.708-10.354-57.953zm18.139 5.367c-.182 13.21-.937 24.883 3.625 35.842 15.025-6.547 27.298-7.415 38.093-7.117-12.006-11.162-25.481-19.477-41.718-28.725zm-10.485 89.139l-32.043 268.092 172.77 20.648 24.598-205.793c-16.337-5.073-26.73-11.452-51.586-5.465l-8.034 1.936-2.61-7.84c-7.655-22.977.243-42.079 4.997-58.658zm124.225 22.799c-3.594 12.713-7.345 23.792-5.775 35.558 16.207-2.435 28.286-.097 38.636 2.985-8.708-13.889-19.571-25.409-32.861-38.543z" />
                    </svg>
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemName class={heading()} />
                  <span class={caption()}>
                    Drag and drop or click to select
                  </span>
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
};
