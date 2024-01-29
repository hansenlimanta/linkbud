import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { RiAccountBoxLine } from "react-icons/ri";
import { AiOutlineExclamationCircle, AiOutlineDollar } from "react-icons/ai";
import { PiChatsLight, PiSignOutLight } from "react-icons/pi";
import { signOut } from "next-auth/react";

const AccountPopover = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <div
        className="h-10 w-10 cursor-pointer items-center justify-center self-center rounded-full bg-pink-300 outline-none outline-offset-2 transition-all hover:outline hover:outline-gray-200 focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Update dimensions"
      />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="z-50 mr-8 w-[350px] min-w-fit rounded-2xl bg-white p-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] transition will-change-[transform,opacity] focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
        sideOffset={5}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-start gap-4 p-4">
            <div className="h-12 w-12 rounded-full bg-pink-300" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-lg font-semibold">@hansenlimanta</p>
              <p className="text-sm text-gray-400">link.bud/hansenlimanta</p>
            </div>
          </div>
          {/* <p className="px-4 font-bold text-gray-500">Account</p>
          <div className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100">
            <RiAccountBoxLine size={25} />
            <p>My account</p>
          </div>
          <div className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100">
            <AiOutlineDollar size={25} />
            <p>Billing</p>
          </div>
          <div className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100">
            <AiOutlineExclamationCircle size={25} />
            <p>Cookie preference</p>
          </div>
          <p className="px-4 font-bold text-gray-500">Support</p>
          <div className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100">
            <AiOutlineExclamationCircle size={25} />
            <p>Ask a question</p>
          </div>
          <div className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100">
            <RiAccountBoxLine size={25} />
            <p>Help topics</p>
          </div>
          <div className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100">
            <PiChatsLight size={25} />
            <p>Submit feedback</p>
          </div> */}
          <div
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex cursor-pointer items-center justify-start gap-4 rounded-lg p-4 hover:bg-slate-100"
          >
            <PiSignOutLight size={25} />
            <p>Sign out</p>
          </div>
        </div>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default AccountPopover;
