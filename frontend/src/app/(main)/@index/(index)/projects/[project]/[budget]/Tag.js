const Tag = ({ tag }) => {
  return (
    <div className="flex max-w-[150px] flex-row place-items-center gap-2 whitespace-nowrap rounded-full bg-integra-text px-4 py-1	text-white">
      <div> {tag.texto}</div>
    </div>
  );
};

export default Tag;
