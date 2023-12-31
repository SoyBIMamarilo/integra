import React from "react";

const Input = (props) => {
  const element =
    props.element === "input" ? (
      <input
        className=" w-full border border-none pl-2 outline-none"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <div className=" m-1  border border-solid border-black bg-white">
      <label htmlFor={props.id} />
      {element}
      {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default Input;
