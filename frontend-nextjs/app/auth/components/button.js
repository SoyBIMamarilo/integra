"use client";

import React from "react";

const Button = (props) => {
  return (
    <button
      className="rounded-sm border border-solid  border-black bg-black p-2 text-sm font-normal text-white"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
