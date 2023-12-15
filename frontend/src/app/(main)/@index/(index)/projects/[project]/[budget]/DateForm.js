import React from "react";
import * as Popover from "@radix-ui/react-popover";
// import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

const DateForm = ({ date, setDateHandler, deleteDateHandler }) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        className="w-60 whitespace-nowrap rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-1 font-bold text-integra-text hover:bg-integra-background-strong"
        aria-label="Update dimensions"
      >
        Entrega: {date}
      </button>
    </Popover.Trigger>
    <Popover.Content
      className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] "
      sideOffset={5}
    >
      <form onSubmit={setDateHandler} className="flex flex-col gap-2.5">
        <input name="date" type="date" />
        <div className="flex flex-row gap-1">
          <button
            type="submit"
            className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
          >
            Establecer
          </button>
          <Popover.Close className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus">
            <div onClick={deleteDateHandler}>Eliminar</div>
          </Popover.Close>
        </div>
      </form>
      {/* <Popover.Close
        className="absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        aria-label="Close"
      >
        <Cross2Icon />
      </Popover.Close> */}
      <Popover.Arrow className="fill-white" />
    </Popover.Content>
    <Popover.Portal></Popover.Portal>
  </Popover.Root>
);

export default DateForm;
