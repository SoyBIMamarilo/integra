"use client";
import { useRouter } from "next/navigation";

export default function Modal(props) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="absolute left-0 top-0 z-10 h-[100vh] w-[70vw]"
      ></div>
      <div className="absolute right-0 top-0 z-30 box-border h-full w-[35vw] overflow-auto bg-neutral-100 px-10 pb-5 pt-24 text-sm font-semibold">
        {props.children}
      </div>
    </>
  );
}
