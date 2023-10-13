import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseOptions } from "@/util/supabase";
import { cookies } from "next/headers";
import Modal from "@/components/modal/create-modal";
import BatchForm from "./BatchForm";

const Page = ({ params }) => {
  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Items de csv</div>
      <BatchForm project={params.project} />
    </Modal>
  );
};

export default Page;
