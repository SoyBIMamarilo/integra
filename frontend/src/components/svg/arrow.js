"use client";

const Arrow = ({ open }) => {
  const openStyle = open ? "rotate(90)" : "";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mx-1 h-6 w-6 fill-none stroke-neutral-500 stroke-1 hover:stroke-neutral-900 hover:stroke-[1.25]"
      transform={openStyle}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>
  );
};

export default Arrow;
