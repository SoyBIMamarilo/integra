"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <h2>Algo salió mal!</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
