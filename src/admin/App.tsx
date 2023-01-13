import React from "react";
import "antd/dist/reset.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Home from "./pages/Home";
import DataPage from "./pages/Home/components/DataPage";
import PeopleManage from "./pages/Home/components/PeopleManage";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} caseSensitive={true}></Route>
          <Route path="/" element={<Home />} caseSensitive={true}>
            <Route path="/data" element={<DataPage />} caseSensitive={true} />
            <Route
              path="/people"
              element={<PeopleManage />}
              caseSensitive={true}
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
