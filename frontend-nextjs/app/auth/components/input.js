import React from "react";

const Input = (props) => {
  const element =
    props.element === "input" ? (
      <input
        className="border border-none outline-none w-full"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <div className="p-2 border border-solid border-black">
      <label htmlFor={props.id} />
      {element}
      {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default Input;
