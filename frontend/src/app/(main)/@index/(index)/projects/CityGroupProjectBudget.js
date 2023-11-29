"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { nf } from "@/util/date-format";

const CityGroupProjectBudget = ({ item, project }) => {
  const params = useParams();
  return (
    <tr>
      <td className="overflow-hidden border-2 border-integra-background-strong text-center">
        <Link
          href={`/projects/${project}/${item.id}`}
          className="hover:underline"
        >
          {item.version}
        </Link>
      </td>
      <td className="overflow-hidden border-2 border-integra-background-strong text-center">
        {nf.format(item.vrtot)}
      </td>
      <td className="overflow-hidden border-2 border-integra-background-strong text-center">
        {nf.format(item.vrm2const)}
      </td>
      <td className="overflow-hidden border-2 border-integra-background-strong text-center">
        {nf.format(item.vrm2vend)}
      </td>
    </tr>
  );
};

export default CityGroupProjectBudget;
