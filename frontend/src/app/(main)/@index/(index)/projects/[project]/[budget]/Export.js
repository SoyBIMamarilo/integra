import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";

const Export = ({ data }) => {
  const downloadData = data
    .map((item) => ({
      categoria: item.categoria,
      paquete: item.paquete,
      descripcion: item.descripcion,
      pyrefnombre: item.pyrefnombre,
      codigo: item.codigo,
      vrm2const: item.vrm2const,
      vrm2vend: item.vrm2vend,
      vrtot: item.vrtot,
    }))
    .filter((it) => it.vrtot > 0);
  function getSheetData(header) {
    const fields = Object.keys(downloadData[0]);
    const sheetData = downloadData.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel() {
    const header = [
      "categoria",
      "paquete",
      "descripcion",
      "pyrefnombre",
      "codigo",
      "vrm2const",
      "vrm2vend",
      "vrtot",
    ];

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(header);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "EAD990");
      sheet1.column("A").width(30);
      sheet1.column("B").width(30);
      sheet1.column("C").width(50);
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "file.xlsx");
      });
    });
  }

  return (
    <button
      className="whitespace-nowrap rounded-lg border-2 border-solid	 border-integra-text bg-integra-background-light px-5 py-1 font-bold text-integra-text hover:bg-integra-background-strong"
      // onClick={saveAsExcel}
    >
      Descargar
    </button>
  );
};

export default Export;
