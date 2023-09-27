"use client";
import Excel from "@/components/svg/excel";
import Link from "next/link";
const DownloadFile = (props) => {
    let rootApi = process.env.ROOT_URL ? process.env.ROOT_URL : "http://localhost:3000";   
    const DownloadJSON2CSV = (objArray) => {
        var json = objArray;
        var fields = Object.keys(json[0])
        var replacer = function (key, value) { return value === null ? '' : value }
        var csv = json.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })
        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n');
        console.log(csv);
        return csv;
    }
    const downloadData = async () => {
        let Idata = "";
        fetch(`${rootApi}/api/budget/download/${props.budget}`)
            .then(response => response.json())
            .then(data => { 
                console.log(data); 
                Idata = data;
                Idata = DownloadJSON2CSV(Idata);
                const jsonString = `data:${props.fileType};chatset=utf-8,${encodeURIComponent(
                    Idata
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = props.fileName;
                link.click();                
             })
            .catch(err => { console.error(err); });
    };
    return (
        <Link href="#">
            <button onClick={downloadData} className="button-black my-3 text-sm mr-2 mb-2 px-5 py-2.5 inline-flex items-center rounded-lg">Download<Excel /></button>
        </Link>

    );
};
export default DownloadFile
