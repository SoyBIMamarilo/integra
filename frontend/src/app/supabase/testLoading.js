"use client";

import { useState } from "react";

const clickFetch = async () => {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved");
    }, 3000);
  });
  return result;
};

export default function SuspenseComponent() {
  const [state, setState] = useState("Before Fetch");
  const clickHandler = async () => {
    const newState = await clickFetch();
    setState(newState);
  };

  //   const test = clickFetch();
  return (
    <div>
      <div>procesado</div>
      <button onClick={clickHandler}>Click me</button>
      <p>{state}</p>
      {/* <p>{test}</p> */}
    </div>
  );
}
