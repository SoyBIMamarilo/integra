"use client";

import React from "react";

const Button = (props) => {
  return (
    <button
      className="p-2 font-normal text-sm  border border-solid border-black rounded-sm bg-black text-white"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
