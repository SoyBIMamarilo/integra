import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseOptions } from "@/util/supabase";
import { cookies } from "next/headers";

import Modal from "@/components/modal/create-modal";
import BatchForm from "./BatchForm";

const Page = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: projects, error } = await supabase.from("proyecto").select("*");
  console.log(projects);
  return (
    <Modal>
      <div className="mb-4 font-bold">Añadir Items de csv</div>
      <BatchForm
        projects={projects}
        project={params.project}
        budget={params.budget}
      />
    </Modal>
  );
};

export default Page;
