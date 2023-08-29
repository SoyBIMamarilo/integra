"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarItem = ({ href, name }) => {
  const pathName = usePathname().split("/")[1];
  const active = pathName == href;
  const activateStyles = !active
    ? "hover:text-neutral-900"
    : "border border-solid border-black rounded-full bg-neutral-800	text-neutral-100 hover:text-neutral-200";
  return (
    <Link href={`/${href}`} className={` ${activateStyles} px-4 py-1`}>
      {name}
    </Link>
  );
};

export default SideBarItem;
