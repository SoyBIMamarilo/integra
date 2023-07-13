import React from "react";

const Button = (props) => {
  return (
    <button className="font-normal text-sm w-64 border border-solid border-black rounded-sm bg-black text-white">
      {props.children}
    </button>
  );
};

export default Button;
