"use client";

import { useRef } from "react";

import Plus from "@/components/svg/plus";

const TagNew = ({ tagHandler }) => {
  const tag = useRef();
  const tagSubmitHandler = () => {
    tagHandler(tag.current.value);
    tag.current.value = "";
  };
  return (
    <div className="flex w-36 flex-row place-items-center rounded-full bg-integra-text py-1 pl-4 pr-2   text-white">
      <div className="w-full">
        <input
          ref={tag}
          placeholder="Nuevo Tag.."
          className="top-0 flex h-full w-full border-none bg-integra-text outline-0"
        />
      </div>
      <div className="hover:cursor-pointer" onClick={tagSubmitHandler}>
        +
      </div>
    </div>
  );
};

export default TagNew;
