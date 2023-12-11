"use client"
import { nf } from "@/util/date-format";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectsTable({ projects }) {
  const router = useRouter()
  return (
    <table>
      <thead>
        <tr>
          <th className="border border-neutral-500 bg-neutral-800 p-2 px-6 align-middle text-base font-bold text-neutral-100">
            Proyecto
          </th>
          <th className="border border-neutral-500 bg-neutral-800 p-2 px-6 align-middle text-base font-bold text-neutral-100">
            Ciudad
          </th>
          <th className="border border-neutral-500 bg-neutral-800 p-2 px-6 align-middle text-base font-bold text-neutral-100">
            Valor Total
          </th>
        </tr>
      </thead>
      <tbody>
        {projects &&
          projects.map((pr) => (
            <tr key={pr.proyecto_id} className="hover:bg-gray-200 cursor-pointer" onClick={() => { router.push("/past-projects/" + pr.proyecto_id) }}>
              <td className="table-content px-6 text-center hover:bg-gray-200">{pr.proyecto}</td>
              <td className="table-content px-6 text-center hover:bg-gray-200">{pr.ciudad}</td>
              <td className="table-content px-6 text-center hover:bg-gray-200">
                {nf.format(pr.sum)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
