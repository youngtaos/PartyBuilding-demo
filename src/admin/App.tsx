import React, { useEffect, useRef } from "react";
import "antd/dist/reset.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "../admin/pages/Login";
import Home from "./pages/Home";
import DataPage from "./pages/Home/components/DataPage";
import PeopleManage from "./pages/Home/components/PeopleManage";
import ArticleManage from "./pages/Home/components/AticleManage";
import MyEditor from "./pages/Home/components/AticleManage/Editor";
import MyFloatButton from "./pages/Home/components/MyFoaltButton";
import SiteSpider from "./pages/Home/components/SiteSpider";
import SpiderSetting from "./pages/Home/components/SpiderSetting";
import MyModalMenu from "./pages/Home/components/AticleManage/Editor/chatMenu";
import { Boot } from "@wangeditor/editor";
import PeopleDetail from "./pages/Home/components/PeopleManage/Component/PeopleDetail";
import Detail from "./pages/Home/components/PeopleManage/Component/Detail";
import HistoryArticle from "./pages/Home/components/HistoryArticle";
import MyEditor2 from "./pages/Home/components/HistoryArticle/Editor";
import WxSpider from "./pages/Home/components/WxSpider";
function useEffectBeforeMount(effect: any, deps: any) {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return effect();
  }, deps);
}
const App: React.FC = () => {
  useEffectBeforeMount(() => {
    const menu1Conf = {
      key: "chat", // 定义 menu key ：要保证唯一、不重复（重要）
      factory() {
        return new MyModalMenu(); // 把 `YourMenuClass` 替换为你菜单的 class
      },
    };
    Boot.registerMenu(menu1Conf);
  }, []);
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} caseSensitive={true}></Route>
          <Route path="/" element={<Home />} caseSensitive={true}>
            <Route
              path="/DataPage"
              element={<DataPage />}
              caseSensitive={true}
            />
            <Route
              path="/detail"
              element={<Detail />}
              caseSensitive={true}
            ></Route>
            <Route
              path="/WxSpider"
              element={<WxSpider />}
              caseSensitive={true}
            />
            <Route
              path="/SiteSpider"
              element={<SiteSpider />}
              caseSensitive={true}
            />
            <Route
              path="/spiderSetting"
              element={<SpiderSetting />}
              caseSensitive={true}
            />
            <Route
              path="/people"
              element={<PeopleManage />}
              caseSensitive={true}
            />
            <Route
              path="/peopleDetail"
              element={<PeopleDetail />}
              caseSensitive={true}
            />
            <Route
              path="/onlineArticle"
              element={<ArticleManage />}
              caseSensitive={true}
            />
            <Route
              path="/yourArticle"
              element={<HistoryArticle />}
              caseSensitive={true}
            />
            <Route path="OnEdit" element={<MyEditor />} />
            <Route path="OnEdit2" element={<MyEditor2 />} />
          </Route>
        </Routes>
      </HashRouter>
      <MyFloatButton />
      {/* <div style={{ textAlign: "center" }}>
        版权所有：重庆科技大学智能技术与工程学院教工第一党支部
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
