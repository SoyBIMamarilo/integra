"use client";
import Excel from "@/components/svg/excel";
import Link from "next/link";
import { JSONtoCSV } from "@/util/json-convert-csv";
const DownloadFile = (props) => {
  let rootApi = process.env.ROOT_URL
    ? process.env.ROOT_URL
    : "http://localhost:3000";
  const downloadData = async () => {
    let Idata = "";
    fetch(`/api/budget/download/${props.budget}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) return alert("No Existe informacion a Descargar.");
        Idata = JSONtoCSV(data);
        const jsonString = `data:${
          props.fileType
        };chatset=utf-8,${encodeURIComponent(Idata)}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = props.fileName;
        link.click();
        alert("Archivo descargado.");
      })
      .catch((err) => {
        console.error("DownloadButton", err);
      });
  };
  return (
    <Link href="#">
      <button
        onClick={downloadData}
        className="button-black my-3 mb-2 mr-2 inline-flex items-center rounded-lg px-5 py-2.5 text-sm"
      >
        Download
        <Excel />
      </button>
    </Link>
  );
};
export default DownloadFile;
