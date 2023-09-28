const TempTableItem = async ({tempRow})=>{
    return (<tr className="text-xs font-bold">
    <td className="table-content text-center">{tempRow.id}</td>
    <td className="table-content text-center">{tempRow.parent_id}</td>
    <td className="table-content text-center">{tempRow.cbs}</td>
    <td className="table-content text-center">{tempRow.descripcion}</td>
    <td className="table-content text-center">{tempRow.unidad_medida}</td>
    <td className="table-content text-center">{tempRow.cantidad}</td>
    <td className="table-content text-center">{tempRow.precio}</td>
    <td className="table-content text-center">{tempRow.line_type}</td>
  </tr>)
}

export default TempTableItem