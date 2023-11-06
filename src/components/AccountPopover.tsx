import React from "react";
import * as Popover from "@radix-ui/react-popover";

const PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <div
        className="text-violet11 shadow-blackA4 hover:bg-violet3 inline-flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-pink-300 shadow-[0_2px_10px] outline-none transition hover:bg-pink-400 focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Update dimensions"
      />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-mauve12 mb-2.5 text-[15px] font-medium leading-[19px]">
            Dimensions
          </p>
          <fieldset className="flex items-center gap-5">
            <label
              className="text-violet11 w-[75px] text-[13px]"
              htmlFor="width"
            >
              Width
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="width"
              defaultValue="100%"
            />
          </fieldset>
          <fieldset className="flex items-center gap-5">
            <label
              className="text-violet11 w-[75px] text-[13px]"
              htmlFor="maxWidth"
            >
              Max. width
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="maxWidth"
              defaultValue="300px"
            />
          </fieldset>
          <fieldset className="flex items-center gap-5">
            <label
              className="text-violet11 w-[75px] text-[13px]"
              htmlFor="height"
            >
              Height
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="height"
              defaultValue="25px"
            />
          </fieldset>
          <fieldset className="flex items-center gap-5">
            <label
              className="text-violet11 w-[75px] text-[13px]"
              htmlFor="maxHeight"
            >
              Max. height
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="maxHeight"
              defaultValue="none"
            />
          </fieldset>
        </div>
        <Popover.Close
          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
          aria-label="Close"
        >
          {/* <RxCross2 /> */}
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverDemo;
