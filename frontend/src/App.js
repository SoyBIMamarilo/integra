import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Authentication from "./user/container/Authentication";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

function App() {
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch("http://localhost:5000/test");
      return res.json;
    };

    const response = fetchTest();
    console.log(response);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
