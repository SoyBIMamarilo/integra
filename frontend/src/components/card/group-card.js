export default function GroupCard(props) {
  return (
    <div
      className={`${props.styles} relative flex max-h-full flex-col overflow-auto`}
    >
      <div className="title-black   text-neutral-600">{props.title}</div>
      <div className="mx-2 box-border max-h-full grow overflow-auto border border-solid border-neutral-300 ">
        {props.children}
      </div>
    </div>
  );
}
