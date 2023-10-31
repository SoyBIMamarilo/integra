"use client"
import { nf } from "@/util/date-format";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UsersTable({ users }) {
  const router = useRouter()
  return (
    <table>
      <thead>
        <tr>
          <th className="border border-neutral-500 bg-neutral-800 p-2 px-6 align-middle text-base font-bold text-neutral-100">
            Usuario
          </th>
          <th className="border border-neutral-500 bg-neutral-800 p-2 px-6 align-middle text-base font-bold text-neutral-100">
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((pr) => (
          <tr key={pr.id} className="hover:bg-gray-200 cursor-pointer" onClick={()=>{router.push(`/user-admin/${pr.id}`)}}>
              <td className="table-content px-6 text-center hover:bg-gray-200">{pr.email}</td>
              <td className="table-content px-6 text-center hover:bg-gray-200">{pr.rol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
