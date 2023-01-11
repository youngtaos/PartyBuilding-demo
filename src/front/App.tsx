import React from "react";
import "antd/dist/reset.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Detail from "./pages/Home/Components/Detail";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} caseSensitive={true}></Route>
          <Route path="/" element={<Home />} caseSensitive={true}></Route>
          <Route
            path="/detail"
            element={<Detail />}
            caseSensitive={true}
          ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
