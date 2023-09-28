import Link from "next/link";

const LinkCard = ({ id, href, title, subtitle}) => {
  return (
    <Link
      id={id}
      href={href}
      className="flex min-w-[12rem] overflow-hidden border-2 border-solid border-neutral-700 px-2 py-3 hover:bg-neutral-100"
    >
      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-20 md:rounded-none md:rounded-l-lg" src="https://picsum.photos/200" alt="sss"></img>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="text-base">{title}</div>
        <div className="text-xs font-extralight">{subtitle}</div>
      </div>
    </Link>
  );
};

export default LinkCard;
