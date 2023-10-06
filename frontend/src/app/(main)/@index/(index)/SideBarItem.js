"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarItem = ({ href, name, disabled }) => {
  const pathName = usePathname().split("/")[1];
  const active = pathName == href;
  const activateStyles = !active
    ? "hover:text-neutral-900"
    : "border py-1 border-solid border-black rounded-full bg-neutral-800	text-neutral-100 hover:text-neutral-200";
  console.log(disabled);
  return (
    <Link
      href={`/${href}`}
      className={` ${activateStyles} px-4 py-1 ${
        disabled ? "pointer-events-none text-neutral-300" : ""
      }`}
    >
      {name}
    </Link>
  );
};

export default SideBarItem;
