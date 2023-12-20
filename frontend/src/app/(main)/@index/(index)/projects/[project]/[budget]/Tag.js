"use client";

import { useRef } from "react";
import * as Popover from "@radix-ui/react-popover";

const Tag = ({ tag, tagUpdateHandler, tagDeleteHandler }) => {
  const newText = useRef();
  const putHandler = (event) => {
    event.preventDefault();
    tagUpdateHandler(tag.id, newText.current.value);
  };
  const deleteHandler = () => {
    tagDeleteHandler(tag.id);
  };
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="flex flex-row place-items-center gap-2 whitespace-nowrap rounded-full bg-integra-text px-4 py-1	text-white">
            <div> {tag.texto}</div>
          </div>
        </Popover.Trigger>
        <Popover.Content
          className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] "
          sideOffset={5}
        >
          <form onSubmit={putHandler} className="flex flex-col gap-2.5 ">
            <input
              ref={newText}
              defaultValue={tag.texto}
              name="tag"
              type="text"
            />
            <div className="flex flex-row gap-1">
              <button
                type="submit"
                className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-confirm-main px-5 py-1 font-bold text-integra-text hover:bg-integra-confirm-focus"
              >
                Establecer
              </button>
              <Popover.Close
                onClick={deleteHandler}
                className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus"
              >
                <div>Eliminar</div>
              </Popover.Close>
            </div>
          </form>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
        <Popover.Portal></Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default Tag;
