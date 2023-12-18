"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { nf } from "@/util/date-format";
import View from "@/components/svg/view";

const Comparer = ({}) => {
  const [itemInfo, setItemInfo] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetch(`/api/item-data/${item}`);
      setItemInfo((await data.json())[0]);
    };
    loadData();
  }, []);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="whitespace-nowrap rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-1 font-bold text-integra-text hover:bg-integra-background-strong">
          Comparar
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[200]  max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 font-medium text-mauve12">
            Comparar Presupuesto
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] leading-normal text-mauve11">
            Selecciona el proyecto y el presupuesto con el que deseas comparar
          </Dialog.Description>
          Descripción
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus">
                Cerrar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            ></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Comparer;
