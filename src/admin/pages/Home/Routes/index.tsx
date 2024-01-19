import { Navigate } from "react-router-dom";
import ArticleManage from "../components/AticleManage";
import DataPage from "../components/DataPage";
import PeopleManage from "../components/PeopleManage";

const routes = [
  {
    path: "/SiteSpider",
    element: <DataPage />,
  },
  {
    path: "/WeChatSpider",
    element: <DataPage />,
  },
  {
    path: "/people",
    element: <PeopleManage />,
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
  {
    path: "/article",
    element: <ArticleManage />,
  },
];

export default routes;
