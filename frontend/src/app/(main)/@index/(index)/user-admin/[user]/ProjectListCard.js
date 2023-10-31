"use client";

import { useRouter } from "next/navigation";
import Trash from "@/components/svg/trash";

const ProjectListCard = ({ project }) => {
  const router = useRouter();

  const deleteProjectHandler = async () => {
    const res = await fetch(`/api/budget`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: project.id }),
    });
    router.refresh();
  };

  return (
    <>
      <div className="m-2 flex flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 ">
        <div> {project.proyecto.nombre} </div>
        <Trash onClick={deleteProjectHandler} />
      </div>
    </>
  );
};

export default ProjectListCard;
