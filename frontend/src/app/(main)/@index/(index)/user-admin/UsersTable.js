"use client";
import { nf } from "@/util/date-format";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UsersTable({ users }) {
  const router = useRouter();
  return (
    <table className="border-separate">
      <thead>
        <tr>
          <th className="w-1/3 rounded-tl-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
            Usuario
          </th>
          <th className="h-16 w-1/3 overflow-hidden rounded-tr-xl border-2 border-integra-text bg-integra-primary p-2 align-middle font-bold">
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((pr) => (
          <tr
            key={pr.id}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => {
              router.push(`/user-admin/${pr.id}`);
            }}
          >
            <td className="table-content px-6 text-center hover:bg-gray-200">
              {pr.email}
            </td>
            <td className="table-content px-6 text-center hover:bg-gray-200">
              {pr.rol}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
