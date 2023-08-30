import { getIndexes } from "@/app/actions/data-base-actions";
import IndexesSelctionList from "./IndexesSelctionList";
const IndexexSelection = async () => {
  const indexes = await getIndexes();
  return (
    <div className="basis-1/2">
      <div className="title-black w-min	">Indices</div>
      <IndexesSelctionList indexes={indexes} />
    </div>
  );
};

export default IndexexSelection;
