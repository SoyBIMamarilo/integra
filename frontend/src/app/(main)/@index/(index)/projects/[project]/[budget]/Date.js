"use client";

import { useEffect, useState } from "react";

import DateLoader from "./DateLoader";
import DateForm from "./DateForm";

const Date = ({ budget }) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/budget/date/${budget}`);
      const data = await res.json();
      if (data[0].fecha_entrega) {
        setDate(data[0].fecha_entrega);
      } else {
        setDate("No");
      }
    };
    loadData();
  }, []);

  const setDateHandler = async (event) => {
    event.preventDefault();
    setDate(null);
    const res = await fetch(`/api/budget/date/${budget}`, {
      method: "POST",
      body: JSON.stringify({ fecha_entrega: event.target.date.value }),
    });
    if (res.status == 200) {
      setDate(event.target.date.value);
    }
  };
  const deleteDateHandler = async (event) => {
    event.preventDefault();
    setDate(null);
    const res = await fetch(`/api/budget/date/${budget}`, {
      method: "DELETE",
    });
    if (res.status == 200) {
      setDate("No");
    }
  };

  return (
    <>
      {!date && <DateLoader />}
      {date && (
        <DateForm
          setDateHandler={setDateHandler}
          deleteDateHandler={deleteDateHandler}
          date={date}
        />
      )}
    </>
  );
};
export default Date;
