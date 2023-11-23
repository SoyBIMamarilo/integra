"use client";

import { useState, Suspense } from "react";

const clickFetch = async () => {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved");
    }, 1000);
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
      <Suspense fallback={<p>Loading feed...</p>}>
        <button onClick={clickHandler}>Click me</button>
      </Suspense>
      <p>{state}</p>
      {/* <p>{test}</p> */}
    </div>
  );
}
