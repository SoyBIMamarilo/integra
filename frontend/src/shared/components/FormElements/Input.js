import React from "react";

import styles from "./Input.module.css";
const Input = (props) => {
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        // onChange={changeHandler}
        // onBlur={touchHandler}
        // value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        // onChange={changeHandler}
        // onBlur={touchHandler}
        // value={inputState.value}
      />
    );

  return (
    <div className={styles["input-container"]}>
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      {element}
      {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default Input;
