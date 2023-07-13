import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Authentication from "./user/container/Authentication";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
