"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Algo salió mal!</h2>
      <p>{error.message}</p>
    </div>
  );
}
