"use client";
import { nf } from "@/util/date-format";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectsTable({ projects }) {
  const router = useRouter();
  return (
    <table className="border-separate">
      <thead>
        <tr>
          <th className="w-1/3 rounded-tl-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
            Proyecto
          </th>
          <th className="h-1 w-1/3 overflow-hidden border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
            Ciudad
          </th>
          <th className="h-16 w-1/3 overflow-hidden rounded-tr-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
            Valor Total
          </th>
        </tr>
      </thead>
      <tbody>
        {projects &&
          projects.map((pr) => (
            <tr
              key={pr.proyecto_id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => {
                router.push("/past-projects/" + pr.proyecto_id);
              }}
            >
              <td className="table-content px-6 text-center hover:bg-gray-200">
                {pr.proyecto}
              </td>
              <td className="table-content px-6 text-center hover:bg-gray-200">
                {pr.ciudad}
              </td>
              <td className="table-content px-6 text-center hover:bg-gray-200">
                {nf.format(pr.sum)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
