"use client";
import Excel from "@/components/svg/excel";
import Link from "next/link";
import { JSONtoCSV } from "@/util/json-convert-csv";
const DownloadFile = (props) => {
    let rootApi = process.env.ROOT_URL ? process.env.ROOT_URL : "http://localhost:3000";
    const downloadData = async () => {
        let headtable = document.querySelectorAll("table > thead > tr > th");
        let joinHead = "";
        let joinBody = "";
        console.log(headtable.forEach(function (th) {
            joinHead += `${th.innerText ? th.innerText.toUpperCase() : th.innerText},`;
        }));
        joinHead += '\r\n';
        let bodyTable = document.querySelectorAll("table > tbody > tr");
        console.log(bodyTable.forEach(function (tr) {

            if (tr.childNodes.length > 0) {
                tr.childNodes.forEach(function (td) {
                    if (td.innerHTML.indexOf('button') > -1)
                        return;
                    else
                        joinBody += `${(td.innerText ? td.innerText.toUpperCase() : td.innerText)},`;
                });
                joinBody += '\r\n';
            }
        }));
        let Idata = `${joinHead}${joinBody}`;
        const jsonString = `data:${props.fileType};chatset=utf-8,${encodeURIComponent(
            Idata
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = props.fileName;
        link.click();
        alert("Archivo descargado.");
    };
    return (
        <Link href="#">
            <button onClick={() => downloadData()} className="button-black my-3 text-sm mr-2 mb-2 px-5 py-2.5 inline-flex items-center rounded-lg">Download<Excel /></button>
        </Link>

    );
};
export default DownloadFile
