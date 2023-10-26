"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarItem = ({ href, name, disabled }) => {
  const pathName = usePathname().split("/")[1];
  const active = `/${pathName}` == href;
  const activateStyles = !active
    ? "border border-transparent py-1 hover:text-blackA12"
    : "border py-1 border-solid border-black rounded text-black";
  return (
    <Link href={`${href}`} className={` ${activateStyles} px-4 py-1`}>
      {name}
    </Link>
  );
};

export default SideBarItem;
