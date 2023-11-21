import React from "react";
import "antd/dist/reset.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Home/Components/Detail";
import styles from "./styles.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive={true}></Route>
          <Route
            path="/detail"
            element={<Detail />}
            caseSensitive={true}
          ></Route>
        </Routes>
      </HashRouter>
      <div className={styles.footer}>
        <div className={styles.one}>
          版权所有：重庆科技学院智能技术与工程学院教工第一党支部
        </div>
        <div className={styles.two}>
          <a
            href="https://beian.miit.goc.cn/"
            target={"_blank"}
            style={{ color: "black" }}
          >
            渝ICP备2023001099号-2
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
