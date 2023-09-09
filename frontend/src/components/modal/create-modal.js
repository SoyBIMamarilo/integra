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
      <div className="absolute right-0 top-[10vh] z-30 box-border h-[90vh] w-[35vw] overflow-auto bg-neutral-100 px-10 py-5 text-sm font-semibold">
        {props.children}
      </div>
    </>
  );
}
