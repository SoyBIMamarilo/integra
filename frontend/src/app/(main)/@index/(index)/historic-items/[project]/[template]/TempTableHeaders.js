const TempTableHeaders = () => {
  return (
    <thead>
      <tr>
        <th className="table-header w-[13%]">Id</th>
        <th className="table-header w-[13%]">ParentId</th>
        <th className="table-header w-[13%]">CBS</th>
        <th className="table-header w-[13%]">Descripción</th>
        <th className="table-header w-[13%]">UdM</th>
        <th className="table-header w-[13%]">Cantidad</th>
        <th className="table-header w-[13%]">Precio Unitario</th>
        <th className="table-header w-[13%]">BoQ Line Type</th>
        <th className="w-4"></th>
        <th className="w-4"></th>
      </tr>
    </thead>
  );
};

export default TempTableHeaders;
