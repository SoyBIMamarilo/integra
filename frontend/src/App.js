import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Authentication from "./user/container/Authentication";

function App() {
  let routes;
  routes = (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
      <Route path="/" element={<Navigate to="/auth" />} />
    </Routes>
  );
  return <Router>{routes}</Router>;
}

export default App;
