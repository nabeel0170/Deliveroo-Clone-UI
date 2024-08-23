import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./pages/menu";
import React from "react";
import Login from "./pages/login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
