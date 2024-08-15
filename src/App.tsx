import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./pages/menu";
import React from "react";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
