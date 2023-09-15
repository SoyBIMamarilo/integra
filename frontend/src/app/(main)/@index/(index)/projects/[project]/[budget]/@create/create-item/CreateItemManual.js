"use client";

import { nf } from "@/util/date-format";
import { useState } from "react";

const CreateItemManual = () => {
  const [value, setValue] = useState(null);

  const updateValue = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue);
    setValue(nf.format(inputValue));
  };
  return (
    <div className="m-2 grid grid-cols-2 gap-2 rounded-md border border-solid bg-neutral-200 p-1">
      <div>Nombre Ajuste:</div>
      <input id="nombreManual" />
      <div>Valor Ajuste:</div>
      <input id="number" type="text" value={value} onChange={updateValue} />
      <div>Descripción Ajuste</div>
      <textarea name="descripcionAjuste" rows={4} />
    </div>
  );
};

export default CreateItemManual;
