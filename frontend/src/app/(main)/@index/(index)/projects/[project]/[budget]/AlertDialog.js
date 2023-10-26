"use client";

import Trash from "@/components/svg/trash";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const Alert = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button>
        <Trash />
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-integra-blackA6" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 mb-5 mt-4 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Yes, delete account
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default Alert;

// const Alert = ({ name, value, onConfirm }) => {
//   return (
//     <AlertDialog.Root>
//       <AlertDialog.Trigger>
//         <button>
//           <EmptyTrash />
//         </button>
//       </AlertDialog.Trigger>
//       <AlertDialog.Content className="absolute">
//         <AlertDialog.Title>Confirmar Eliminación</AlertDialog.Title>
//         <AlertDialog.Description size="2">
//           {`Va a eliminar el elemento "${name}" por un total de $${value}. Este paso no se puede
//           deshacer`}
//         </AlertDialog.Description>
//         <Flex gap="3" mt="4" justify="end">
//           <AlertDialog.Cancel>
//             <Button variant="soft" color="gray">
//               Cancelar
//             </Button>
//           </AlertDialog.Cancel>
//           <AlertDialog.Action>
//             <Button onClick={onConfirm} variant="solid" color="red">
//               Eliminar
//             </Button>
//           </AlertDialog.Action>
//         </Flex>
//       </AlertDialog.Content>
//     </AlertDialog.Root>
//   );
// };

// export default Alert;
