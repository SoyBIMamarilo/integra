"use client";

import * as Separator from "@radix-ui/react-separator";

const SeparatorComponent = () => {
  return (
    <Separator.Root
      className=" bg-blackA6 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      decorative
      orientation="vertical"
    />
  );
};

export default SeparatorComponent;
