"use client";

import Copy from "@/components/svg/copy";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FolderNavigator = async ({
  projectAdsk,
  folderId,
  folderName,
  itemTip,
}) => {
  const [contentList, setContentList] = useState([]);
  const router = useRouter();
  const params = useParams();

  const handleClick = async () => {
    if (!folderId) {
      const resp = await fetch("/api/aps/hubs");
      if (!resp.ok) throw new Error(await resp.text());
      const response = await resp.json();
      const projectResp = await fetch(
        `/api/aps/hubs/${response[0].id}/projects/${projectAdsk[0].aps_project_id}`
      );
      if (!projectResp.ok) throw new Error(await projectResp.text());
      const project = await projectResp.json();
      const folderResp = await fetch(
        `/api/aps/hubs/${response[0].id}/projects/${projectAdsk[0].aps_project_id}/${project.relationships.rootFolder.data.id}`
      );
      if (!folderResp.ok) throw new Error(await folderResp.text());
      const contents = await folderResp.json();
      setContentList(contents);
    } else if (!itemTip) {
      const folderResp = await fetch(
        `/api/aps/hubs/nn/projects/${projectAdsk[0].aps_project_id}/${folderId}`
      );
      if (!folderResp.ok) throw new Error(await folderResp.text());
      const contents = await folderResp.json();
      console.log(contents);
      setContentList(contents);
    } else {
      router.push(
        `/projects/${params.project}/navigator/${btoa(itemTip).replace(
          "=",
          ""
        ).replace("/","_").replace("=","")}`
      );
    }
  };

  return (
    <>
      <div className="pl-5">
        <div
          className="m-2 flex w-64 cursor-pointer flex-row flex-wrap justify-between rounded border border-neutral-200 bg-neutral-100 p-3 hover:bg-neutral-300"
          onClick={handleClick}
        >
          <div> {folderName || "Carpetas de proyecto"} </div>
        </div>
        {contentList.map((folder) => {
          return (
            <FolderNavigator
              projectAdsk={projectAdsk}
              folderId={folder.id}
              folderName={
                folder.attributes.name || folder.attributes.displayName
              }
              itemTip={
                folder.type !== "folders"
                  ? folder.relationships.tip.data.id
                  : null
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default FolderNavigator;
