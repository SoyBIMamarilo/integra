const Tag = ({ tag }) => {
  return (
    <div className="flex flex-row place-items-center rounded-full bg-integra-text px-4 py-1    text-white">
      {tag.texto}
    </div>
  );
};

export default Tag;
