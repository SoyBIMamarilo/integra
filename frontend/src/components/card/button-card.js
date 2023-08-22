import Link from "next/link";

const ButtonCard = ({ id, href, title, subtitle, clickHandler }) => {
  return (
    <button
      id={id}
      href={href}
      className="w-48 overflow-hidden border-2 border-solid border-neutral-700 px-2 py-3 hover:bg-neutral-100"
      onClick={clickHandler}
    >
      <div className="text-base">{title}</div>
      <div className="text-xs font-extralight">{subtitle}</div>
    </button>
  );
};

export default ButtonCard;
