"use client";

const PackageFormItem = ({ packageItem, changeHandler }) => {
  const clickHandler = () => {
    // console.log(packageItem);
    changeHandler(packageItem.paquete_trabajo_id);
  };
  return <div onClick={clickHandler}>{packageItem.nombre}</div>;
};

export default PackageFormItem;
