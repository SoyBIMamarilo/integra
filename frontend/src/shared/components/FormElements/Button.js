import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  //   if (props.href) {
  //     return (
  //       <a
  //         href={props.href}
  //       >
  //         {props.children}
  //       </a>
  //     );
  //   }
  //   if (props.to) {
  //     return (
  //       <Link
  //         to={props.to}
  //         exact={props.exact}
  //         className={`button button--${props.size || "default"} ${
  //           props.inverse && "button--inverse"
  //         } ${props.danger && "button--danger"}`}
  //       >
  //         {props.children}
  //       </Link>
  //     );
  //   }
  return (
    <button
      className={styles.button}
      type={props.type}
      //   onClick={props.onClick}
      //   disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
