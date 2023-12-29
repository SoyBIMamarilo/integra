"use client";
import Pencil from "@/components/svg/pencil";

export default function ProjectInfoFormDataCities({
  defaultValue,
  editHandler,
  edit,
  changeDataHandler,
  ciudad,
  ciudades,
}) {
  return (
    <>
      {edit ? (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>Ciudad</p>
          </div>
          <div className="flex flex-row">
            <select
              className="w-full border-none"
              name="ciudad_id"
              defaultValue={defaultValue}
              onChange={changeDataHandler}
            >
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
            <div className="w-min">
              <Pencil onClick={editHandler} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>Ciudad</p>
          </div>
          <div className="flex flex-row">
            <div className="w-full truncate border-none">{ciudad}</div>
            <Pencil onClick={editHandler} />
          </div>
        </div>
      )}
    </>
  );
}
