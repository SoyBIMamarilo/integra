import LinkCard from "@/components/card/link-card";
const IndexesSelctionList = ({ indexes }) => {
  return (
    <div className="flex w-2/5 flex-col items-stretch gap-2">
      {indexes.map((it) => (
        <LinkCard
          key={it.abreviatura}
          id={it.abreviatura}
          href="/projects"
          subtitle={it.descripcion}
          title={it.abreviatura}
        ></LinkCard>
      ))}
    </div>
  );
};

export default IndexesSelctionList;
