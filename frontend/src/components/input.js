"use client";
import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const element =
      props.element === "input" ? (
        <input
          className="w-full border border-none outline-none"
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      ) : (
        <textarea id={props.id} rows={props.rows || 3} />
      );
    return (
      <div className="m-1 border border-solid border-black p-2">
        <label htmlFor={props.id} />
        {element}
        {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
      </div>
    );
  }
}

//export default Input;
