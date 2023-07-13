import React from "react";

import Input from "../../shared/components/FormElements/Input";

import styles from "./Authentication.module.css";
import Button from "../../shared/components/FormElements/Button";
import logo from "../../shared/images/amarilo-logo.png";

// import button from "../../../public/amarilo-logo.png"
const Authentication = () => {
  return (
    <div className={styles.div}>
      <h1>INTEGRA</h1>
      <form>
        <Input
          type="email"
          element="input"
          id="correo eléctrónico"
          label="Tu correo electrónico"
          placeholder="Tu Correo"
        ></Input>
        <Input
          type="password"
          element="input"
          id="contraseña"
          label="Tu contraseña"
          placeholder="Tu contraseña"
        ></Input>
        <Button>INICIAR SESIÓN</Button>
      </form>
      <img src={logo} />
    </div>
  );
};

export default Authentication;
