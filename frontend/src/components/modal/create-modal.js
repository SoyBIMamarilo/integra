"use client";
import { useRouter } from "next/navigation";

export default function Modal(props) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="absolute left-0 top-0 z-10 h-screen w-screen"
      ></div>
      <div className="absolute right-0 top-0 z-20 h-screen w-2/6 bg-neutral-100 p-10 pr-40 text-lg font-semibold">
        {props.children}
      </div>
    </>
  );
}
