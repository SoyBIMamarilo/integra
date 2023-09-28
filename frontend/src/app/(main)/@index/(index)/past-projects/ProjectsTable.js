import { nf } from "@/util/date-format";

export default function ProjectsTable({ projects }) {
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
        {projects.map((pr) => (
          <tr key={pr.proyecto_id}>
            <td className="table-content px-6 text-center">{pr.proyecto}</td>
            <td className="table-content px-6 text-center">{pr.ciudad}</td>
            <td className="table-content px-6 text-center">
              {nf.format(pr.sum)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
