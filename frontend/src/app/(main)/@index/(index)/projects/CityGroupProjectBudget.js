"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { nf } from "@/util/date-format";

const CityGroupProjectBudget = ({ item }) => {
  const params = useParams();
  return (
    <tr>
      <td>
        <Link href={`/projects/${1}/${item.id}`}>{item.version}</Link>
      </td>
      <td>{nf.format(item.vrtot)}</td>
      <td>{nf.format(item.vrm2const)}</td>
      <td>{nf.format(item.vrm2vend)}</td>
    </tr>
  );
};

export default CityGroupProjectBudget;
