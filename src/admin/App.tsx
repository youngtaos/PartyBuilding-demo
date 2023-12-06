import React from "react";
import "antd/dist/reset.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Home from "./pages/Home";
import DataPage from "./pages/Home/components/DataPage";
import PeopleManage from "./pages/Home/components/PeopleManage";
import ArticleManage from "./pages/Home/components/AticleManage";
import MyEditor from "./pages/Home/components/AticleManage/Editor";
import MyFloatButton from "./pages/Home/components/MyFoaltButton";

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
            <Route
              path="/article"
              element={<ArticleManage />}
              caseSensitive={true}
            />
            <Route path="OnEdit" element={<MyEditor />} />
          </Route>
        </Routes>
      </HashRouter>
      <MyFloatButton />
      {/* <div style={{ textAlign: "center" }}>
        版权所有：重庆科技学院智能技术与工程学院教工第一党支部
        <div>
          <a
            href="https://beian.miit.goc.cn/"
            target={"_blank"}
            style={{ color: "black" }}
          >
            渝ICP备2023001099号-2
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default App;
