"use client";

import Modal from "@/components/modal/create-modal";
import { useRouter } from "next/navigation";

const Create = ({ params }) => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pass1 = e.target[0].value;
    const pass2 = e.target[1].value;
    console.log(pass1);
    console.log(pass2.toUpperCase());

    const response = await fetch("http://localhost:3000/api/auth/new-user", {
      method: "POST",
      body: JSON.stringify({
        email: pass1,
        role: pass2.toUpperCase(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonres = await response.json();
    alert(jsonres.message);
    if (response.ok) {
      router.refresh();
    }
    router.back();
  };

  return (
    <Modal>
      <div className="mb-4 font-bold">Invitar Ususario</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="email"
          element="input"
          id="mail"
          label="mail"
          placeholder="Correo de nuevo usuario"
          name="mail"
        />
        <div className="flex flex-row">
          <span className="font-bold">Rol:</span>
          <select>
            <option>Gerente</option>
            <option>Director</option>
            <option>Coordinador</option>
            <option>Analista</option>
          </select>
        </div>

        <button className="button-black grow">Enviar invitación</button>
      </form>
    </Modal>
  );
};

export default Create;
