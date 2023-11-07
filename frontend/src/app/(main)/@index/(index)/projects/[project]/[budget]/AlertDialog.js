"use client";

import Trash from "@/components/svg/trash";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const Alert = ({ name, value, onConfirm }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <div className="w-max">
        <Trash />
      </div>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
      <AlertDialog.Content className="fixed left-[50%] top-[50%] z-[200]  max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          Confirmar Eliminación
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal text-mauve11">
          {`Vas a eliminar el elemento '${name}' por un total de $${value}. Este paso no se puede deshacer.`}
        </AlertDialog.Description>
        <div className="flex justify-end gap-3">
          <AlertDialog.Cancel asChild>
            <button
              className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-1 font-bold text-integra-text hover:bg-integra-background-strong
"
            >
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={onConfirm} asChild>
            <button className="rounded-lg border-2 border-solid	 border-integra-text bg-integra-alert-main px-5 py-1 font-bold text-integra-text hover:bg-integra-alert-focus">
              Sí, eliminar
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default Alert;
