import { Navigate } from "react-router-dom";
import DataPage from "../components/DataPage";
import PeopleManage from "../components/PeopleManage";

const routes = [
  {
    path: "/data",
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
];

export default routes;
