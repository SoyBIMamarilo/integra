"use client";
import Pencil from "@/components/svg/pencil";

export default function ProjectInfoFormDataItem({
  label,
  defaultValue,
  editHandler,
  edit,
  type,
  changeDataHandler,
}) {
  return (
    <>
      {edit ? (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>{label}</p>
          </div>
          <div className="flex flex-row">
            <input
              className="w-full border-none"
              type={type}
              name="nombre"
              defaultValue={defaultValue}
              onChange={changeDataHandler}
            />
            <div className="w-min">
              <Pencil onClick={editHandler} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>{label}</p>
          </div>
          <div className="flex flex-row">
            <div className="w-full truncate border-none">{defaultValue}</div>
            <Pencil onClick={editHandler} />
          </div>
        </div>
      )}
    </>
  );
}
