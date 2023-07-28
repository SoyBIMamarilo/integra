export default function GroupCard(props) {
  return (
    <div className="relative flex flex-col p-6">
      <div className="mb-3 to-neutral-800 text-xl font-semibold">
        {props.title}
      </div>
      <div className=" grow  border border-solid border-neutral-500 p-2 ">
        {props.children}
      </div>
    </div>
  );
}
